<?php

use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('books', BookController::class)->only(["index", "show", "destroy"]);

Route::apiResource("orders", OrderController::class)->only(["index", "store", "update", "destroy"])->middleware("auth:sanctum");
// Route::post('/login',[AuthController::class, 'login']);

Route::post('/login',[AuthController::class, 'login',]);
Route::post('/logout', [AuthController::class, 'logout'])
->middleware('auth:sanctum');
// Route::post('/books', [BookController::class, 'store'])->middleware('auth:sanctum');
