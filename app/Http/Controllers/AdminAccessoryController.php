<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAccessoryRequest;
use App\Models\Accessory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminAccessoryController extends Controller
{
    public function index(): Response
    {
        $accessories = Accessory::query()
            ->orderBy('type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Accessories/Index', [
            'accessories' => $accessories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Accessories/Create');
    }

    public function store(AdminAccessoryRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['characteristics'] = $this->parseList($data['characteristics'] ?? null);

        Accessory::create($data);

        return redirect()->route('admin.accessories.index');
    }

    public function edit(Accessory $accessory): Response
    {
        return Inertia::render('Admin/Accessories/Edit', [
            'accessory' => [
                'id' => $accessory->id,
                'type' => $accessory->type,
                'name' => $accessory->name,
                'image' => $accessory->image,
                'characteristics' => $accessory->characteristics
                    ? implode("\n", $accessory->characteristics)
                    : '',
            ],
        ]);
    }

    public function update(AdminAccessoryRequest $request, Accessory $accessory): RedirectResponse
    {
        $data = $request->validated();
        $data['characteristics'] = $this->parseList($data['characteristics'] ?? null);

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
}
