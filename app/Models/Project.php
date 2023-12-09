<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function workspace() {
        return $this->belongsTo(Workspace::class);
    }

    public function sections() {
        return $this->hasMany(Section::class);
    }

    public function tasks() {
        return $this->hasMany(Task::class);
    }

    public function logs() {
        return $this->hasMany(TaskLog::class);
    }

    protected $fillable = [
        'name'
    ];
}
