<?php

namespace App\Enums;
enum Permission: string
{
    case CREATE = 'create';
    case VIEW = 'view';
    case DELETE = 'delete';
    case UPDATE = 'update';
}
