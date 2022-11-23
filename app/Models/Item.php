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
        'unit_id',
        'received_by',
        'issued_by',
        'quantity',
        'location_id',
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

    public function location() {
        return $this->hasOne(Location::class, 'id', 'location_id');
    }

    public function unit() {
        return $this->hasOne(Unit::class, 'id', 'unit_id');
    }
}
