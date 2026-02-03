<?php

namespace Database\Seeders;

use App\Models\Accessory;
use App\Models\AccessoryType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AccessorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Borne Arcade',
            'Impression 3D',
            'Kits & Packs',
        ];

        foreach ($categories as $name) {
            \App\Models\Category::updateOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name],
            );
        }

        $types = [
            [
                'slug' => 'chassis',
                'name' => 'Chassis',
                'base_price' => 28000,
                'items' => [
                    'Chassis Compact',
                    'Chassis Standard',
                    'Chassis XL',
                    'Chassis Bois',
                    'Chassis Metal Pro',
                ],
            ],
            [
                'slug' => 'screen',
                'name' => 'Ecran',
                'base_price' => 19000,
                'items' => [
                    'Ecran 24 pouces HD',
                    'Ecran 27 pouces QHD',
                    'Ecran 32 pouces 4K',
                    'Ecran 24 pouces IPS',
                    'Ecran 34 pouces UltraWide',
                ],
            ],
            [
                'slug' => 'joystick',
                'name' => 'Joystick',
                'base_price' => 12500,
                'items' => [
                    'Joystick 2 joueurs',
                    'Joystick 4 joueurs',
                    'Joystick + Trackball',
                    'Joystick Sanwa',
                    'Joystick Hori',
                ],
            ],
            [
                'slug' => 'buttons',
                'name' => 'Boutons',
                'base_price' => 7000,
                'items' => [
                    'Kit boutons 6',
                    'Kit boutons 8',
                    'Boutons lumineux RGB',
                    'Boutons silencieux',
                    'Boutons metalliques',
                ],
            ],
            [
                'slug' => 'audio',
                'name' => 'Audio',
                'base_price' => 8000,
                'items' => [
                    'Haut-parleurs stereo',
                    'Kit audio premium',
                    'Amplificateur compact',
                    'Subwoofer slim',
                    'Soundbar arcade',
                ],
            ],
            [
                'slug' => 'marquee',
                'name' => 'Marquee',
                'base_price' => 6000,
                'items' => [
                    'Marquee retro',
                    'Marquee neon',
                    'Marquee minimal',
                    'Marquee custom logo',
                    'Marquee full print',
                ],
            ],
            [
                'slug' => 'lighting',
                'name' => 'Eclairage',
                'base_price' => 6500,
                'items' => [
                    'Bande LED RGB',
                    'Eclairage white soft',
                    'Eclairage bleu cyber',
                    'Eclairage ambiance UV',
                    'Eclairage dynamique',
                ],
            ],
            [
                'slug' => 'vinyl',
                'name' => 'Vinyles',
                'base_price' => 9000,
                'items' => [
                    'Vinyle retro',
                    'Vinyle neo cyber',
                    'Vinyle minimal',
                    'Vinyle street',
                    'Vinyle custom logo',
                ],
            ],
            [
                'slug' => 'control-board',
                'name' => 'Control Board',
                'base_price' => 11000,
                'items' => [
                    'Control board USB',
                    'Control board Bluetooth',
                    'Control board pro',
                    'Control board low latency',
                    'Control board multi-joueur',
                ],
            ],
            [
                'slug' => 'filament',
                'name' => 'Filament',
                'base_price' => 3500,
                'items' => [
                    'PLA Standard',
                    'PLA Mat',
                    'PETG Renforce',
                    'ABS Pro',
                    'Resine UV',
                ],
            ],
        ];

        foreach ($types as $type) {
            $slug = $type['slug'] ?? Str::slug($type['name']);
            $typeModel = AccessoryType::updateOrCreate(
                ['name' => $type['name']],
                ['slug' => $slug],
            );

            foreach ($type['items'] as $index => $name) {
                $priceCents = $type['base_price'] + ($index * 1500);
                Accessory::updateOrCreate(
                    ['type_id' => $typeModel->id, 'name' => $name],
                    [
                        'image' => null,
                        'characteristics' => [],
                        'price_cents' => $priceCents,
                    ],
                );
            }
        }

        $products = [
            [
                'name' => 'Arcade Prime',
                'image' => '/images/1.png',
                'price_cents' => 149900,
                'type_slugs' => [
                    'chassis',
                    'screen',
                    'joystick',
                    'buttons',
                    'audio',
                ],
                'category' => 'Borne Arcade',
            ],
            [
                'name' => 'PrintLab Core',
                'image' => '/images/2.png',
                'price_cents' => 89900,
                'type_slugs' => [
                    'chassis',
                    'screen',
                    'filament',
                    'control-board',
                    'lighting',
                ],
                'category' => 'Impression 3D',
            ],
            [
                'name' => 'Control Station',
                'image' => '/images/3.png',
                'price_cents' => 109900,
                'type_slugs' => [
                    'joystick',
                    'buttons',
                    'control-board',
                    'audio',
                    'lighting',
                ],
                'category' => 'Borne Arcade',
            ],
            [
                'name' => 'Audio Pulse',
                'image' => '/images/4.png',
                'price_cents' => 99900,
                'type_slugs' => [
                    'audio',
                    'lighting',
                    'vinyl',
                    'marquee',
                    'buttons',
                ],
                'category' => 'Kits & Packs',
            ],
            [
                'name' => 'Filament Lab',
                'image' => '/images/5.png',
                'price_cents' => 79900,
                'type_slugs' => [
                    'filament',
                    'chassis',
                    'screen',
                    'lighting',
                    'vinyl',
                ],
                'category' => 'Impression 3D',
            ],
        ];

        foreach ($products as $productData) {
            $slug = Str::slug($productData['name']);
            $product = \App\Models\Product::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $productData['name'],
                    'price_cents' => $productData['price_cents'],
                    'currency' => 'EUR',
                    'badge' => 'Bundle',
                    'color' => 'Studio',
                    'summary' => 'Pack complet avec accessoires.',
                    'short_description' => 'Pack complet avec accessoires.',
                    'description' => 'Produit complet avec tous les accessoires disponibles.',
                    'category' => $productData['category'],
                    'brand' => 'Barbu Studio',
                    'image' => $productData['image'],
                    'images' => [$productData['image']],
                    'stock' => 10,
                    'is_active' => true,
                    'is_featured' => true,
                    'is_personalizable' => true,
                ],
            );

            $categoryId = \App\Models\Category::query()
                ->where('slug', Str::slug($productData['category']))
                ->value('id');
            $product->categories()->sync($categoryId ? [$categoryId] : []);

            $accessoryIds = Accessory::query()
                ->whereHas('type', function ($query) use ($productData) {
                    $query->whereIn('slug', $productData['type_slugs']);
                })
                ->pluck('id')
                ->all();
            $product->accessories()->sync($accessoryIds);
        }
    }
}
