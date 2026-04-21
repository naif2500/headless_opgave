<?php

use App\Http\Controllers\Api\BookController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::apiResource('books', BookController::class)->only(["index", "show", "destroy", "store"]);
// Route::post('/login',[AuthController::class, 'login',]);
// Route::post('/logout', [AuthController::class, 'logout'])
// ->middleware('auth:sanctum');
Route::post('/login',[AuthController::class, 'login',]);
Route::post('/logout', [AuthController::class, 'logout'])
->middleware('auth:sanctum');

// offenlige ruter (dem hvorpå ingen auth. behøves/kræves)
Route::apiResource('books', BookController::class)->only(['index', 'show']);
//Det skal vær tilladt at se bøgerrne unaset om du er logget ind eller ej

// beskyttede ruter (dem hvorpå auth. behøves/kræves)
Route::apiResource('books', BookController::class)->only(['store', 'destroy'])->middleware('auth:sanctum');
//Det skal kun være tilladt at oprette og slette bøger hvis man er logget ind



//steens kode: (kan bruges til at lave en route til at se alle events og en route til at se alle attendees for et event
// skal så være byttet ud med books og authors  ikke events og attendees)

// Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
//     Route::apiResource('events.attendees', AttendeeController::class)
//         ->scoped()
//         ->only(['store', 'destroy']);
// });

// Route::apiResource('events.attendees', AttendeeController::class)
//     ->scoped()
//     ->only(['index', 'show']);
