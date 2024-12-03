<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // AMISTADES
    public function friendsTo()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_id', 'friend_id')
            ->withPivot('accepted')
            ->withTimestamps();
    }

    public function friendsFrom()
    {
        return $this->belongsToMany(User::class, 'friendships', 'friend_id', 'user_id')
            ->withPivot('accepted')
            ->withTimestamps();
    }
    public function pendingFriendsTo()
    {
        return $this->friendsTo()->wherePivot('accepted', false);
    }

    public function pendingFriendsFrom()
    {
        return $this->friendsFrom()->wherePivot('accepted', false);
    }

    public function acceptedFriendsTo()
    {
        return $this->friendsTo()->wherePivot('accepted', true);
    }

    public function acceptedFriendsFrom()
    {
        return $this->friendsFrom()->wherePivot('accepted', true);
    }

    public function friendsMerged()
    {
        return $this->acceptedFriendsFrom->merge($this->acceptedFriendsTo);
    }

    // Amistades iniciadas por el usuario
    public function friendsOfMine()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_id', 'friend_id')
            ->withPivot('state')
            ->withTimestamps();
    }

    // Amistades donde este usuario es el amigo
    public function friendOf()
    {
        return $this->belongsToMany(User::class, 'friendships', 'friend_id', 'user_id')
            ->withPivot('state')
            ->withTimestamps();
    }

    // Relación completa de amigos (aceptados)
    public function friends()
    {
        $friendsOfMine = $this->friendsOfMine()
            ->wherePivot('state', 'accepted')
            ->getQuery();

        $friendOf = $this->friendOf()
            ->wherePivot('state', 'accepted')
            ->getQuery();

        return $this->newQuery()
            ->from($friendsOfMine->union($friendOf));
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function places()
    {
        return $this->belongsToMany(Place::class, 'reviews', 'user_id', 'place_id')
            ->withPivot('score', 'comment')
            ->withTimestamps();
    }
}
