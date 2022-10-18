<?php


use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::name('products.')->prefix('products')->group(function () {
    Route::get('/show-pdf', [ProductController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export-pdf', [ProductController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/export/{method?}', [ProductController::class, 'export'])->name('export');
});
Route::resource('products', ProductController::class);
