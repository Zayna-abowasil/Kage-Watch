//קובץ הזה הוא כמו לוח פיקוד מרכזי
// . הוא לא מכיל עיצוב או לוגיקה של אנימה, אלא דואג שכל הכלים החשובים – ניווט (Router),
//  ניהול נתונים (React Query) וניהול מצב אישי (WatchList Context) – יהיו זמינים ומוכנים לשימוש בכל חלקי האתר


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router' 
import { router } from './router' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import { WatchListProvider } from './context/WatchListContext';


const queryClient = new QueryClient();//כאן אנחנו יוצרים מופע חדש של React Query.
//  האובייקט הזה הוא המנהל של כל הזיכרון המטמון (Cache) של הבקשות מה-API.
//  הוא זה שזוכר אילו נתונים כבר הורדנו כדי שלא נצטרך להוריד אותם שוב

createRoot(document.getElementById('root')!).render(//כאן אנחנו אומרים ל-React:
//  "קחי את האלמנט ב-HTML שיש לו ID בשם root, ותזריקי לתוכו את כל האפליקציה שלנו
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WatchListProvider>
        <RouterProvider router={router} />
      </WatchListProvider>
    </QueryClientProvider>
  </StrictMode>
);