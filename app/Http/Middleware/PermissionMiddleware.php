<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$permissions)
    {
        if (Auth::check()) {
            $id = Auth::user()->id;
            $auth = User::find($id);
            $role_permissions = $auth->role()->first()->permissions()->get();

            foreach($permissions as $permission) {
                foreach($role_permissions as $role_permission) {
                    if($role_permission->type === $permission) {
                        return $next($request);
                    }
                }
            }

            if ($request->is('api/*') || $request->wantsJson()) {
                return response()->json(['message' => "Access Denied"], 403);
            } else {
                return Redirect::route('access.denied')->withErrors('Access Denied');
            }
        }

        return Redirect::route('login');
    }
}
