<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use Inertia\Inertia;
use Inertia\Response;

class CustomArcadeController extends Controller
{
    public function __invoke(): Response
    {
        $items = Accessory::query()
            ->with('type:id,name,slug')
            ->orderBy('type_id')
            ->orderBy('name')
            ->get(['id', 'type_id', 'name']);

        $accessories = $items->groupBy(function ($item) {
            return $item->type?->slug ?? 'autre';
        })->map(function ($group) {
            return $group->values()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                ];
            });
        })->toArray();

        return Inertia::render('CustomArcade', [
            'accessories' => $accessories,
        ]);
    }
}
