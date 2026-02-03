<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->string('category')->toString();

        $productsQuery = Product::query()
            ->where('is_active', true)
            ->orderByDesc('created_at');

        if ($categorySlug !== '') {
            $productsQuery->whereHas('categories', function ($query) use ($categorySlug) {
                $query->where('slug', $categorySlug);
            });
        }

        $products = $productsQuery
            ->with(['categories:id,name,slug'])
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
                'is_personalizable',
            ]);

        $categories = Category::query()
            ->withCount([
                'products as products_count' => function ($query) {
                    $query->where('is_active', true);
                },
            ])
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Boutique', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'category' => $categorySlug,
            ],
        ]);
    }

    public function show(Product $product): Response
    {
        $categories = $product->categories()->get([
            'categories.id',
            'categories.name',
            'categories.slug',
        ]);

        $accessories = $product->is_personalizable
            ? $product->accessories()
                ->with('type:id,name,slug')
                ->orderBy('type_id')
                ->orderBy('name')
                ->get([
                    'accessories.id',
                    'accessories.type_id',
                    'accessories.name',
                    'accessories.image',
                    'accessories.characteristics',
                    'accessories.price_cents',
                ])
            : collect();

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
                'image' => $product->image,
                'stock' => $product->stock,
                'images' => $product->images ?? [],
                'categories' => $categories,
                'tags' => $product->tags ?? [],
                'variants' => $product->variants ?? [],
                'weight_grams' => $product->weight_grams,
                'dimensions' => $product->dimensions ?? [],
                'is_featured' => $product->is_featured,
                'is_personalizable' => $product->is_personalizable,
            ],
            'accessories' => $accessories,
        ]);
    }
}
