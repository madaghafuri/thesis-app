<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\WorkspaceController;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
    return Inertia::render('Home', [
        'workspace' => $workspace
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

require __DIR__.'/auth.php';