<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Section;
use App\Models\Workspace;
use Illuminate\Http\Request;
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
        return Inertia::render('Workspace/Project/Show', [
            'data' => [
                'workspace' => $workspace,
                'projectList' => $workspace->project()->get(),
                'project' => $project
            ]
        ]);
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
            $taskList = $project->tasks()->where('section_id', $section->id)->get();
            foreach($taskList as $task) {
                $user = $task->user()->first();
                $priority = $task->priority()->first();
                $task->user = $user;
                $task->priority = $priority;
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
            $taskList = $project->tasks()->where('section_id', $section->id)->get();
            foreach($taskList as $task) {
                $user = $task->user()->first();
                $priority = $task->priority()->first();
                $task->user = $user;
                $task->priority = $priority;
            }
            $section->tasks = $taskList;
        }

        return Inertia::render('Workspace/Project/Board', [
            'sections' => $sections,
        ]);
    }

    public function calendar(Workspace $workspace, Project $project) {
        return Inertia::render('Workspace/Project/Calendar');
    }

    public function dashboard(Workspace $workspace, Project $project) {
        return Inertia::render('Workspace/Project/Dashboard');
    }
}
