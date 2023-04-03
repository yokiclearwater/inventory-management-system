<?php

namespace App\Policies;

use App\Models\StockOutReport;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StockOutReportPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, StockOutReport $stockOutReport)
    {
        return $user;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, StockOutReport $stockOutReport)
    {
        return $user->id === $stockOutReport->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, StockOutReport $stockOutReport)
    {
        return $user->id === $stockOutReport->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, StockOutReport $stockOutReport)
    {
        return $user->id === $stockOutReport->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\StockOutReport  $stockOutReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, StockOutReport $stockOutReport)
    {
        return $user->id === $stockOutReport->user_id;
    }
}
