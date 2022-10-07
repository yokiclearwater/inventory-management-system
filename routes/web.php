<?php

use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductModelController;
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

Route::get('/main', function () {
    return Inertia::render('Test', [
        'users' => App\Models\User::all(),
        'roles' => App\Models\Role::all(),
    ]);
})->name('main');

Route::get('/dashboard', function () {
    $id = Auth::user()->id;
    $user = User::find($id);
//    $user = Auth::user();
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

Route::name('models.')->middleware(['auth', 'verified', 'role:user,admin,super_admin'])->prefix('models')->group(function () {
    Route::get('/export-pdf', [ProductModelController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/show-pdf', [ProductModelController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export/{method?}', [ProductModelController::class, 'export'])->name('export');
});
Route::resource('models', ProductModelController::class)->middleware(['auth', 'verified', 'role:user,admin,super_admin']);

Route::name('logs.')->middleware(['auth', 'verified', 'role:user,admin,super_admin'])->prefix('logs')->group(function () {
    Route::get('/', [AuditLogController::class, 'index'])->name('index');
    Route::get('/{audit}', [AuditLogController::class, 'show'])->name('show');
});


Route::name('products.')->middleware(['auth', 'verified', 'role:user,admin,super_admin'])->prefix('products')->group(function () {
    Route::get('/show-pdf', [ProductController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export-pdf', [ProductController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/export/{method?}', [ProductController::class, 'export'])->name('export');
});
Route::resource('products', ProductController::class)->middleware(['auth', 'verified', 'role:admin,super_admin']);

//Route::name('items.')->middleware(['auth', 'verified', 'role:user,admin,super_admin'])->prefix('items')->group(function () {
//    Route::get('/show-pdf', [ItemController::class, 'show_pdf'])->name('show-pdf');
//    Route::get('/export-pdf', [ItemController::class, 'export_pdf'])->name('export-pdf');
//    Route::get('/export/{method?}', [ItemController::class, 'export'])->name('export');
//});
Route::resource('items', ItemController::class)->middleware(['auth', 'verified', 'role:admin,super_admin']);

require __DIR__ . '/auth.php';
