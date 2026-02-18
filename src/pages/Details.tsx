import { useParams, Link } from "react-router";
import { useAnimeDetails } from "../hooks/useAnimeDetails";
import { useWatchList } from "../context/WatchListContext";
import Button from "../components/ui/Button"; 

export default function Details() {
  const { id } = useParams(); 
  const { data: anime, isLoading } = useAnimeDetails(id || ""); 
  const { watchList, addToWatchList } = useWatchList();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-blue-400 animate-pulse">Details about the anime are being gathered...</p>
      </div>
    );
  }

  const isAdded = watchList.some(item => item.mal_id === anime?.mal_id);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-3xl scale-110"
        style={{ backgroundImage: `url(${anime?.images.jpg.image_url})` }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-12">
        <Link 
          to="/dashboard" 
          className="group inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Dashboard
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[400px] shrink-0 group">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
              <img 
                src={anime?.images.jpg.image_url}
                alt={anime?.title || "Anime"}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-md border border-blue-500/30">
                {anime?.type}
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm font-bold rounded-md border border-yellow-500/30">
                ⭐ {anime?.score}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {anime?.title}
            </h1>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-500"></span>
                Synopsis
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg italic">
                {anime?.synopsis}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button 
                onClick={() => !isAdded && addToWatchList(anime)}
                variant={isAdded ? "outline" : "primary"}
                className={`px-10 py-4 text-lg flex items-center gap-2 ${isAdded ? 'cursor-default border-emerald-500/50 text-emerald-400' : ''}`}
              >
                {isAdded ? (
                  <>
                    <span>In Your WatchList</span>
                    <span className="text-xl">✓</span>
                  </>
                ) : (
                  <>
                    <span>Add to My WatchList</span>
                    <span className="text-xl">+</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}