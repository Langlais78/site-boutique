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
        $cart = $this->summarize($this->getItemsMap($request));

        return Inertia::render('Cart', [
            'items' => $cart['items'],
            'summary' => $cart['summary'],
        ]);
    }

    public function add(Request $request, Product $product): RedirectResponse
    {
        $quantity = (int) $request->input('quantity', 1);
        $quantity = max(1, $quantity);
        $accessoryIds = $request->input('accessory_ids', []);
        $accessoryIds = is_array($accessoryIds) ? $accessoryIds : [];

        $items = $this->getItemsMap($request);
        $customText = (string) $request->input('custom_text', '');
        $customColor = (string) $request->input('custom_color', '');
        $customFont = (string) $request->input('custom_font', '');
        if ($customText !== '') {
            $customText = mb_substr($customText, 0, 18);
        }
        $selectedAccessories = $product->accessories()
            ->with('type:id,name')
            ->whereIn('accessories.id', $accessoryIds)
            ->get(['accessories.id', 'accessories.name', 'accessories.price_cents', 'accessories.type_id']);
        $accessoriesTotal = $selectedAccessories->sum('price_cents');
        $textPrice = $customText !== '' ? (mb_strlen($customText) * 500) : 0;
        $unitPrice = ($product->price_cents ?? 0) + (int) $accessoriesTotal + $textPrice;

        if (isset($items[$product->id])) {
            $items[$product->id]['quantity'] += $quantity;
            $items[$product->id]['unit_price_cents'] = $unitPrice;
            $items[$product->id]['accessories'] = $selectedAccessories->map(function ($accessory) {
                return [
                    'id' => $accessory->id,
                    'name' => $accessory->name,
                    'price_cents' => $accessory->price_cents,
                    'type_id' => $accessory->type_id,
                ];
            })->values()->all();
            $items[$product->id]['custom_text'] = $customText;
            $items[$product->id]['custom_color'] = $customColor;
            $items[$product->id]['custom_font'] = $customFont;
            $items[$product->id]['custom_text_price_cents'] = $textPrice;
            $items[$product->id]['total_cents'] =
                $items[$product->id]['quantity'] * $items[$product->id]['unit_price_cents'];
        } else {
            $items[$product->id] = [
                'product_id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'unit_price_cents' => $unitPrice,
                'currency' => $product->currency,
                'quantity' => $quantity,
                'accessories' => $selectedAccessories->map(function ($accessory) {
                    return [
                        'id' => $accessory->id,
                        'name' => $accessory->name,
                        'price_cents' => $accessory->price_cents,
                        'type_id' => $accessory->type_id,
                    ];
                })->values()->all(),
                'custom_text' => $customText,
                'custom_color' => $customColor,
                'custom_font' => $customFont,
                'custom_text_price_cents' => $textPrice,
                'total_cents' => $unitPrice * $quantity,
            ];
        }

        $this->storeCart($request, $items);

        return redirect()->route('cart.index');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $quantity = (int) $request->input('quantity', 1);
        $quantity = max(1, $quantity);

        $items = $this->getItemsMap($request);

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
        $items = $this->getItemsMap($request);

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
    private function getItemsMap(Request $request): array
    {
        return $request->session()->get('cart.items', []);
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @return array{items: array<int, array<string, mixed>>, summary: array<string, int|string>}
     */
    private function summarize(array $items): array
    {
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
