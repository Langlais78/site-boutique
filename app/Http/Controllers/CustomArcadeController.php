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
            ->orderBy('type')
            ->orderBy('name')
            ->get(['id', 'type', 'name']);

        $accessories = $items->groupBy('type')->map(function ($group) {
            return $group->values();
        })->toArray();

        return Inertia::render('CustomArcade', [
            'accessories' => $accessories,
        ]);
    }
}
