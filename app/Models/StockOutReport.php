<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class StockOutReport extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;

    public $timestamps = true;
    protected $fillable = ['item_id', 'received_by', 'issued_by', 'quantity', 'stock_out_date', 'user_id'];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
