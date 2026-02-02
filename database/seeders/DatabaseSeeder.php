<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'is_admin' => true,
                'email_verified_at' => now(),
                'password' => 'password',
            ],
        );

        $products = Product::factory(12)->create();

        $orders = Order::factory(2)->for($admin)->create();

        foreach ($orders as $order) {
            $items = $products->random(2);
            $total = 0;

            foreach ($items as $product) {
                $quantity = random_int(1, 2);
                $total += $product->price_cents * $quantity;

                OrderItem::factory()->for($order)->create([
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'unit_price_cents' => $product->price_cents,
                    'quantity' => $quantity,
                    'total_cents' => $product->price_cents * $quantity,
                ]);
            }

            $order->update([
                'number' => 'BS-' . Str::padLeft((string) $order->id, 4, '0'),
                'total_cents' => $total,
            ]);
        }
    }
}
