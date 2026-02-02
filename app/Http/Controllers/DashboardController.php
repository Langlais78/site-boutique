<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $orders = Order::query()
            ->where('user_id', $user->id)
            ->latest()
            ->withCount('items')
            ->take(5)
            ->get([
                'id',
                'number',
                'status',
                'total_cents',
                'currency',
                'placed_at',
                'created_at',
            ]);

        $totalSpent = Order::where('user_id', $user->id)->sum('total_cents');

        return Inertia::render('Dashboard', [
            'recentOrders' => $orders,
            'stats' => [
                'orders_count' => Order::where('user_id', $user->id)->count(),
                'total_spent_cents' => $totalSpent,
                'currency' => 'EUR',
            ],
        ]);
    }
}
