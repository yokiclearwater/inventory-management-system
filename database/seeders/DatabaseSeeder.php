<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\RolePermission;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->callOnce([
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            ItemStatusSeeder::class,
            // UnitSeeder::class,
        ]);

        User::create([
            'name' => 'Super Admin',
            'email' => 'super_admin@ims.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // password
            'remember_token' => Str::random(10),
            'role_id' => 3,
        ]);
    }
}
