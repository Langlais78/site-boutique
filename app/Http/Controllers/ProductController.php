<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->where('is_active', true)
            ->orderByDesc('created_at')
            ->get([
                'id',
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
                'category',
                'brand',
                'image',
                'images',
                'stock',
                'is_featured',
            ]);

        return Inertia::render('Boutique', [
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        return Inertia::render('ProductShow', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'sku' => $product->sku,
                'price_cents' => $product->price_cents,
                'sale_price_cents' => $product->sale_price_cents,
                'currency' => $product->currency,
                'badge' => $product->badge,
                'color' => $product->color,
                'summary' => $product->summary,
                'short_description' => $product->short_description,
                'description' => $product->description,
                'specs' => $product->specs ?? [],
                'category' => $product->category,
                'brand' => $product->brand,
                'stock' => $product->stock,
                'images' => $product->images ?? [],
                'tags' => $product->tags ?? [],
                'variants' => $product->variants ?? [],
                'weight_grams' => $product->weight_grams,
                'dimensions' => $product->dimensions ?? [],
                'is_featured' => $product->is_featured,
            ],
        ]);
    }
}
