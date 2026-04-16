<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::apiResource('genre.books', GenreBookController::class);
Route::apiResource('book.authors', BookAuthorController::class);
