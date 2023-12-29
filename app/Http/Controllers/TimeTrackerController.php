<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TimeTrackerController extends Controller
{
    //
    public function startTracking(Request $request, Task $task) {
        $timeTracker = $task->timeTrackers()->create([
            'start_time' => now()
        ]);

        $timeTracker->save();
    }

    public function stopTracking(Request $request, Task $task) {
        $lastTimeTracker = $task->timeTrackers()->latest()->first();

        if ($lastTimeTracker) {
            $lastTimeTracker->update([
                'end_time' => now(),
                'duration' => $request->duration,
            ]);
        }
    }

    public function store(Request $request, Task $task) {
        $timeTracker = $task->timeTrackers()->create([
            'start_time' => now(),
            'duration' => $request->duration,
            'end_time' => now(),
        ]);

        $timeTracker->save();
    }
}
