//הקומפוננטה שנקראת AnimeCard היא בעצם "כרטיס תצוגה" מעוצב עבור סדרת אנימה בודדת.
// המטרה שלה היא לקחת נתונים גולמיים על האנימה (כמו שם, תמונה ודירוג) ולהציג אותם בצורה ויזואלית מרשימה בתוך רשימה.

//אנחנו מייבאים את הטיפוס שהגדרנו קודם.
import { type AnimeRawData } from '../types/anime.types';
//Link הוא קומפוננטה שמאפשרת ניווט בין עמודים בלי רענון דף.
import {Link} from "react-router";
//אנחנו מגדירים איזה props הקומפוננטה מקבלת.
interface Props {
    anime : AnimeRawData;
}

export default function AnimeCard ({anime} : Props ){
    return(
        <Link to={`/anime/${anime.mal_id}`} className="group block"> 
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-white/5 shadow-xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:border-blue-500/30 group-hover:-translate-y-2"> 
         <div className="relative h-72 overflow-hidden">
            <img 
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
             <span className="text-yellow-400 text-xs font-bold">⭐{anime.score}</span>
            </div>
            </div>

            <div className="p-4">
              <h2 className="text-md font-bold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-1 mb-3">{anime.title}</h2>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">View Details</span>
                <div className="text-gray-500 group-hover:text-blue-400 transition-transform group-hover:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                </div>
              </div>
            </div>
             <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-2xl pointer-events-none"></div>
                
        </div>
        </Link>
    )
}