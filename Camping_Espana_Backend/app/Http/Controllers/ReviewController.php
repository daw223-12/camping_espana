<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\Review;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller
{
    public function indexByUser(User $user_id, Request $request)
    {

        try {

            //dd($user_id);

            $reviews = $user_id->reviews()->get();

            return $reviews;
        } catch (Exception $e) {

            return response()->json([
                'message' => 'Not have reviews'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /* public function show(int $reviewId)
    {

        try {

            $reviews = Review::findOrFail($reviewId);

            return $reviews;

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Review not found'
            ], Response::HTTP_NOT_FOUND);

        }


    }
 */
    public function store(Request $request)
    {

        try {

            $review = new Review();

            $review->user()->associate($request->user());

            $review->place()->associate(Place::find($request->place_id));

            $review->score = $request->score;

            $review->comment = $request->comment;

            $review->save();

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

            if ($request->filled('place_id')) {
                if ($request->filled('score')) {

                    $user->places()->updateExistingPivot($request->place_id, ['score' => intval($request->score)]);
                }

                if ($request->filled('comment')) {

                    $user->places()->updateExistingPivot($request->place_id, ['comment' => $request->comment]);
                }
            }

            return response()->noContent();

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Some error has occurred'
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy(int $place_id, Request $request)
    {

        try {

            $user = $request->user();


            $user->places()->detach($place_id);

            return response()->noContent();
        } catch (Exception $e) {

            return response()->json([
                'message' => 'Error in delete operation'
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
