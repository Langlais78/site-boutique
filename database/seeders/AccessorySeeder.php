<?php

namespace Database\Seeders;

use App\Models\Accessory;
use Illuminate\Database\Seeder;

class AccessorySeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            'box' => [
                'Box Compacte',
                'Box Mid-size',
                'Box Full-size',
                'Box Premium Bois',
                'Box Metal Pro',
            ],
            'screen' => [
                'Ecran 24" HD',
                'Ecran 27" QHD',
                'Ecran 32" 4K',
                'Ecran 24" IPS',
                'Ecran 32" UltraWide',
            ],
            'joystick' => [
                'Joystick 2 joueurs',
                'Joystick 4 joueurs',
                'Joystick + Trackball',
                'Joystick Sanwa',
                'Joystick Hori',
            ],
            'console' => [
                'Console Retro',
                'Console Next-gen',
                'PC Emulation',
                'Console Mini',
                'Console Cloud',
            ],
            'skin' => [
                'Skin Retro',
                'Skin Neo Cyber',
                'Skin Minimal',
                'Skin Street',
                'Skin Custom Logo',
            ],
            'target' => [
                'Cible Famille',
                'Cible Pro',
                'Cible Competition',
                'Cible Streaming',
                'Cible Event',
            ],
        ];

        foreach ($types as $type => $names) {
            foreach ($names as $name) {
                Accessory::updateOrCreate(
                    ['type' => $type, 'name' => $name],
                    [
                        'image' => null,
                        'characteristics' => [],
                    ],
                );
            }
        }
    }
}
