<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('auhtors_books', 'author_book');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('author_book', 'auhtors_books');
    }
};
