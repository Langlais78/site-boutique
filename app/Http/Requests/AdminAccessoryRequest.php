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
            'type' => ['required', 'string', 'max:60'],
            'name' => ['required', 'string', 'max:120'],
            'image' => ['nullable', 'string', 'max:255'],
            'characteristics' => ['nullable', 'string'],
        ];
    }
}
