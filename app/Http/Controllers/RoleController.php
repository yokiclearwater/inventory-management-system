<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class RoleController extends Controller
{
    protected $restricted_roles = array("user", "admin", "super_admin");

    public function index() {
        $roles = Role::whereNotIn("name", $this->restricted_roles)->paginate();
        $restricted_roles = Role::whereIn("name", $this->restricted_roles)->paginate();
        return Inertia::render('Role/Index', [
            'roles' => $roles,
            'restricted_roles' => $restricted_roles
        ]);
    }

    public function show($id) {
        $role = Role::with('permissions')->find($id);

        return Inertia::render('Role/View', compact('role'));
    }

    public function edit($id) {
        $role = Role::with('permissions')->find($id);
        $permissions = Permission::all();
        if(!in_array($role->name, $this->restricted_roles)) {
            return Inertia::render('Role/Edit', compact('role', 'permissions'));
        } else {
            return Redirect::route('access.denied')->withErrors([
                'forbidden' => 'Default Roles Are Restricted'
            ]);
        }
    }

    public function update(Request $request, $id) {
        $role = Role::find($id);
        $role->name = $request->name;
        $role->save();
        $role->permissions()->sync($request->permissions);

        return Redirect::route('roles.index');
    }

    public function edit_user_role() {
        $roles = Role::paginate();
        $users = User::with('role')->get()->except(Auth::id());

        return Inertia::render('Role/UpdateUserRole', compact('roles', 'users'));
    }

    public function create() {
        $roles = Role::paginate();
        $permissions = Permission::all();

        return Inertia::render('Role/Create', compact('roles', 'permissions'));
    }

    public function store(Request $request) {
        $name = $request->name;
        $name = Str::lower(Str::replace(' ', '_', $name));
        $permissions = $request->permissions;

        $role = new Role();
        $role->name = $name;
        $role->save();

        $role->permissions()->sync($permissions);

        return Redirect::route('roles.index');
    }

    public function update_user_role(Request $request) {
        $id = $request->user_data['id'];
        $user = User::find($id);
        $user->role_id = $request->role_id;
        $user->save();

        return Redirect::route('roles.edit_user_role');
    }

    public function destroy($id)
    {
        $role = Role::find($id);
        if(!in_array($role->name, $this->restricted_roles)) {
            if($role->users()->exists()) {
                $role_id = Role::where('name', '=', 'user')->first()->id;
                $role->users()->update(array('role_id' => $role_id));
            }

            $role->delete();
        } else {
            return Redirect::route('access.denied')->withErrors([
                'forbidden' => 'Default Roles Are Restricted'
            ]);
        }

        return Redirect::route('roles.index');
    }
}
