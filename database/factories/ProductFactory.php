<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'name' => Str::title($name),
            'slug' => Str::slug($name),
            'sku' => strtoupper(Str::random(8)),
            'price_cents' => fake()->numberBetween(1900, 159900),
            'sale_price_cents' => fake()->boolean(25)
                ? fake()->numberBetween(1500, 129900)
                : null,
            'currency' => 'EUR',
            'badge' => fake()->randomElement([
                'Precision',
                'Technique',
                'Gaming',
                'Upgrade',
            ]),
            'color' => fake()->randomElement([
                'Noir carbone',
                'Cyan',
                'Titane',
                'Anthracite',
            ]),
            'summary' => fake()->sentence(),
            'short_description' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'specs' => [
                fake()->word(),
                fake()->word(),
                fake()->word(),
            ],
            'category' => fake()->randomElement([
                'Impression 3D',
                'Gaming',
                'Atelier',
            ]),
            'brand' => fake()->randomElement([
                'Barbu',
                'Nova',
                'Flux',
                'Forge',
            ]),
            'image' => null,
            'images' => [],
            'tags' => [
                fake()->word(),
                fake()->word(),
            ],
            'variants' => [],
            'stock' => fake()->numberBetween(0, 18),
            'weight_grams' => fake()->numberBetween(200, 5000),
            'dimensions' => [
                'length' => fake()->numberBetween(10, 60),
                'width' => fake()->numberBetween(10, 60),
                'height' => fake()->numberBetween(5, 40),
                'unit' => 'cm',
            ],
            'is_active' => true,
            'is_featured' => fake()->boolean(20),
        ];
    }
}
