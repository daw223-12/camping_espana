<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{

    /**
     *
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function indexByEmail(string $user_email, Request $request)
    {

        try {

            $users = User::all()->where('email', $user_email);

            return $users;

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Search users endpoint failed'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);

        }

    }


    public function show(int $userId)
    {

        try {

            $users = User::findOrFail($userId);

            return $users;

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Places not found'
            ], Response::HTTP_NOT_FOUND);

        }


    }

}
