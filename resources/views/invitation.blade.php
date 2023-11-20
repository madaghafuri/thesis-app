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
        <body class="p-4 text-textcolor">
            <p>Hello, </p>
            <p>You have been invited to join our Workspace</p>
            <p>Click <a href="{{ $acceptUrl }}">here</a> To accept the invitation.</p>
            <p>Thank You</p>
        </body>
    </head>
</html>