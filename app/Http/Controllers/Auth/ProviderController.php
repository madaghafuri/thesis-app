<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class ProviderController extends Controller
{
    //
    public function redirect() {
        return Socialite::driver('google')->redirect();
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
        $googleUser = Socialite::driver('google')->user();

        // ddd($googleUser);
        $user = User::updateOrCreate([
            'provider_id' => $googleUser->id,
        ], [
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'provider_token' => $googleUser->token,
            'color' => $this->availableColors[array_rand($this->availableColors)],
            'avatar' => $googleUser->avatar,
        ]);

        $user->workspace()->create([
            'title' => $user->name."'s Workspace"
        ]);

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
