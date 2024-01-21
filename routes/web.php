<?php

use App\Http\Controllers\Auth\ProviderController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskFileController;
use App\Http\Controllers\TimeTrackerController;
use App\Http\Controllers\WorkspaceController;
use App\Http\Middleware\HandleProjectViewRequest;
use App\Models\Priority;
use App\Models\Task;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/home', function () {
    $userId = Auth::user()->id;
    $user = User::all()->where('id', '=', $userId)->first();
    $workspaceList = $user->workspace()->get();

    return Inertia::render('Home', [
        'workspaceList' => $workspaceList
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('workspaces.projects', ProjectController::class)->middleware(['auth'])->only(['store', 'show']);
Route::resource('workspaces', WorkspaceController::class)->middleware(['auth'])->only(['store', 'show']);

Route::get('/workspaces/{workspace}/home', function (Workspace $workspace) {
    $tasks = Task::where('user_id', Auth::user()->id)->get();
    $members = $workspace->user()->get();
    $priorities = Priority::all();
    foreach ($tasks as $task) {
        $task->project = $task->project()->first();
        $task->user = $task->user()->first();
        $task->priority = $task->priority()->first();
        $task->files = $task->files()->get();
        $task->times = $task->timeTrackers()->get();
    }

    return Inertia::render('Home', [
        'workspace' => $workspace,
        'projects' => fn () => $workspace->project()->get()
            ? $workspace->project()->get()
            : null,
        'tasks' => fn () => $workspace->project()->get()
            ? $tasks
            : null,
        'members' => $members,
        'priorities' => $priorities
    ]);
})->name('workspaces.home')->middleware(['auth']);

Route::get('/workspaces/{workspace}/tasks', function (Workspace $workspace) {
    return Inertia::render('Workspace/MyTask', [
        'workspace' => $workspace,
        'projectList' => fn () => $workspace->project()->get()
            ? $workspace->project()->get()
            : null 
    ]);
})->name('workspaces.tasks');

Route::controller(ProjectController::class)->group(function () {
    Route::get('/workspaces/{workspace}/projects/{project}/list', 'list')->name('project.list')->middleware([HandleProjectViewRequest::class, 'auth']);
    Route::get('/workspaces/{workspace}/projects/{project}/board', 'board')->name('project.board')->middleware([HandleProjectViewRequest::class, 'auth']);
    Route::get('/workspaces/{workspace}/projects/{project}/calendar', 'calendar')->name('project.calendar')->middleware([HandleProjectViewRequest::class, 'auth']);
    Route::get('/workspaces/{workspace}/projects/{project}/dashboard', 'dashboard')->name('project.dashboard')->middleware([HandleProjectViewRequest::class, 'auth']);
    Route::get('/workspaces/{workspace}/projects/{project}/workload', 'workload')->name('project.workload')->middleware([HandleProjectViewRequest::class, 'auth']);
});

Route::controller(SectionController::class)->group(function () {
    Route::post('/projects/{project}/section', 'store')->name('section.store')->middleware(['auth']);
    Route::patch('/projects/{project}/section/{section}', 'update')->name('section.update')->middleware(['auth']);
    Route::delete('/sections/{section}', 'destroy')->name('section.destroy')->middleware(['auth']);
});

Route::controller(TaskController::class)->group(function () {
    Route::post('/projects/{project}/sections/{section}/task', 'store')->name('task.store')->middleware(['auth']);
    Route::patch('/tasks/{task}', 'update')->name('task.update')->middleware(['auth']);
    Route::delete('/tasks/{task}', 'destroy')->name('task.destroy')->middleware(['auth']);
});

Route::controller(TaskFileController::class)->group(function () {
    Route::post('/tasks/{task}/file', 'upload')->name('task.files')->middleware(['auth']);
    Route::delete('/files/{taskFile}', 'destroy')->name('file.destroy');
});

// Route::get('/download', DownloadFileController::class)->name('file.download')->middleware(['auth']);

Route::post('/time-tracker/{task}/start', [TimeTrackerController::class, 'startTracking'])->middleware(['auth'])->name('time.start');
Route::post('/time-tracker/{task}/stop', [TimeTrackerController::class, 'stopTracking'])->middleware(['auth'])->name('time.stop');
Route::post('/tasks/{task}/time', [TimeTrackerController::class, 'store'])->middleware(['auth'])->name('time.store');

Route::post('/invitation', [InvitationController::class, 'sendInvitation'])->name('email.invite');
Route::get('/invitation/{token}', [InvitationController::class, 'acceptInvitation'])->name('invite.accept');

//Google Auth Route
Route::get('/auth/redirect', [ProviderController::class, 'redirect'])->name('auth.redirect');

Route::get('/auth/callback', [ProviderController::class, 'callback'])->name('auth.callback');

require __DIR__.'/auth.php';
