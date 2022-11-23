<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockOutReport extends Model
{
    use HasFactory;

    protected $fillable = ['item_id', 'received_by', 'issued_by', 'quantity', 'stock_out_date'];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
