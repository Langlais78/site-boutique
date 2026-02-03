<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'sku',
        'price_cents',
        'sale_price_cents',
        'currency',
        'badge',
        'color',
        'summary',
        'short_description',
        'description',
        'specs',
        'category',
        'brand',
        'image',
        'images',
        'tags',
        'variants',
        'stock',
        'weight_grams',
        'dimensions',
        'is_active',
        'is_featured',
        'is_personalizable',
    ];

    protected $casts = [
        'price_cents' => 'integer',
        'sale_price_cents' => 'integer',
        'specs' => 'array',
        'images' => 'array',
        'tags' => 'array',
        'variants' => 'array',
        'dimensions' => 'array',
        'stock' => 'integer',
        'weight_grams' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_personalizable' => 'boolean',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function accessories()
    {
        return $this->belongsToMany(Accessory::class);
    }
}
