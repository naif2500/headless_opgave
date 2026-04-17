<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Genre extends Model
{
    use HasFactory;
                         //skrives ogås i Udemy eksempel
    public function book(): HasMany
    {
        return $this->hasMany(Book::class);
    }
     // Genre har ingen FK hos sig men sin egen pk er som FK i book table

}
