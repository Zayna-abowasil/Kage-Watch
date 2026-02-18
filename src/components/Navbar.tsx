import { useState } from "react";
import { Link } from "react-router";
import { useWatchList } from "../context/WatchListContext";

export default function Navbar() {
    //הקומפוננטה משתמשת ב-useWatchList כדי לקבל את רשימת האנימות שהמשתמש הוסיף.
    //באמצעות watchList.length היא מציגה מספר קטן (Badge) ליד “My List” שמראה כמה פריטים יש ברשימה.
    const { watchList } = useWatchList();
    //ש state בשם isOpen שמנהל אם התפריט במובייל פתוח או סגור.
   //כאשר לוחצים על כפתור ההמבורגר (☰), הערך משתנה והתפריט נפתח או נסגר עם אנימציה.
    const [isOpen, setIsOpen] = useState(false); //

    return (
        <nav className="bg-gray-800/80 backdrop-blur-md p-4 sticky top-0 z-[100] border-b border-white/5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-400">
                    Kage<span className="text-white">Watch</span>
                </Link>

                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/dashboard" className="text-gray-300 hover:text-blue-400 transition font-medium">Dashboard</Link>
                    <Link to="/mylist" className="relative text-gray-300 hover:text-blue-400 transition font-medium">
                        My List
                        {watchList.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-red-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg shadow-red-600/40">
                                {watchList.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col gap-4 bg-gray-900/50 p-4 rounded-xl border border-white/5">
                    <Link onClick={() => setIsOpen(false)} to="/dashboard" className="text-gray-300 hover:text-white py-2 border-b border-white/5">Dashboard</Link>
                    <Link onClick={() => setIsOpen(false)} to="/mylist" className="text-gray-300 hover:text-white py-2 flex justify-between items-center">
                        My List
                        <span className="bg-blue-600 px-2 py-0.5 rounded-full text-xs">{watchList.length}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}