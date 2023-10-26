<?php

namespace App\Http\Middleware;

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
        error_log($request->route('workspace'));

        Inertia::share([
            'data' => [
                'workspace' => $request->route('workspace'),
                'project' => $request->route('project'),
                'projectList' => $request->route('workspace')->project()->get(),
            ]
        ]);

        return $next($request);
    }
}
