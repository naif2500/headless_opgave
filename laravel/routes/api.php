<?php

use App\Http\Controllers\BookController;
use App\Models\Order;
use Illuminate\Support\Facades\Route;

Route::apiResource('books', BookController::class)->only(["index", "show", "destroy"]);

Route::apiResource("orders", Order::class)->only(["index", "store", "update", "destroy"]);
