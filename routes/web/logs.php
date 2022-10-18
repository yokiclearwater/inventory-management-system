<?php


use App\Http\Controllers\AuditLogController;
use Illuminate\Support\Facades\Route;

Route::name('logs.')->prefix('logs')->group(function () {
    Route::get('/', [AuditLogController::class, 'index'])->name('index');
    Route::get('/{audit}', [AuditLogController::class, 'show'])->name('show');
});
