<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\RolePermission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // super admin role and permission seed
        for ($i = 1; $i <= 4; $i++) {
            RolePermission::create([
                'role_id' => Role::where('name', 'LIKE', 'super_admin')->first()->id,
                'permission_id' => $i,
            ]);
        }

        // admin role and permission seed
        for ($i = 1; $i <= 4; $i++) {
            RolePermission::create([
                'role_id' => Role::where('name', 'LIKE', 'admin')->first()->id,
                'permission_id' => $i,
            ]);
        }

        // user role and permission seed
        RolePermission::create([
            'role_id' => Role::where('name', 'LIKE', 'user')->first()->id,
            'permission_id' => 2,
        ]);
    }
}
