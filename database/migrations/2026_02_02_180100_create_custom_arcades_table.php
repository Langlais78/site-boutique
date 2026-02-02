<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_arcades', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('box_accessory_id')->nullable()->constrained('accessories')->nullOnDelete();
            $table->foreignId('screen_accessory_id')->nullable()->constrained('accessories')->nullOnDelete();
            $table->foreignId('joystick_accessory_id')->nullable()->constrained('accessories')->nullOnDelete();
            $table->foreignId('console_accessory_id')->nullable()->constrained('accessories')->nullOnDelete();
            $table->foreignId('skin_accessory_id')->nullable()->constrained('accessories')->nullOnDelete();
            $table->foreignId('target_accessory_id')->nullable()->constrained('accessories')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_arcades');
    }
};
