<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index() {
        $books = Book::with(["author", "genre"])->get();
        return BookResource::collection($books);
    }

    public function show() {

    }

    public function destroy() {

    }
}
