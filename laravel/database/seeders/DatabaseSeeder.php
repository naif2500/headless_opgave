<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $genres = Genre::factory()->count(10)->create();
        $authors = Author::factory()->count(12)->create();
        $books = Book::factory()->count(12)->create();

        foreach ($books as $book) {
            $book->author()->sync(
                $authors->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
