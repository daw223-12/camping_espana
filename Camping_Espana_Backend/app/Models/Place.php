<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Place extends Model
{

    public $incrementing = true;

    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'type',
        'coordinates'
    ];

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function users() 
    {
        return $this->belongsToMany(User::class, 'reviews', 'place_id', 'user_id')
        ->withPivot('score', 'comment')
        ->withTimestamps();
    }

}
