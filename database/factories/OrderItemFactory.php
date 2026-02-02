<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 3);
        $unit = fake()->numberBetween(1900, 89900);

        return [
            'product_name' => fake()->words(3, true),
            'unit_price_cents' => $unit,
            'quantity' => $quantity,
            'total_cents' => $unit * $quantity,
        ];
    }
}
