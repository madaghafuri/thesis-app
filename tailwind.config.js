import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                nav: '#252628',
                content: '#2E2E30',
                bordercolor: '#565557',
                textcolor: '#f5f4f3',
                textweak: '#a2a0a2',
                bgactive: '#424244',
                blue: '#4573d2',
                black: '#1e1f21',
            }
        },
    },

    plugins: [forms],
};