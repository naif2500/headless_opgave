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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->date('publishing_date');
            $table->string('description');
            $table->string('image');
            $table-> decimal('price', 8, 2);
            $table->foreignId('genre_id')->constrained();
            //Constrained er reference genre(id)=> genre.id, forsøger
            // man at slette bog der har tilknytning til genre_id
            // så ville den restrict.



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
