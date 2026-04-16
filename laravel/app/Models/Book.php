<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Book extends Model
{
    use HasFactory;
    //en genre kan have mange bøger og en bog kan have mange genres
 public function Genre(): BelongsTo
 {
        return $this->belongsTo(Genre::Class);
    }
    // Book holder genre Fk

    public function AuthourBook(){
        return $this->hasMany(AuthourBook::Class);
    }
    //tjek det her med chat, men book-tabel  id ligger i joiningtable som FK
}
