<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
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

    public function update(Request $request, Project $project, Section $section) {
        $section->update([
            'name' => $request->name
        ]);
    }
}
