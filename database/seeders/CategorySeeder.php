<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $names = [
            'Impression 3D',
            'Filaments & Resines',
            'Pieces et Remplacement',
            'Post-traitement',
            'Upgrades Imprimantes',
            'Borne Arcade',
            'Panels & Controls',
            'Electronique & IO',
            'Decors & Stickers',
            'Kits & Packs',
        ];

        foreach ($names as $name) {
            $slug = Str::slug($name);
            if (Category::where('slug', $slug)->exists()) {
                $slug = $slug . '-' . Str::lower(Str::random(4));
            }
            Category::updateOrCreate(
                ['slug' => $slug],
                ['name' => $name],
            );
        }
    }
}
