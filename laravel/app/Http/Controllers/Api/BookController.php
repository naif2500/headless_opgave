<?php

namespace App\Http\Controllers\Api;

// use App\Http\Api\Controllers\Controller;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Http\Resources\Traits\CanLoadRelationships;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{

    public function store(Request $request)
{

    $validated = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'publishing_date' => 'required|date',
        'price' => 'required|numeric',
        'genre' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg',
        'author' => 'required|string',
    ]);

    $path = $request->file('image')->store('images', 'public');

    $genre = Genre::where("name", $validated["genre"])->first();

    if (!$genre) {
        $genre = Genre::create(["name" => $validated["genre"]]);
    }

    $author = Author::where("name", $validated["author"])->first();

    if (!$author) {
        $author = Author::create(["name" => $validated["author"]]);
    }

    $book = Book::create([
        'title' => $validated["title"],
        'description' => $validated["description"],
        'publishing_date' => $validated["publishing_date"],
        'price' => $validated["price"],
        'genre_id' => $genre->id,
        'image' => 'http://localhost:8000/storage/' . $path,
        'user_id' => $request->user()->id
    ]);

    return new BookResource($book->load(['author', 'genre', "user"]));
}

    public function index() {
        $books = Book::with(["author", "genre"])->get();
        return BookResource::collection($books);
    }

    public function show(Book $book) {
         $book->load(['author', 'genre']);

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
