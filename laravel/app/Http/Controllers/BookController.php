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

    public function show(Book $book) {
        return new BookResource($book);
    }

    public function destroy(Book $book) {
    $book->delete();
return response()->json([
'Message' => 'Book deleted successfully']);

    }
}
//https://www.udemy.com/course/laravel-beginner-fundamentals/learn/lecture/37619738#questions 7:09
