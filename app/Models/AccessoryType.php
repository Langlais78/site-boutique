<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccessoryType extends Model
{
    /** @use HasFactory<\Database\Factories\AccessoryTypeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function accessories()
    {
        return $this->hasMany(Accessory::class, 'type_id');
    }
}
