<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (Auth::check()) {
            $id = Auth::user()->id;
            $auth = User::find($id);
            foreach($roles as $role) {
                if($auth->role()->first()->name === $role) {
                    return $next($request);
                }
            }
            return Redirect::route('welcome');
        } else {
            return Redirect::route('dashboard');
        }

        return Redirect::route('login');
    }
}
