<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model

{
    use HasFactory;

    public function book(){
        return $this->belongsToMany(Book::class);
    }

}
//Authors eget pk ligger som fk i joiningtable + booktable


