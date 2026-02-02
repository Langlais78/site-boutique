<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
                'price_cents',
                'currency',
                'badge',
                'category',
                'stock',
                'is_active',
                'updated_at',
            ]);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validatedData($request);

        Product::create($data);

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $this->formatPrice($product->price_cents),
                'currency' => $product->currency,
                'badge' => $product->badge,
                'color' => $product->color,
                'summary' => $product->summary,
                'description' => $product->description,
                'specs' => $product->specs ?? [],
                'category' => $product->category,
                'image' => $product->image,
                'stock' => $product->stock,
                'is_active' => $product->is_active,
            ],
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $this->validatedData($request, $product);

        $product->update($data);

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index');
    }

    private function validatedData(Request $request, ?Product $product = null): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'badge' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'specs' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];

        $validated = $request->validate($rules);

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

        $specs = $this->parseSpecs($validated['specs'] ?? null);

        return [
            'name' => $validated['name'],
            'slug' => $slug,
            'price_cents' => $this->priceToCents($validated['price']),
            'currency' => $validated['currency'] ?? 'EUR',
            'badge' => $validated['badge'] ?? null,
            'color' => $validated['color'] ?? null,
            'summary' => $validated['summary'] ?? null,
            'description' => $validated['description'] ?? null,
            'specs' => $specs,
            'category' => $validated['category'] ?? null,
            'image' => $validated['image'] ?? null,
            'stock' => $validated['stock'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? false),
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
    private function parseSpecs(?string $specs): array
    {
        if (!$specs) {
            return [];
        }

        $parts = preg_split('/\r\n|\r|\n|,/', $specs);

        return array_values(array_filter(array_map('trim', $parts)));
    }
}
