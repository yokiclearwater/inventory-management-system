<?php

use Illuminate\Support\Facades\Route;

Route::get('/edit-profile', [EditProfileController::class, 'index'])->name('edit-profile.index');

Route::put('/edit-profile/{user}', [EditProfileController::class, 'update'])->name('edit-profile.update');

Route::put('/edit-profile/change-password/{user}', [EditProfileController::class, 'update_password'])->name('edit-profile.update_password');
