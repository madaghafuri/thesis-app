import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import DialogProvider from './Components/Dialog';
import { Toaster } from './Components/Toast/Toaster';
import TaskTrackerContextProvider from './TaskTrackerProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const queryClient = new QueryClient()

        root.render(
            <QueryClientProvider client={queryClient} >
                <DialogProvider>
                    <TaskTrackerContextProvider>
                        <App {...props} />
                        <Toaster />
                    </TaskTrackerContextProvider>
                </DialogProvider>    
            </QueryClientProvider>
            );
    },
    progress: {
        color: '#4B5563',
    },
});
