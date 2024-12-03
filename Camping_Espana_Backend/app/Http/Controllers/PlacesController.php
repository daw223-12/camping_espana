<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PlacesController extends Controller
{

    public function index(Request $request)
    {

        try {

            $places = Place::all();

            return $places;

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Places endpoint failed'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);

        }

    }


    public function show(int $placeId)
    {

        try {

            $places = Place::findOrFail($placeId);

            return $places;

        } catch (Exception $e) {

            return response()->json([
                'message' => 'Places not found'
            ], Response::HTTP_NOT_FOUND);

        }


    }

}
