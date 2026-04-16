<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Book extends Model
{
    use HasFactory;

    //en genre kan have mange bøger og en bog kan have mange genres
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }
    // Book holder genre Fk

    // public function author(){
    //     return $this->belongsToMany(Author::class);
    // }
    //tjek det her med chat, men book-tabel  id ligger i joiningtable som FK
}
