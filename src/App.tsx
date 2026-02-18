//הקוד הזה הוא ה-Layout הראשי של האפליקציה שלך.
//  הוא משמש כ"שלד" (Skeleton) שקובע אילו רכיבים יישארו קבועים בכל הדפים ואילו חלקים ישתנו כשנעבור בין דפים.

import Navbar from "./components/Navbar";//הוא יופיע תמיד בחלק העליון של כל דף באתר
import {Outlet} from "react-router";//כל דף שתנווט אליו (כמו ה-Dashboard או ה-MyList) "יוזרק" לתוך המקום שבו נמצא ה-Outlet.

export default function App() {
    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
            