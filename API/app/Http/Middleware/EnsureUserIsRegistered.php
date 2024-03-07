<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class EnsureUserIsRegistered
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');

        $user = User::where('remember_token', $token)->first();

        if (!$user || ($user->role != 1 && $user->role != 2 && $user->role != 4)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}



