<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomArcade extends Model
{
    /** @use HasFactory<\Database\Factories\CustomArcadeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'box_accessory_id',
        'screen_accessory_id',
        'joystick_accessory_id',
        'console_accessory_id',
        'skin_accessory_id',
        'target_accessory_id',
    ];

    public function box()
    {
        return $this->belongsTo(Accessory::class, 'box_accessory_id');
    }

    public function screen()
    {
        return $this->belongsTo(Accessory::class, 'screen_accessory_id');
    }

    public function joystick()
    {
        return $this->belongsTo(Accessory::class, 'joystick_accessory_id');
    }

    public function console()
    {
        return $this->belongsTo(Accessory::class, 'console_accessory_id');
    }

    public function skin()
    {
        return $this->belongsTo(Accessory::class, 'skin_accessory_id');
    }

    public function target()
    {
        return $this->belongsTo(Accessory::class, 'target_accessory_id');
    }
}
