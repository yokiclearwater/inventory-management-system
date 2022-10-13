<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index() {
        $roles = Role::all();
        $users = User::with('role')->get()->except(Auth::id());

        return Inertia::render('UpdateRole', compact('roles', 'users'));
    }

    public function update(Request $request) {
        $id = $request->user_data['id'];
        $user = User::find($id);
        $user->role_id = $request->role_id;
        $user->save();

        return Redirect::route('roles.index');
    }
}
