<?php

namespace App\Services;

class ApiFilter {
    protected $safeParams = [
        'name' => ['eq', 'like'],
        'dueDate' => ['eq', 'gt', 'lt'],
        'startDate' => ['eq', 'gt', 'lt'],
    ];
}