<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isNull;

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
        $task->update([
            'name' => $request->name,
            'due_date' => $request->due_date,
            'start_date' => $request->start_date,
            'description' => $request->description,
            'user_id' => $request->assignee_id
        ]);
    }

    public function destroy(Task $task) {
        $task->delete();
    }
}
