<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAccessoryTypeRequest;
use App\Models\AccessoryType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminAccessoryTypeController extends Controller
{
    public function index(): Response
    {
        $types = AccessoryType::query()
            ->withCount('accessories')
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/AccessoryTypes/Index', [
            'types' => $types,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/AccessoryTypes/Create');
    }

    public function store(AdminAccessoryTypeRequest $request): RedirectResponse
    {
        $data = $request->validated();

        AccessoryType::create([
            'name' => $data['name'],
            'slug' => $this->uniqueSlug($data['slug'] ?? '', $data['name']),
        ]);

        return redirect()->route('admin.accessory-types.index');
    }

    public function edit(AccessoryType $accessoryType): Response
    {
        return Inertia::render('Admin/AccessoryTypes/Edit', [
            'type' => $accessoryType->only(['id', 'name', 'slug']),
        ]);
    }

    public function update(
        AdminAccessoryTypeRequest $request,
        AccessoryType $accessoryType,
    ): RedirectResponse {
        $data = $request->validated();

        $accessoryType->update([
            'name' => $data['name'],
            'slug' => $this->uniqueSlug(
                $data['slug'] ?? '',
                $data['name'],
                $accessoryType->id,
            ),
        ]);

        return redirect()->route('admin.accessory-types.index');
    }

    public function destroy(AccessoryType $accessoryType): RedirectResponse
    {
        if ($accessoryType->accessories()->exists()) {
            return back()->with('error', 'Impossible de supprimer un type utilise.');
        }

        $accessoryType->delete();

        return redirect()->route('admin.accessory-types.index');
    }

    private function uniqueSlug(string $slug, string $name, ?int $ignoreId = null): string
    {
        $value = $slug !== '' ? $slug : $name;
        $finalSlug = Str::slug($value);
        if ($finalSlug === '') {
            $finalSlug = Str::random(6);
        }

        $query = AccessoryType::query()->where('slug', $finalSlug);
        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        if ($query->exists()) {
            $finalSlug = $finalSlug . '-' . Str::lower(Str::random(4));
        }

        return $finalSlug;
    }
}
