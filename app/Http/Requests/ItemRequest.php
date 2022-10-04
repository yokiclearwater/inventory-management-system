<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $id = $this->route('item');

        return [
            'name' => ['required', 'max:120', Rule::unique('items', 'name')->ignore($id, 'id')],
            'description' => ['required'],
            'serial_no' => ['required', Rule::unique('items', 'serial_no')->ignore($id, 'id')],
            'model_id' => ['required', 'integer'],
            'brand_id' => ['required', 'integer'],
            'category_id' => ['required', 'integer'],
        ];
    }
}
