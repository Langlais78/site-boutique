<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::query()->get();

        for ($i = 1; $i <= 20; $i++) {
            $product = Product::factory()->create([
                'image' => "/images/" . (($i - 1) % 10 + 1) . ".png",
                'images' => ["/images/" . (($i - 1) % 10 + 1) . ".png"],
            ]);

            if ($categories->isEmpty()) {
                continue;
            }

            $ids = $categories->random(rand(1, 3))->pluck('id')->all();
            $product->categories()->sync($ids);
        }
    }
}
