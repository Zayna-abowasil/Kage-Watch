import { useQuery } from "@tanstack/react-query";


//הפונקציה useAnime מקבלת שלושה פרמטרים: מספר עמוד (page), קוד ז'אנר (genreId), ומילת חיפוש (searchterm).
//  היא פונה ל-API ומחזירה את רשימת האנימות המתאימה
export const useAnime = (page: number, genreId: string) => {
  return useQuery({
    //אם המשתמש עובר עמוד או מקליד מילת חיפוש חדשה, הקוד מזהה שהמפתח השתנה ומבצע אוטומטית שליפה מחודשת של הנתונים.
    queryKey: ["anime", page, genreId],
    //זו הפונקציה שמבצעת את הבקשה ל-API.
    queryFn: async () => {
      const baseUrl = `https://api.jikan.moe/v4/anime`;
            const params = new URLSearchParams({
        page: page.toString(),//מספר העמוד
        limit: "24", //12 אנימות בכל עמוד
      });
       
     
      //אם יש ז'אנר מסוים שנבחר, הוא מתווסף לפרמטרים של הבקשה כדי לסנן את התוצאות לפי הז'אנר הזה.
      if (genreId) params.append("genres", genreId);
      
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      //הקוד "זורק" שגיאה. React Query תדע לתפוס את השגיאה הזו ולאפשר לך להציג הודעה מתאימה למשתמש בקלות.
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      //
      const data = await response.json();
      //כאן מחזירים רק את רשימת האנימות
      return data.data;
    },
    //
    staleTime: 1000 * 60 * 5,
  });
};