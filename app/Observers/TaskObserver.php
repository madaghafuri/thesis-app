<?php

namespace App\Observers;

use App\Models\Task;
use App\Models\TaskLog;
use Illuminate\Support\Facades\Request;

class TaskObserver
{
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        //
        $changes = $task->getChanges();
        error_log(json_encode($changes));
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {
        //
        $taskLog = $task->logs()->create([
            'event' => 'updated',
            'user_id' => Request::user()->id,
            'project_id' => $task->project_id
        ]);

        $taskLog->save();
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void
    {
        //
    }
}
