<?php

namespace App\Http\Controllers\Api;

use App\Http\Api\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    } //min index + show er public + at man ike beøver token (login) for at kunne se dem

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'publishing_date' => 'required|date',
        'price' => 'required|numeric',
        'genre_id' => 'required|exists:genres,id',
        'image' => 'nullable|url',
        'author_ids' => 'required|array',
        'author_ids.*' => 'exists:authors,id'
    ]);

    $book = Book::create([
        ...$validated,
        'user_id' => $request->user()->id
    ]);

    if ($request->has('author_ids')) {
        $book->authors()->attach($request->author_ids);
    }

    return new BookResource($book->load(['authors', 'genre']));
}

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
//



// index() - Se alle bøger
// show() - Se en bog
// store() - OPRET en bog 
// destroy() - Slet en bog
// update() - Opdater en bog
