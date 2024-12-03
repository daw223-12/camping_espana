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
        Schema::create('reviews', function (Blueprint $table) {
            $table->foreignId('place_id')->constrained('places')->onDelete('cascade');
            // $table->unsignedBigInteger('place_id');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            // $table->unsignedBigInteger('user_id');
            $table->integer('score');
            $table->string('comment');
            $table->timestamps();

            $table->primary(['place_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
