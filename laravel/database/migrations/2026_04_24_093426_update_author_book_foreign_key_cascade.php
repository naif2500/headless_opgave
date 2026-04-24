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
        Schema::table('author_book', function (Blueprint $table) {
            $table->dropForeign('auhtors_books_book_id_foreign');
            $table->foreign('book_id')
                  ->references('id')
                  ->on('books')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('author_book', function (Blueprint $table) {
            $table->dropForeign(['book_id']);
            $table->foreign('book_id')
                  ->references('id')
                  ->on('books');
        });
    }
};
