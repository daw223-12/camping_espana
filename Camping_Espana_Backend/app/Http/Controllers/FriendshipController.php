<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FriendshipController extends Controller
{

    /**
     * Show all friends of user that does the request
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function indexByUser(Request $request)
    {

        try {

            $user = $request->user();

            // Peticiones que me llegan
            $friendsFrom = $user->friendsFrom()->wherePivot('accepted', 1)->get();

            // Peticiones mías
            $friendsTo = $user->friendsTo()->wherePivot('accepted', 1)->get();

            $pendingFriends = $friendsFrom->merge($friendsTo);

            return $pendingFriends;

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Friendship endpoint failed'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);

        }

    }


    public function pendingFriends(Request $request)
    {

        try {

            $user = $request->user();

            // Peticiones que me llegan
            $friendsFrom = $user->friendsFrom()->wherePivot('accepted', 0)->get();

            return $friendsFrom;

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Friendship endpoint failed'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);

        }

    }

    /**
     * Add friends relationship between a user and another user
     * This function is the first step in a relationship
     * State start with 'requested'
     * @param \Illuminate\Http\Request $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function startRelationship(Request $request)
    {
        try {

            $friendship = new Friendship();

            $friendship->user()->associate($request->user());

            $friendship->friend()->associate(User::find($request->friend_id));

            $friendship->accepted = 0;

            // dd($friendship);
            $friendship->save();

            return response()->noContent();
        } catch (Exception $e) {

            return response()->json([
                'message' => 'Some error has occurred'
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(Request $request)
    {

        try {

            $user = $request->user();

            if ($request->filled('user_id')) {

                $user->friendsFrom()->updateExistingPivot($request->user_id, ['accepted' => 1]);

            }

            return response()->noContent();

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Some error has occurred'
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy(int $friend_id, Request $request)
    {

        try {

            $user = $request->user();

            try {
                $user->friendOf()->detach($friend_id);
            } catch (Exception $e) {
                $user->friendFrom()->detach($friend_id);
            }
            
            return response()->noContent();
        } catch (Exception $e) {

            return response()->json([
                'message' => 'Error in delete operation'
            ], Response::HTTP_BAD_REQUEST);
        }
    }

}
