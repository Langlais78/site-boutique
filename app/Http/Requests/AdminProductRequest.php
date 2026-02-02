<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isCreate = $this->routeIs('admin.products.store');

        return [
            'name' => [$isCreate ? 'required' : 'sometimes', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'sku' => ['nullable', 'string', 'max:255'],
            'price' => [$isCreate ? 'required' : 'sometimes', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'badge' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'specs' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:8192'],
            'images_files' => ['nullable', 'array'],
            'images_files.*' => ['image', 'max:8192'],
            'tags' => ['nullable', 'string'],
            'variants' => ['nullable', 'string'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'weight_grams' => ['nullable', 'integer', 'min:0'],
            'dimensions_length' => ['nullable', 'numeric', 'min:0'],
            'dimensions_width' => ['nullable', 'numeric', 'min:0'],
            'dimensions_height' => ['nullable', 'numeric', 'min:0'],
            'dimensions_unit' => ['nullable', 'string', 'max:10'],
            'is_active' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $nullableFields = [
            'sale_price',
            'stock',
            'weight_grams',
            'dimensions_length',
            'dimensions_width',
            'dimensions_height',
        ];

        $data = [];
        foreach ($nullableFields as $field) {
            if ($this->has($field) && $this->input($field) === '') {
                $data[$field] = null;
            }
        }

        if (!empty($data)) {
            $this->merge($data);
        }
    }
}
