<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CustomLetterLightSeeder extends Seeder
{
    public function run(): void
    {
        $name = 'Lettre lumineuse 3D personnalisee';
        $slug = 'lettre-lumineuse-3d-personnalisee';

        $product = Product::query()->updateOrCreate(
            ['slug' => $slug],
            [
                'name' => $name,
                'sku' => 'LETTRE-3D-LUM',
                'price_cents' => 500,
                'sale_price_cents' => null,
                'currency' => 'EUR',
                'badge' => '3D Print',
                'color' => 'Custom',
                'summary' => 'Lettre lumineuse imprimee en 3D, tarif 5 EUR par lettre.',
                'short_description' => 'Lettre LED 3D, personnalisation totale, 5 EUR la lettre.',
                'description' => 'Lettre lumineuse imprimee en 3D pour prenoms ou mots. Tarif indique: 5 EUR par lettre. Couleurs, taille et style sur mesure. Compatible eclairage LED discret. Commande ideale pour deco, cadeau ou vitrine.',
                'specs' => [
                    'Impression 3D haute precision',
                    'Tarif: 5 EUR par lettre',
                    'Personnalisation: couleur, taille, style',
                    'Compatible LED 5V',
                ],
                'category' => 'Impression 3D',
                'brand' => 'Barbu Studio',
                'image' => '/images/lettre-led.jpg',
                'images' => ['/images/lettre-led.jpg'],
                'tags' => ['print 3d', 'lettre', 'lumineux', 'personnalise'],
                'variants' => ['Couleurs', 'Taille', 'Police'],
                'stock' => 10,
                'weight_grams' => 250,
                'dimensions' => [
                    'length' => 12,
                    'width' => 4,
                    'height' => 15,
                    'unit' => 'cm',
                ],
                'is_active' => true,
                'is_featured' => true,
            ],
        );

        $category = Category::query()
            ->where('slug', 'impression-3d')
            ->orWhere('name', 'Impression 3D')
            ->first();

        if ($category) {
            $product->categories()->syncWithoutDetaching([$category->id]);
        }
    }
}
