<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::apiResource('books', BookController::class)->only(["index", "show", "destroy"]);

Route::apiResource("orders", OrderController::class)->only(["index", "store", "update", "destroy"]);
