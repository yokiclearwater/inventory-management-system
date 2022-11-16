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
            'unit' => ['required'],
            'quantity' => ['required', 'integer'],
            'received_by' => ['required'],
            'issued_by' => ['required'],
            'in_stock_date' => ['required', 'date'],
            'location_id' => ['required'],
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
            'received_by' => 'receiver',
            'issued_by' => 'issuer',
            'in_stock_date' => 'in stock date',
            'out_of_stock_date' => 'out of stock date',
            'status_id' => 'status',
        ];
    }
}
