<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = $this->getCart($request);

        return Inertia::render('Cart', [
            'items' => $cart['items'],
            'summary' => $cart['summary'],
        ]);
    }

    public function add(Request $request, Product $product): RedirectResponse
    {
        $quantity = (int) $request->input('quantity', 1);
        $quantity = max(1, $quantity);

        $cart = $this->getCart($request);
        $items = $cart['items'];

        if (isset($items[$product->id])) {
            $items[$product->id]['quantity'] += $quantity;
            $items[$product->id]['total_cents'] =
                $items[$product->id]['quantity'] * $items[$product->id]['unit_price_cents'];
        } else {
            $items[$product->id] = [
                'product_id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'unit_price_cents' => $product->price_cents,
                'currency' => $product->currency,
                'quantity' => $quantity,
                'total_cents' => $product->price_cents * $quantity,
            ];
        }

        $this->storeCart($request, $items);

        return redirect()->route('cart.index');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $quantity = (int) $request->input('quantity', 1);
        $quantity = max(1, $quantity);

        $cart = $this->getCart($request);
        $items = $cart['items'];

        if (isset($items[$product->id])) {
            $items[$product->id]['quantity'] = $quantity;
            $items[$product->id]['total_cents'] =
                $items[$product->id]['unit_price_cents'] * $quantity;
        }

        $this->storeCart($request, $items);

        return redirect()->route('cart.index');
    }

    public function remove(Request $request, Product $product): RedirectResponse
    {
        $cart = $this->getCart($request);
        $items = $cart['items'];

        unset($items[$product->id]);

        $this->storeCart($request, $items);

        return redirect()->route('cart.index');
    }

    public function clear(Request $request): RedirectResponse
    {
        $request->session()->forget('cart');

        return redirect()->route('cart.index');
    }

    /**
     * @return array{items: array<int, array<string, mixed>>, summary: array<string, int|string>}
     */
    private function getCart(Request $request): array
    {
        $items = $request->session()->get('cart.items', []);
        $currency = 'EUR';
        $total = 0;
        $count = 0;

        foreach ($items as $item) {
            $total += (int) ($item['total_cents'] ?? 0);
            $count += (int) ($item['quantity'] ?? 0);
            $currency = $item['currency'] ?? $currency;
        }

        return [
            'items' => array_values($items),
            'summary' => [
                'total_cents' => $total,
                'currency' => $currency,
                'items_count' => $count,
            ],
        ];
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    private function storeCart(Request $request, array $items): void
    {
        $request->session()->put('cart.items', $items);
    }
}
