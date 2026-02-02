<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $since = Carbon::now()->subDays(30);

        $ordersQuery = Order::query()->where('created_at', '>=', $since);

        $ordersCount = $ordersQuery->count();
        $revenueCents = $ordersQuery->sum('total_cents');
        $averageCents = $ordersCount > 0 ? (int) round($revenueCents / $ordersCount) : 0;

        $ordersByStatus = Order::query()
            ->select('status', DB::raw('count(*) as count'))
            ->where('created_at', '>=', $since)
            ->groupBy('status')
            ->orderByDesc('count')
            ->get()
            ->map(function ($row) {
                return [
                    'status' => $row->status,
                    'count' => (int) $row->count,
                ];
            });

        $productsCount = Product::query()->count();
        $featuredCount = Product::query()->where('is_featured', true)->count();
        $outOfStockCount = Product::query()->where('stock', '<=', 0)->count();
        $lowStockCount = Product::query()->whereBetween('stock', [1, 5])->count();

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

        $recentProducts = Product::query()
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'price_cents', 'stock', 'image', 'created_at']);

        $lowStock = Product::query()
            ->where('stock', '<=', 5)
            ->orderBy('stock')
            ->take(5)
            ->get(['id', 'name', 'stock']);

        $recentUsers = User::query()
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'created_at']);

        return Inertia::render('AdminDashboard', [
            'stats' => [
                'revenue_cents' => $revenueCents,
                'orders_count' => $ordersCount,
                'average_cents' => $averageCents,
                'products_count' => $productsCount,
                'featured_count' => $featuredCount,
                'out_of_stock' => $outOfStockCount,
                'low_stock' => $lowStockCount,
                'currency' => 'EUR',
            ],
            'ordersByStatus' => $ordersByStatus,
            'recentOrders' => $recentOrders,
            'recentProducts' => $recentProducts,
            'recentUsers' => $recentUsers,
            'lowStock' => $lowStock,
        ]);
    }
}
