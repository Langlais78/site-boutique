<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminCustomArcadeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:160'],
            'box_accessory_id' => ['nullable', 'integer', 'exists:accessories,id'],
            'screen_accessory_id' => ['nullable', 'integer', 'exists:accessories,id'],
            'joystick_accessory_id' => ['nullable', 'integer', 'exists:accessories,id'],
            'console_accessory_id' => ['nullable', 'integer', 'exists:accessories,id'],
            'skin_accessory_id' => ['nullable', 'integer', 'exists:accessories,id'],
            'target_accessory_id' => ['nullable', 'integer', 'exists:accessories,id'],
        ];
    }
}
