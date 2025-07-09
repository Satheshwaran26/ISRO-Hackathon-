import { createBrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import TrackDetail from '@/pages/TrackDetail';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/track/:trackId',
    element: <TrackDetail />,
  },
  {
    path: '/dashboard',
    element: <Index showDashboard={true} />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]); 