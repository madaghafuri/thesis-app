<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function store(Request $request, Project $project, Section $section) {
        $task = $project->sections()->get()->where('id', '=', $section->id)->first()->tasks()->create([
            'user_id' => $request->user()->id,
            'project_id' => $project->id
        ]);

        $task->save();
    }

    public function update(Request $request, Task $task) {
        $task->update([
            'name' => $request->name,
            'due_date' => $request->due_date,
            'start_date' => $request->start_date,
            'description' => $request->description
        ]);
    }

    public function destroy(Task $task) {
        $task->delete();
    }
}
