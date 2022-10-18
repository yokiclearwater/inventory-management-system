<?php

use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::name('items.')->prefix('items')->group(function () {
    Route::get('/show-pdf', [ItemController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export-pdf', [ItemController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/export/{method?}', [ItemController::class, 'export'])->name('export');
});
Route::resource('items', ItemController::class);
