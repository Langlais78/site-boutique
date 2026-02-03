<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminCustomArcadeRequest;
use App\Models\Accessory;
use App\Models\CustomArcade;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminCustomArcadeController extends Controller
{
    public function index(): Response
    {
        $arcades = CustomArcade::query()
            ->with(['box', 'screen', 'joystick', 'console', 'skin', 'target'])
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Admin/CustomArcades/Index', [
            'arcades' => $arcades,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/CustomArcades/Create', [
            'accessories' => $this->accessoriesByType(),
        ]);
    }

    public function store(AdminCustomArcadeRequest $request): RedirectResponse
    {
        CustomArcade::create($request->validated());

        return redirect()->route('admin.custom-arcades.index');
    }

    public function edit(CustomArcade $customArcade): Response
    {
        return Inertia::render('Admin/CustomArcades/Edit', [
            'arcade' => $customArcade,
            'accessories' => $this->accessoriesByType(),
        ]);
    }

    public function update(
        AdminCustomArcadeRequest $request,
        CustomArcade $customArcade,
    ): RedirectResponse {
        $customArcade->update($request->validated());

        return redirect()->route('admin.custom-arcades.index');
    }

    public function destroy(CustomArcade $customArcade): RedirectResponse
    {
        $customArcade->delete();

        return redirect()->route('admin.custom-arcades.index');
    }

    private function accessoriesByType(): array
    {
        $items = Accessory::query()
            ->with('type:id,name,slug')
            ->orderBy('type_id')
            ->orderBy('name')
            ->get(['id', 'type_id', 'name']);

        return $items->groupBy(function ($item) {
            return $item->type?->slug ?? 'autre';
        })->map(function ($group) {
            return $group->values()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                ];
            });
        })->toArray();
    }
}
