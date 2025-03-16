import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// Enable future flags to address warnings
const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: <App />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default function Router() {
  return <RouterProvider router={router} />;
} 