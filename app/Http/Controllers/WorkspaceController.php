<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    //
    public function store(Request $request) {
        $userId = $request->user()->id;
        $user = User::all()->where('id', '=', $userId)->first();
        $user->workspace()->create([
            'title' => $request->name
        ]);
        $user->save();
    }

    public function show(Workspace $workspace) {
        return Inertia::render('Home', [
            'workspace' => $workspace,
            'projects' => $workspace->project()->get()
                ? $workspace->project()->get()
                : null
        ]);
    }
}
