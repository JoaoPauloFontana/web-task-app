import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Welcome } from '../pages/Welcome';

const router = createBrowserRouter([
    {
        path: '/login',
        element: (<Welcome />),
        index: true,
    },
    {
        path: '/',
        element: (<Home />),
    },
]);

export function Router() {
    return (
        <RouterProvider router={router} />
    );
}