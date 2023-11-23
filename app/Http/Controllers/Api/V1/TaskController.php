<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TaskCollection;
use App\Http\Resources\V1\TaskResource;
use App\Models\Task;
use App\Services\V1\TaskQuery;
use Illuminate\Http\Request;

class TaskController extends Controller {

    /**
     * api/v1/tasks
     */

    public function index(Request $request) {
        $filter = new TaskQuery();
        $queryItems = $filter->transform($request);
        $includeUser = $request->query('includeUser');

        $tasks = Task::where($queryItems);
        $tasks = $tasks->with('priority');

        if ($includeUser) {
            $tasks = $tasks->with('user');
        }

        return new TaskCollection($tasks->paginate()->appends($request->query()));
    }

    public function show(Task $task) {
        $includeUser = request()->query('includeUser');
        $task = $task->loadMissing('priority');

        if ($includeUser) {
            return new TaskResource($task->loadMissing('user'));
        }

        return new TaskResource(($task));
    }
}