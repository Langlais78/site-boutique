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
            'price_cents' => fake()->numberBetween(1900, 159900),
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
            'image' => null,
            'stock' => fake()->numberBetween(0, 18),
            'is_active' => true,
        ];
    }
}
