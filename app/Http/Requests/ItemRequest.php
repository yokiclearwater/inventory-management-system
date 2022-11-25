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
            'item_code' => ['string', 'nullable'],
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'part_number' => ['string', 'nullable'],
            'unit_id' => ['required', 'integer', 'exists:units,id'],
            'received_by' => ['required', 'string'],
            'issued_by' => ['required', 'string'],
            'in_stock_date' => ['required', 'date'],
            'location_id' => ['required', 'integer', 'exists:locations,id'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'product_id' => 'product',
            'unit_id' => 'unit',
            'received_by' => 'receiver',
            'issued_by' => 'issuer',
            'in_stock_date' => 'in stock date',
        ];
    }
}
