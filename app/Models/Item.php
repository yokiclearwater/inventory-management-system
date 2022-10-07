<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Item extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;

    protected $fillable = [
        'product_id',
        'serial_no',
        'received_by',
        'issued_by',
        'installed_date',
        'location',
        'product_location',
        'in_stock_date',
        'out_of_stock_date',
        'status_id',
    ];

    public function product() {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function status() {
        return $this->hasOne(ItemStatus::class, 'id', 'status_id');
    }
}
