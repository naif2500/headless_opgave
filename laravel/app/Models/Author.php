<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model

{
    use HasFactory;
public function AuthourBook(): HasMany
{
    return $this ->hasMany(AuthourBook::Class);


    }

    public function Book(){
        return $this->hasManyThrough(Book::Class, AuthourBook::Class);

    }
}
//Authors eget pk ligger som fk i joiningtable + booktable


