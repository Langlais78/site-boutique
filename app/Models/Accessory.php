<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accessory extends Model
{
    /** @use HasFactory<\Database\Factories\AccessoryFactory> */
    use HasFactory;

    protected $fillable = [
        'type_id',
        'name',
        'price_cents',
        'image',
        'characteristics',
    ];

    protected $casts = [
        'characteristics' => 'array',
        'price_cents' => 'integer',
    ];

    public function type()
    {
        return $this->belongsTo(AccessoryType::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
