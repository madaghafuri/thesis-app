<?php

namespace App\Http\Middleware;

use App\Models\Priority;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HandleProjectViewRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        Inertia::share([
            'data' => [
                'workspace' => $request->route('workspace'),
                'project' => $request->route('project'),
                'projectList' => fn () => $request->user()
                    ? $request->route('workspace')->project()->get()
                    : null,
                'members' => $request->route('workspace')->user()->get(),
                'priorities' => Priority::all(),
            ]
        ]);

        return $next($request);
    }
}
