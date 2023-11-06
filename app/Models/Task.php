<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function section() {
        return $this->belongsTo(Section::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function priority() {
        return $this->belongsTo(Priority::class);
    }

    protected $fillable = [
        'user_id',
        'project_id',
        'name',
        'due_date',
        'start_date',
        'description',
    ];
}
