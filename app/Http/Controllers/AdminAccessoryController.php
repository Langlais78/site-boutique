<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAccessoryRequest;
use App\Models\Accessory;
use App\Models\AccessoryType;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminAccessoryController extends Controller
{
    public function index(): Response
    {
        $accessories = Accessory::query()
            ->with('type:id,name,slug')
            ->orderBy('type_id')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Accessories/Index', [
            'accessories' => $accessories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Accessories/Create', [
            'types' => AccessoryType::query()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(AdminAccessoryRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['characteristics'] = $this->parseList($data['characteristics'] ?? null);
        $data['price_cents'] = $this->priceToCents($data['price'] ?? null);
        unset($data['price']);

        Accessory::create($data);

        return redirect()->route('admin.accessories.index');
    }

    public function edit(Accessory $accessory): Response
    {
        return Inertia::render('Admin/Accessories/Edit', [
            'accessory' => [
                'id' => $accessory->id,
                'type_id' => $accessory->type_id,
                'name' => $accessory->name,
                'price' => $this->formatPrice($accessory->price_cents),
                'image' => $accessory->image,
                'characteristics' => $accessory->characteristics
                    ? implode("\n", $accessory->characteristics)
                    : '',
            ],
            'types' => AccessoryType::query()->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(AdminAccessoryRequest $request, Accessory $accessory): RedirectResponse
    {
        $data = $request->validated();
        $data['characteristics'] = $this->parseList($data['characteristics'] ?? null);
        $data['price_cents'] = $this->priceToCents($data['price'] ?? null);
        unset($data['price']);

        $accessory->update($data);

        return redirect()->route('admin.accessories.index');
    }

    public function destroy(Accessory $accessory): RedirectResponse
    {
        $accessory->delete();

        return redirect()->route('admin.accessories.index');
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

    private function priceToCents(string|int|float|null $price): ?int
    {
        if ($price === null || $price === '') {
            return null;
        }

        $normalized = str_replace(',', '.', (string) $price);
        return (int) round(((float) $normalized) * 100);
    }

    private function formatPrice(?int $cents): string
    {
        if ($cents === null) {
            return '';
        }

        return number_format($cents / 100, 2, '.', '');
    }
}
