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
                'price_cents',
                'currency',
                'badge',
                'color',
                'summary',
                'category',
                'stock',
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
                'price_cents' => $product->price_cents,
                'currency' => $product->currency,
                'badge' => $product->badge,
                'color' => $product->color,
                'summary' => $product->summary,
                'description' => $product->description,
                'specs' => $product->specs ?? [],
                'category' => $product->category,
                'stock' => $product->stock,
            ],
        ]);
    }
}
