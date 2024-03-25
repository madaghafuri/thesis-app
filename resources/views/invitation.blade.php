<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->
    </head>
    <body class="p-4 text-textcolor">
        <h1>You have been invited!</h1>
        <p>You have been invited to join our Workspace</p>
        <p>Click the button below to accept the invitation.</p>
        <button style="background-color: orangered; width: 250px; border-radius: 5px; color: white; padding-top: 2px; padding-bottom: 2px;">
            <a style="text-decoration: none; font-size: large; color: white; font-weight: bold;" href="{{ $acceptUrl }}">here</a>
        </button>
        <p>Thank You</p>
    </body>
</html>