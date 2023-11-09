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
        error_log($request);

        $validatedData = $request->validate([
            'name' => 'max:255|nullable',
            'due_date' => 'date|nullable',
            'description' => 'max:255|nullable',
        ]);

        $updatedData = $task->update([
            'name' => $validatedData["name"],
            'due_date' => $validatedData["due_date"],
            'description' => $validatedData["description"],
        ]);

        if ($request["section_id"] !== null) {
            $section = Section::where('id', $request["section_id"])->first();
            $task->section()->associate($section);
        }
        
        if ($request->has('user') && $request["user"] !== null) {
            $assignee = User::where('id', $request["user"]["id"])->first();
            $task->user()->associate($assignee);
        }
        
        if ($request->has('priority') && $request["priority"] !== null) {
            $priority = Priority::where('id', $request["priority"]["id"])->first();
            $task->priority()->associate($priority);
        }

        if ($updatedData) {
            $task->save();
        }
    }

    public function destroy(Task $task) {
        $task->delete();
    }
}
