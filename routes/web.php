<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemModelController;
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

Route::get('/main', function () {
    return Inertia::render('Test', [
        'users' => App\Models\User::all(),
        'roles' => App\Models\Role::all(),
    ]);
})->name('main');

Route::get('/dashboard', function () {
    $id = Auth::user()->id;
    $user = App\Models\User::find($id);
    $users_count = App\Models\User::count();
    $categories_count = \App\Models\Category::count();
    $role = $user->role()->first()->toArray();
    $brands_count = App\Models\Brand::count();
    $models_count = App\Models\ItemModel::count();

    return Inertia::render('Dashboard', [
        'user' => $user,
        'users_count' => $users_count,
        'role' => $role,
        'categories_count' => $categories_count,
        'models_count' => $models_count,
        'brands_count' => $brands_count,
        'ip' => Request::ip(),
    ]);
})->middleware(['auth', 'verified', 'role:user,admin,super_admin'])->name('dashboard');


Route::name('categories.')->middleware(['auth', 'verified', 'role:user,admin,super_admin'])->prefix('categories')->group(function () {
    Route::get('/export-pdf', [CategoryController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/show-pdf', [CategoryController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export/{method?}', [CategoryController::class, 'export'])->name('export');
});

Route::resource('categories', CategoryController::class)->middleware(['auth', 'verified', 'role:admin,super_admin']);

Route::name('brands.')->middleware(['auth', 'verified', 'role:user,admin,super_admin'])->prefix('brands')->group(function () {
    Route::get('/export-pdf', [BrandController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/show-pdf', [BrandController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export/{method?}', [BrandController::class, 'export'])->name('export');
});
Route::resource('brands', BrandController::class)->middleware(['auth', 'verified', 'role:admin,super_admin']);

Route::resource('models', ItemModelController::class)->middleware(['auth', 'verified', 'role:user,admin,super_admin']);

require __DIR__ . '/auth.php';
