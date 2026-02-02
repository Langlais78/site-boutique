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
        Schema::table('products', function (Blueprint $table) {
            $table->string('short_description')->nullable()->after('summary');
            $table->integer('sale_price_cents')->nullable()->after('price_cents');
            $table->string('sku')->nullable()->after('slug');
            $table->string('brand')->nullable()->after('category');
            $table->json('images')->nullable()->after('image');
            $table->json('tags')->nullable()->after('specs');
            $table->json('variants')->nullable()->after('tags');
            $table->integer('weight_grams')->nullable()->after('stock');
            $table->json('dimensions')->nullable()->after('weight_grams');
            $table->boolean('is_featured')->default(false)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'short_description',
                'sale_price_cents',
                'sku',
                'brand',
                'images',
                'tags',
                'variants',
                'weight_grams',
                'dimensions',
                'is_featured',
            ]);
        });
    }
};
