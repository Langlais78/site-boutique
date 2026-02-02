<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArcadeCabinetSeeder extends Seeder
{
    public function run(): void
    {
        $name = 'Borne d\'arcade Legends Ultimate HD';
        $slug = Str::slug($name);

        $product = Product::updateOrCreate(
            ['slug' => $slug],
            [
                'name' => $name,
                'sku' => 'ARCADE-LEGENDS-ULTIMATE-HD',
                'price_cents' => 0,
                'currency' => 'EUR',
                'badge' => 'Arcade',
                'color' => 'Noir',
                'summary' => 'Borne d\'arcade full size avec ecran LCD HD 24 pouces et controle arcade double joueur.',
                'short_description' => 'Borne d\'arcade connectee avec ecran 24 pouces, double joueur et controles arcade.',
                'description' => 'La Legends Ultimate HD est une borne d\'arcade full size avec ecran LCD HD 24 pouces, commandes double joueur, trackball et spinners. Elle propose une experience arcade familiale avec 300 jeux integres.',
                'specs' => [
                    'Ecran LCD HD 24 pouces',
                    'Deux joysticks et deux spinners',
                    'Trackball arcade premium',
                    'Dimensions 29.53 x 21.65 x 66.44 in',
                    '300 jeux integres',
                ],
                'brand' => 'AtGames',
                'image' => '/images/1.png',
                'images' => ['/images/1.png'],
                'stock' => 5,
                'weight_grams' => null,
                'dimensions' => [
                    'length' => 29.53,
                    'width' => 21.65,
                    'height' => 66.44,
                    'unit' => 'in',
                ],
                'is_active' => true,
                'is_featured' => true,
            ],
        );

        $categorySlugs = [
            Str::slug('Gaming'),
            Str::slug('Consoles & Accessoires'),
        ];
        $categoryIds = Category::query()
            ->whereIn('slug', $categorySlugs)
            ->pluck('id')
            ->all();

        if (!empty($categoryIds)) {
            $product->categories()->sync($categoryIds);
        }
    }
}
