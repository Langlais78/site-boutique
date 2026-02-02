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
        'price_cents',
        'currency',
        'badge',
        'color',
        'summary',
        'description',
        'specs',
        'category',
        'image',
        'stock',
        'is_active',
    ];

    protected $casts = [
        'price_cents' => 'integer',
        'specs' => 'array',
        'stock' => 'integer',
        'is_active' => 'boolean',
    ];
}
