<?php

namespace Database\Factories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Genre>
 */
class GenreFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $genres = ["thriller", "romance", "fantasy", "sci-fi", "horror", "cookbook", "biography", "history", "poetry", "crime"];

        static $genreIndex = 0;

        return [
            "name" => $genres[$genreIndex++ % count($genres)]
        ];
    }
}
