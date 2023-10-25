<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}