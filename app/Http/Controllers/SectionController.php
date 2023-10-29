<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    //
    public function store(Request $request, Project $project) {
        $section = $project->sections()->create([
            'name' => $request->name
        ]);

        $section->save();
    }
}
