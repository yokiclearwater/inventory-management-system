<?php

use App\Http\Controllers\BrandController;
use Illuminate\Support\Facades\Route;

Route::name('brands.')->prefix('brands')->group(function () {
    Route::get('/export-pdf', [BrandController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/show-pdf', [BrandController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export/{method?}', [BrandController::class, 'export'])->name('export');
});
Route::resource('brands', BrandController::class);
