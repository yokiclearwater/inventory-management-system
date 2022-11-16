<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

Route::name('locations.')->prefix('locations')->group(function () {
    Route::get('/export-pdf', [LocationController::class, 'export_pdf'])->name('export-pdf');
    Route::get('/show-pdf', [LocationController::class, 'show_pdf'])->name('show-pdf');
    Route::get('/export/{method?}', [LocationController::class, 'export'])->name('export');
});
Route::resource('locations', LocationController::class);
