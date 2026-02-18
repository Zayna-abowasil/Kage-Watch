import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
//ייבוא של הטיפוס הבסיסי של אנימה.
import type { AnimeRawData } from "../types/anime.types";
export type WatchListAnime = AnimeRawData & { personalNote: string[] };
//ה-Context יכיל:
//watchList – מערך האנימות
//addToWatchList – פונקציה להוספה
//removeFromWatchList – פונקציה להסרה
//updateNotes – פונקציה לעדכון הערות
interface WatchListContextType {
    watchList: WatchListAnime[];
    addToWatchList: (anime: AnimeRawData) => void;
    removeFromWatchList: (id: number) => void;
    updateNotes: (id: number, notes: string[]) => void;
}
//
const WatchListContext = createContext<WatchListContextType | undefined>(undefined);
//כל קומפוננטה שבתוכו תוכל להשתמש ב-WatchList.
export function WatchListProvider({ children }: { children: ReactNode }) {
    const [watchlist, setWatchList] = useState<WatchListAnime[]>(() => {
        const saved = localStorage.getItem("watchlist");
        return saved ? JSON.parse(saved) : [];
    });
//שומר את ה-watchlist ב-localStorage בכל פעם שהוא משתנה,
// כדי שהנתונים יישמרו גם אחרי רענון הדף או סגירת הדפדפן.
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));//משתמשים ב-JSON.stringify כדי להפוך אותו למחרוזת.
    }, [watchlist]);
//מוסיפה אנימה לרשימה. היא כוללת בדיקה חשובה: אם האנימה כבר קיימת ברשימה,
//  היא לא תוסיף אותה שוב (מניעת כפילויות).
    const addToWatchList = (anime: AnimeRawData) => {
        setWatchList((prev) => {
            if (prev.find(a => a.mal_id === anime.mal_id)) return prev; 
            return [...prev, { ...anime, personalNote: [] }];
        });
    };
//מוחקת אנימה מהרשימה לפי ה-ID שלה.
    const removeFromWatchList = (id: number) => {
        setWatchList((prev) => prev.filter(anime => anime.mal_id !== id));
    };
    //מאפשרת לעדכן את ההערות האישיות שכתבת על אנימה מסוימת בלי לשנות את שאר הנתונים שלה.
    const updateNotes = (id: number, newNotes: string[]) => {
        setWatchList((prev) => 
            prev.map(anime => 
                anime.mal_id === id ? { ...anime, personalNote: newNotes } : anime
            )
        );
    };
//כאן אנחנו נותנים לכל האפליקציה גישה ל:
//watchList
//addToWatchList
//removeFromWatchList
//updateNotes
    return (
        <WatchListContext.Provider value={{ watchList: watchlist, addToWatchList, removeFromWatchList, updateNotes }}>
            {children}
        </WatchListContext.Provider>
    );
}
//אם משתמשים בו מחוץ ל-Provider → ייזרק Error ברור.
export const useWatchList = () => {
    const context = useContext(WatchListContext);
    if (context === undefined) throw new Error("useWatchList must be used within a WatchListProvider");
    return context;
};