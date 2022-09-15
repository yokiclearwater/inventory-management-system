<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $default_roles = array(
            [
                'id' => 1,
                'name' => 'user',
            ],
            [
                'id' => 2,
                'name' => 'admin',
            ],
            [
                'id' => 3,
                'name' => 'super_admin',
            ],
        );
        foreach($default_roles as $role) {
            Role::create([
                'id' => $role['id'],
                'name' => $role['name'],
            ]);
        }
    }
}
