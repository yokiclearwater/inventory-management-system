<?php


use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::name('categories.')->prefix('categories')->group(function () {
    Route::get('/export-pdf', [CategoryController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/show-pdf', [CategoryController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export/{method?}', [CategoryController::class, 'export'])->name('export');
});

Route::resource('categories', CategoryController::class);
