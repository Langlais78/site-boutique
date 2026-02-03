<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminAccessoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type_id' => ['required', 'integer', 'exists:accessory_types,id'],
            'name' => ['required', 'string', 'max:120'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'image' => ['nullable', 'string', 'max:255'],
            'characteristics' => ['nullable', 'string'],
        ];
    }
}
