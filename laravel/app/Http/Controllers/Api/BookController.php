<?php

namespace App\Http\Controllers\Api;

// use App\Http\Api\Controllers\Controller;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Http\Resources\Traits\CanLoadRelationships;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BookController extends Controller
{
    use CanLoadRelationships;

    private array $books = ['user', 'books', 'books.user'];

    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum')->except(['index', 'show']);
    // }

    function index()
    {
        Gate::authorize('viewAny', Book::class);

        $query = $this->loadRelationships(Book::query());

        return BookResource::collection(
            $query->latest()->paginate()
        );
    }

    public function store(Request $request)
    {
        // Gate::authorize('create', Book::class);

        $book = Book::create([
            ...$request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
                'publishing_date' => 'required|date',
                'price' => 'required|numeric',
                'genre_id' => 'required|exists:genres,id',
                'image' => 'nullable|url',
                'author_ids' => 'required|array',
                'author_ids.*' => 'exists:authors,id'
            ]),

            'user_id' => $request->user()->id
        ]);

        return new BookResource($this->loadRelationships($book));
    }

    public function show(Book $book)
    {
        return new BookResource($book);
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json([
            'Message' => 'Book deleted successfully'
        ]);
    }
}
