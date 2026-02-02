<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'number' => 'BS-' . fake()->unique()->numberBetween(4100, 4999),
            'status' => fake()->randomElement([
                'pending',
                'preparing',
                'shipping',
                'delivered',
            ]),
            'total_cents' => fake()->numberBetween(2900, 249900),
            'currency' => 'EUR',
            'placed_at' => now()->subDays(fake()->numberBetween(1, 30)),
        ];
    }
}
