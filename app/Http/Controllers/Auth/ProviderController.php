<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Laravel\Socialite\Facades\Socialite;

class ProviderController extends Controller
{
    //
    public function redirect() {
        return Socialite::driver('google')->with(['state' => Request::query('workspace_id')])->redirect();
    }

    public $availableColors = [
        '#F06A6A',
        '#F1BD6C',
        '#4573D2',
        '#8D84E8',
        '#F9AAEF',
        '#5DA283',
    ];

    public function callback() {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // ddd($googleUser);

        $registered = DB::table('users')->where('email', '=', $googleUser->email)->first();

        $user;

        if ($registered) {
            $user = User::all()->where('email', '=', $registered->email)->first();
            $user->update([
                'provider_id' => $googleUser->id,
            ]);
        } else {
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'provider_token' => $googleUser->token,
                'avatar' => $googleUser->avatar,
                'color' => $this->availableColors[array_rand($this->availableColors)],
                'provider_id' => $googleUser->id,
            ]);

            $user->workspace()->create([
                'title' =>  "$user->name's Workspace" 
            ]);
        }

        if (Request::input('state') != null) {
            $user->workspace()->attach(Request::input('state'));
        }

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
