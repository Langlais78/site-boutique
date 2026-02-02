<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->orderByDesc('updated_at')
            ->get([
                'id',
                'name',
                'slug',
                'sku',
                'price_cents',
                'sale_price_cents',
                'currency',
                'badge',
                'category',
                'brand',
                'stock',
                'is_active',
                'is_featured',
                'updated_at',
            ]);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::query()
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(AdminProductRequest $request): RedirectResponse
    {
        $data = $this->validatedData($request);

        $product = Product::create($data);
        $product->categories()->sync($request->input('categories', []));

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product): Response
    {
        $categories = Category::query()
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Products/Edit', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'sku' => $product->sku,
                'price' => $this->formatPrice($product->price_cents),
                'sale_price' => $product->sale_price_cents !== null
                    ? $this->formatPrice($product->sale_price_cents)
                    : '',
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
                'images' => $product->images ?? [],
                'tags' => $product->tags ?? [],
                'variants' => $product->variants ?? [],
                'stock' => $product->stock,
                'weight_grams' => $product->weight_grams,
                'dimensions' => $product->dimensions ?? [],
                'is_active' => $product->is_active,
                'is_featured' => $product->is_featured,
            ],
            'categories' => $categories,
            'selectedCategoryIds' => $product->categories()->pluck('categories.id')->all(),
        ]);
    }

    public function update(AdminProductRequest $request, Product $product): RedirectResponse
    {
        $data = $this->validatedData($request, $product);

        $product->update($data);
        $product->categories()->sync($request->input('categories', []));

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index');
    }

    private function validatedData(AdminProductRequest $request, ?Product $product = null): array
    {
        $validated = $request->validated();

        if ($product) {
            $defaults = [
                'name' => $product->name,
                'sku' => $product->sku,
                'price' => $this->formatPrice($product->price_cents),
                'sale_price' => $product->sale_price_cents !== null
                    ? $this->formatPrice($product->sale_price_cents)
                    : null,
                'currency' => $product->currency,
                'badge' => $product->badge,
                'color' => $product->color,
                'summary' => $product->summary,
                'short_description' => $product->short_description,
                'description' => $product->description,
                'specs' => $product->specs ? implode("\n", $product->specs) : null,
                'tags' => $product->tags ? implode("\n", $product->tags) : null,
                'variants' => $product->variants ? implode("\n", $product->variants) : null,
                'category' => $product->category,
                'brand' => $product->brand,
                'stock' => $product->stock,
                'weight_grams' => $product->weight_grams,
                'dimensions_length' => $product->dimensions['length'] ?? null,
                'dimensions_width' => $product->dimensions['width'] ?? null,
                'dimensions_height' => $product->dimensions['height'] ?? null,
                'dimensions_unit' => $product->dimensions['unit'] ?? null,
                'is_active' => $product->is_active,
                'is_featured' => $product->is_featured,
            ];

            foreach ($defaults as $key => $value) {
                if (!array_key_exists($key, $validated)) {
                    $validated[$key] = $value;
                }
            }
        }

        $slug = $validated['slug'] ?? '';
        if ($slug === '') {
            $slug = Str::slug($validated['name']);
        }

        $uniqueRule = Product::query()->where('slug', $slug);
        if ($product) {
            $uniqueRule->where('id', '!=', $product->id);
        }
        if ($uniqueRule->exists()) {
            $slug = $slug . '-' . Str::lower(Str::random(4));
        }

        $specs = $this->parseList($validated['specs'] ?? null);
        $tags = $this->parseList($validated['tags'] ?? null);
        $variants = $this->parseList($validated['variants'] ?? null);
        $dimensions = $this->parseDimensions($validated);
        $imageUrl = $product?->image ?? null;
        $galleryUrls = $product?->images ?? [];

        if ($request->hasFile('image_file')) {
            $imagePath = $request->file('image_file')->store('products', 'public');
            $imageUrl = Storage::url($imagePath);
        }

        if ($request->hasFile('images_files')) {
            $galleryUrls = [];
            foreach ($request->file('images_files') as $file) {
                $path = $file->store('products', 'public');
                $galleryUrls[] = Storage::url($path);
            }
        }

        return [
            'name' => $validated['name'],
            'slug' => $slug,
            'sku' => $validated['sku'] ?? null,
            'price_cents' => $this->priceToCents($validated['price']),
            'sale_price_cents' => array_key_exists('sale_price', $validated)
                ? ($validated['sale_price'] !== null && $validated['sale_price'] !== ''
                    ? $this->priceToCents($validated['sale_price'])
                    : null)
                : $product?->sale_price_cents,
            'currency' => $validated['currency'] ?? 'EUR',
            'badge' => $validated['badge'] ?? null,
            'color' => $validated['color'] ?? null,
            'summary' => $validated['summary'] ?? null,
            'short_description' => $validated['short_description'] ?? null,
            'description' => $validated['description'] ?? null,
            'specs' => $specs,
            'category' => $validated['category'] ?? null,
            'brand' => $validated['brand'] ?? null,
            'image' => $imageUrl,
            'images' => $galleryUrls,
            'tags' => $tags,
            'variants' => $variants,
            'stock' => $validated['stock'] ?? 0,
            'weight_grams' => $validated['weight_grams'] ?? null,
            'dimensions' => $dimensions,
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
        ];
    }

    private function priceToCents(string|int|float $price): int
    {
        $normalized = str_replace(',', '.', (string) $price);
        return (int) round(((float) $normalized) * 100);
    }

    private function formatPrice(int $cents): string
    {
        return number_format($cents / 100, 2, '.', '');
    }

    /**
     * @return list<string>
     */
    private function parseList(?string $value): array
    {
        if (!$value) {
            return [];
        }

        $parts = preg_split('/\r\n|\r|\n|,/', $value);

        return array_values(array_filter(array_map('trim', $parts)));
    }

    private function parseDimensions(array $validated): ?array
    {
        $length = $validated['dimensions_length'] ?? null;
        $width = $validated['dimensions_width'] ?? null;
        $height = $validated['dimensions_height'] ?? null;
        $unit = $validated['dimensions_unit'] ?? null;

        if ($length === null && $width === null && $height === null && $unit === null) {
            return null;
        }

        return [
            'length' => $length !== null ? (float) $length : null,
            'width' => $width !== null ? (float) $width : null,
            'height' => $height !== null ? (float) $height : null,
            'unit' => $unit ?? 'cm',
        ];
    }
}
