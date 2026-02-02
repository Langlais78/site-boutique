<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $since = Carbon::now()->subDays(30);

        $ordersQuery = Order::query()->where('created_at', '>=', $since);

        $ordersCount = $ordersQuery->count();
        $revenueCents = $ordersQuery->sum('total_cents');
        $averageCents = $ordersCount > 0 ? (int) round($revenueCents / $ordersCount) : 0;

        $recentOrders = Order::query()
            ->with('user')
            ->latest()
            ->take(5)
            ->get([
                'id',
                'number',
                'status',
                'total_cents',
                'currency',
                'user_id',
                'created_at',
            ])
            ->map(function (Order $order) {
                return [
                    'id' => $order->id,
                    'number' => $order->number,
                    'status' => $order->status,
                    'total_cents' => $order->total_cents,
                    'currency' => $order->currency,
                    'customer' => $order->user?->name,
                    'created_at' => $order->created_at,
                ];
            });

        $lowStock = Product::query()
            ->where('stock', '<=', 5)
            ->orderBy('stock')
            ->take(5)
            ->get(['id', 'name', 'stock']);

        return Inertia::render('AdminDashboard', [
            'stats' => [
                'revenue_cents' => $revenueCents,
                'orders_count' => $ordersCount,
                'average_cents' => $averageCents,
                'currency' => 'EUR',
            ],
            'recentOrders' => $recentOrders,
            'lowStock' => $lowStock,
        ]);
    }
}
