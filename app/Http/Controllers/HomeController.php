<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featured = Product::query()
            ->where('is_active', true)
            ->orderByDesc('created_at')
            ->take(3)
            ->get([
                'id',
                'name',
                'slug',
                'price_cents',
                'currency',
                'badge',
                'color',
            ]);

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'featuredProducts' => $featured,
        ]);
    }
}
