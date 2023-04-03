<?php

use App\Http\Controllers\EditProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StockOutReportController;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Item;
use App\Models\Product;
use App\Models\ProductModel;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'isAuth' => Auth::check(),
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    $id = Auth::user()->id;
    $user = User::find($id);

    if(!$user->role()->exists()) {
        $user->role_id = 1;
        $user->save();
    }

    $users_count = User::count();
    $role = $user->role()->first()->toArray();

    return Inertia::render('Dashboard', [
        'user' => $user,
        'users_count' => $users_count,
        'role' => $role,
        'categories_count' => Category::count(),
        'models_count' => ProductModel::count(),
        'brands_count' => Brand::count(),
        'products_count' => Product::count(),
        'items_count' => Item::count(),
        'ip' => Request::ip(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/access-denied', function () {
    return Inertia::render('AccessDenied', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'isAuth' => Auth::check(),
    ]);
})->name('access.denied');

Route::middleware(['auth', 'verified'])->group(function () {
    require __DIR__ . '/web/categories.php';
    require __DIR__ . '/web/brands.php';
    require __DIR__ . '/web/models.php';
    require __DIR__ . '/web/logs.php';
    require __DIR__ . '/web/products.php';
    require __DIR__ . '/web/items.php';
    require __DIR__ . '/web/locations.php';
    require __DIR__ . '/web/user_profile.php';
});

Route::resource('stock-out-reports', StockOutReportController::class)->middleware(['auth', 'verified']);



Route::get('/roles/edit-user-role', [RoleController::class, 'edit_user_role'])->middleware(['auth', 'verified', 'role:super_admin'])->name('roles.edit_user_role');
Route::put('/roles/update-user-role/', [RoleController::class, 'update_user_role'])->middleware(['auth', 'verified', 'role:super_admin'])->name('roles.update_user_role');
Route::resource('roles', RoleController::class)->middleware(['auth', 'verified', 'role:super_admin']);

require __DIR__ . '/auth.php';
