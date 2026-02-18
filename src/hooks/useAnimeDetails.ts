
//הוא אחראי על:
//שליחת הבקשה לשרת
//ניהול מצב טעינה (loading)
//טיפול בשגיאות
//שמירת נתונים בזיכרון (cache)
import { useQuery } from '@tanstack/react-query';
//הפונקציה useAnimeDetails מקבלת מזהה של אנימה (id) ומחזירה את הפרטים שלה.
export const useAnimeDetails = (id:string) => {
    //React Query שומר כל בקשה לפי המפתח הזה.
   //אם ה־id משתנה → תתבצע בקשה חדשה.
    return useQuery({
        queryKey: ["anime",id],
        //הפונקציה שמבצעת את הבקשה ל־API.
        queryFn: async () => {
            //שולחים בקשה לכתובת של ה־ API עם ה־id של האנימה כדי לקבל את הפרטים שלה.
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            //אם הבקשה מצליחה, אנחנו מפענחים את התגובה ל־JSON ומחזירים את הנתונים של האנימה.
            const result = await response.json();
        //כאן מחזירים רק את האובייקט של האנימה עצמה.
            return result.data;
        },
        //הפונקציה לא תנסה לפנות ל-API אם אין לנו ID תקין ביד
        enabled: !!id, 
    });
};