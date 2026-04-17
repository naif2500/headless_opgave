<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory;

    //en genre kan have mange bøger og en bog kan have en genre
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }
    // public function author(): BelongsTo
    // {
    //     return $this->belongsTo(Author::class);
    // }
    // Book holder genre Fk

    public function author(): BelongsToMany
    {
        return $this->belongsToMany(Author::class);
    }
    //tjek det her med chat, men book-tabel  id ligger i joiningtable som FK
}
