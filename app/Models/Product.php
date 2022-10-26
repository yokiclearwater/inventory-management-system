<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Auditable as AuditingAuditable;
use OwenIt\Auditing\Contracts\Auditable;

class Product extends Model implements Auditable
{
    use AuditingAuditable;
    use HasFactory;

    protected $fillable = ['name', 'description', 'category_id', 'model_id', 'brand_id'];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function model()
    {
        return $this->belongsTo(ProductModel::class, 'model_id', 'id', 'product_models');
    }
}
