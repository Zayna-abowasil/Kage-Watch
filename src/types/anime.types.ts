//ככה נראה אובייקט אנימה אחד שמגיע מה-API.


export interface AnimeRawData {//אנחנו יוצרים ומייצאים תבנית בשם AnimeRawData.
    mal_id: number;
    title: string;
    personalNote?: string[];
    score: number;
    synopsis: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
}
//זה מייצג את התשובה המלאה מה-API.
//
export interface AnimeResponse {
    //הרשימה של האנימות.
    data: AnimeRawData[];
    pagination?: {
        last_visible_page: number;//מספר העמוד האחרון שקיים ב-API
        has_next_page: boolean;//אם יש עמוד נוסף אחרי זה
} ;
}