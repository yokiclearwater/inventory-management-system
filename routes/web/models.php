<?php

use App\Http\Controllers\ProductModelController;
use Illuminate\Support\Facades\Route;

Route::name('models.')->prefix('models')->group(function () {
    Route::get('/export-pdf', [ProductModelController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/show-pdf', [ProductModelController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export/{method?}', [ProductModelController::class, 'export'])->name('export');
});
Route::resource('models', ProductModelController::class);
