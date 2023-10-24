<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;

    public function project() {
        return $this->hasMany(Project::class);
    }

    public function user() {
        return $this->belongsToMany(User::class, 'workspace_users');
    }

    protected $fillable = [
        'title'
    ];
}
