<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ],
        );

        User::factory(5)->create();

        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            ArcadeCabinetSeeder::class,
            AccessorySeeder::class,
            CustomLetterLightSeeder::class,
        ]);

        $products = Product::query()->get();
        $orders = Order::factory(2)->for($admin)->create();

        foreach ($orders as $order) {
            $items = $products->random(2);
            $total = 0;

            foreach ($items as $product) {
                $quantity = random_int(1, 2);
                $total += ($product->price_cents ?? 0) * $quantity;

                $order->items()->create([
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'price_cents' => $product->price_cents ?? 0,
                    'quantity' => $quantity,
                ]);
            }

            $order->update([
                'total_cents' => $total,
            ]);
        }
    }
}
