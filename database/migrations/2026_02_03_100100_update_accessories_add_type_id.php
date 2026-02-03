<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('accessories', function (Blueprint $table) {
            $table->foreignId('type_id')->nullable()->after('id')->constrained('accessory_types');
        });

        $types = DB::table('accessories')
            ->select('type')
            ->whereNotNull('type')
            ->distinct()
            ->pluck('type')
            ->all();

        foreach ($types as $type) {
            $slug = Str::slug($type);
            $typeId = DB::table('accessory_types')->insertGetId([
                'name' => $type,
                'slug' => $slug !== '' ? $slug : Str::random(6),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('accessories')
                ->where('type', $type)
                ->update(['type_id' => $typeId]);
        }

        Schema::table('accessories', function (Blueprint $table) {
            $table->dropIndex(['type']);
            $table->dropColumn('type');
            $table->index('type_id');
        });
    }

    public function down(): void
    {
        Schema::table('accessories', function (Blueprint $table) {
            $table->string('type')->nullable()->after('id');
        });

        $types = DB::table('accessory_types')->get(['id', 'name']);
        foreach ($types as $type) {
            DB::table('accessories')
                ->where('type_id', $type->id)
                ->update(['type' => $type->name]);
        }

        Schema::table('accessories', function (Blueprint $table) {
            $table->dropForeign(['type_id']);
            $table->dropColumn('type_id');
            $table->index('type');
        });
    }
};
