<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use App\Models\TaskLog;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Laravel\Prompts\error;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Workspace $workspace)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Workspace $workspace)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Workspace $workspace)
    {
        $project = $workspace->project()->create([
            'name' => $request->name
        ]);
        
        $data = [
            ['name' => 'To Do'],
            ['name' => 'Doing'],
            ['name' => 'Done']
        ];
        $project->sections()->createMany($data);

        $project->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Project $project)
    {
        return redirect()->to(route('project.board', [ 'workspace' => $workspace, 'project' => $project ]));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workspace $workspace, Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workspace $workspace, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace, Project $project)
    {
        //
    }

    public function list(Workspace $workspace, Project $project) {
        $sections = $project->sections()->get();

        foreach($sections as $section) {
            $taskList = $project->tasks()->where('section_id', $section->id)->get()->sortBy('updated_at')->values()->all();
            foreach($taskList as $task) {
                $user = $task->user()->first();
                $priority = $task->priority()->first();
                $times = $task->timeTrackers()->get();
                $files = $task->files()->get();
                $task->user = $user;
                $task->priority = $priority;
                $task->times = $times;
                $task->files = $files;
            }
            $section->tasks = $taskList;
        }

        return Inertia::render('Workspace/Project/List', [
            'sections' => $sections,
        ]);
    }

    public function board(Workspace $workspace, Project $project) {
        $sections = $project->sections()->get();

        foreach($sections as $section) {
            $taskList = $project->tasks()->where('section_id', $section->id)->get()->sortBy('updated_at')->values()->all();
            foreach($taskList as $task) {
                $user = $task->user()->first();
                $priority = $task->priority()->first();
                $times = $task->timeTrackers()->get();
                $files = $task->files()->get();
                $task->user = $user;
                $task->priority = $priority;
                $task->times = $times;
                $task->files = $files;
            }
            $section->tasks = $taskList;
        }

        return Inertia::render('Workspace/Project/Board', [
            'sections' => $sections,
        ]);
    }

    public function calendar(Workspace $workspace, Project $project) {
        $users = $workspace->user()->get();
        $tasks = $project->tasks()->get();

        foreach ($tasks as $task) {
            $assignee = $task->user()->first();
            $priority = $task->priority()->first();
            $times = $task->timeTrackers()->get();
            $files = $task->files()->get();
            $task->user  = $assignee;
            $task->priority = $priority;
            $task->times = $times;
            $task->files = $files;
        }

        return Inertia::render('Workspace/Project/Calendar', [
            'users' => $users,
            'tasks' => $tasks
        ]);
    }

    public function dashboard(Workspace $workspace, Project $project) {
        $sections = $project->sections()->get();
        $taskList = $project->tasks()->get();
        $taskLogs = $project->logs()->get();

        foreach($sections as $section) {
            $tasks = $section->tasks()->get();
            $taskCount = $tasks->count();
            $section->taskCount = $taskCount;
        }

        foreach($taskLogs as $log) {
            $log->user = $log->user()->first();
            $log->task = $log->task()->first();
        }

        return Inertia::render('Workspace/Project/Dashboard', [
            'sections' => $sections,
            'tasks' => $taskList,
            'logs' => $taskLogs
        ]);
    }

    public function workload(Workspace $workspace, Project $project) {
        $users = $workspace->user()->get();
        $tasks = $project->tasks()->get();
        foreach($users as $user) {
            $tasks = $user->tasks()->get();
            foreach($tasks as $task) {
                $priority = $task->priority()->first();
                $times = $task->timeTrackers()->get();
                $task->priority = $priority;
                $task->times = $times;
            }
            $user->tasks = $tasks;
        }

        return Inertia::render('Workspace/Project/Workload', [
            'users' => $users
        ]);
    }
}
