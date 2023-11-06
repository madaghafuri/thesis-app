<?php

namespace App\Http\Controllers;

use App\Models\Priority;
use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function store(Request $request, Project $project, Section $section) {
        $task = $project->sections()->get()->where('id', '=', $section->id)->first()->tasks()->create([
            'project_id' => $project->id
        ]);

        $task->save();
    }

    public function update(Request $request, Task $task) {

        $validatedData = $request->validate([
            'name' => 'max:255',
            'due_date' => 'date',
            'description' => 'max:255',
        ]);

        $task->update([
            'name' => $validatedData["name"],
            'due_date' => $validatedData["due_date"],
            'description' => $validatedData["description"],
        ]);

        $assignee = User::where('id', $request["user"]["id"])->first();
        $priority = Priority::where('id', $request["priority"]["id"])->first();

        error_log($request->due_date);

        $task->user()->associate($assignee);
        $task->priority()->associate($priority);

        $task->save();
    }

    public function destroy(Task $task) {
        $task->delete();
    }
}
