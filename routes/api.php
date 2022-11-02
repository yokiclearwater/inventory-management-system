<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductModelController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $id = $request->user()->id;
    $user = User::with('role')->find($id);

    return $user;
});

Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

Route::apiResource('categories', CategoryController::class)->middleware(['auth:sanctum']);
Route::apiResource('brands', BrandController::class)->middleware(['auth:sanctum']);
Route::apiResource('models', ProductModelController::class)->middleware(['auth:sanctum']);
Route::apiResource('products', ProductController::class)->middleware(['auth:sanctum']);
Route::apiResource('items', ItemController::class)->middleware(['auth:sanctum']);

