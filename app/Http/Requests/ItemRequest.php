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
            'product_id' => ['required'],
            'serial_no' => ['required',  Rule::unique('items', 'serial_no')->ignore($id, 'id')],
            'received_by' => ['required'],
            'issued_by' => ['required'],
            'installed_at' => ['date', 'nullable'],
            'in_stock_date' => ['required', 'date'],
            'location' => ['required'],
            'inventory_location' => ['required'],
            'out_of_stock_date' => ['date', 'nullable'],
            'status_id' => ['required'],
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
            'serial_no' => 'serial number',
            'received_by' => 'receiver',
            'issued_by' => 'issuer',
            'installed_at' => 'installed date',
            'in_stock_date' => 'in stock date',
            'out_of_stock_date' => 'out of stock date',
            'status_id' => 'status',
        ];
    }
}
