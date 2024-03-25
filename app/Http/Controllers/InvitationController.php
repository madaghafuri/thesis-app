<?php

namespace App\Http\Controllers;

use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InvitationController extends Controller
{
    //
    public function sendInvitation(Request $request) {
        $token = Str::random(32);
        $emails = json_decode($request->emails);
        
        foreach ($emails as $email) {
            $invitation = Invitation::create([
                'email' => $email,
                'token' => $token,
                'workspace_id' => $request->input('workspace_id'),
            ]);
    
            Mail::to($invitation->email)->send(new InvitationMail(url("invitation/{$invitation->token}")));
        }
    }

    public function acceptInvitation($token) {
        $invitation = Invitation::where('token', $token)->first();

        if (!$invitation) {
            return redirect('/invalid-invitation');
        }

        if (!Auth::check()) {
            return Inertia::render('Auth/Register', [
                'invitation_token' => $invitation->token,
                'invited_workspace_id' => $invitation->workspace_id
            ]);
        }

        if (Auth::check()) {
            $user = User::all()->where('id', Auth::user()->id)->first();
            $user->workspace()->attach($invitation->workspace_id);
        }

        return redirect()->route('workspaces.home', [ 'workspace' => $invitation->workspace_id ]);
    }

    public function registerThroughInvitation() {
        return Inertia::render('Auth/Register');
    }
}
