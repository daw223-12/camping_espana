<?php

use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\PlacesController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// USER
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * REVIEWS
 * No se buscan reviews en concreto
 */

#Route::middleware('auth:api')->get('/reviews/{reviewId}', [ReviewController::class, 'show']);

Route::get('/reviews/{user_id}', [ReviewController::class, 'indexByUser']);

Route::middleware('auth')->post('/reviews', [ReviewController::class, 'store']);

Route::middleware('auth')->put('/reviews', [ReviewController::class, 'update']);

Route::middleware('auth')->delete('/reviews/{place_id}', [ReviewController::class, 'destroy']);


/**
 * PLACES
 */
Route::middleware('auth')->get('/places/{placeId}', [PlacesController::class, 'show']);

Route::middleware('auth')->get('/places', [PlacesController::class, 'index']);


/**
 * Friendship
 */
// All friends of user
Route::middleware('auth')->get('/friends', [FriendshipController::class, 'indexByUser']);

Route::middleware('auth')->get('/pendingFriends', [FriendshipController::class, 'pendingFriends']);

// Create friendship request
Route::middleware('auth')->post('/friends', [FriendshipController::class, 'startRelationship']);

Route::middleware('auth')->put('/friends', [FriendshipController::class, 'update']);

// Create friendship request
Route::middleware('auth')->get('/friendsOf', [FriendshipController::class, 'indexFriendsofUser']);

Route::middleware('auth')->delete('/friends/{user_id}', [FriendshipController::class, 'destroy']);

Route::middleware('auth')->get('/users/{user_email}', [UserController::class, 'indexByEmail']);