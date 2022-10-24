<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = array('create', 'view', 'update', 'delete');

        foreach($permissions as $permission) {
            Permission::create([
                'type' => $permission,
            ]);
        }
    }
}
