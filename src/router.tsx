//הקוד הזה הוא "מפת הדרכים" של האתר .
//  הוא מגדיר ל-React Router איזה דף להציג למשתמש בהתאם לכתובת (URL) שמופיעה בדפדפן

import { createBrowserRouter } from 'react-router';
import App from './App.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Details from './pages/Details.tsx';
import MyList from './pages/MyList.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/anime/:id",
    element: <Details />,
  },
  {
    path: "/mylist",
    element: <MyList />,
  },
    ],
  },
]);

export { router };

