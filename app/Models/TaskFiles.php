<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskFiles extends Model
{
    use HasFactory;

    protected $fillable = [
        'filePath',
        'fileName'
    ];

    public function task() {
        return $this->belongsTo(Task::class);
    }
}
