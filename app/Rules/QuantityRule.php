<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class QuantityRule implements Rule
{
    public $totalQuantity;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($itemQuantity)
    {
        $this->totalQuantity = $itemQuantity;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if($this->totalQuantity - $value >= 0) {
            return $value;
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Stock out quantity must be less than or equal to ' . $this->totalQuantity . ' (In Stock Quantity)';
    }
}
