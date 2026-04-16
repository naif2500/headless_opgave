<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "author" => $this->whenLoaded("author", function () {
                return AuthorResource::collection($this->author);
            }),
            "image" => $this->image,
            "price" => $this->price,
            "description" => $this->description,
            "publishing_date" => $this->publishing_date,
            "genre" => $this->whenLoaded("genre", function () {
                return new GenreResource($this->genre);
            })
        ];
    }
}
