import { useState, useMemo } from 'react'; 
import { useAnime } from '../hooks/useAnime';
import AnimeCard from '../components/AnimeCard';
import type { AnimeRawData } from '../types/anime.types';
import Input from '../components/ui/Input'; 
import Button from '../components/ui/Button'; 

const GENRES = [
  { id: "", name: "All Genres" },
  { id: "1", name: "Action" },
  { id: "2", name: "Adventure" },
  { id: "4", name: "Comedy" },
  { id: "8", name: "Drama" },
  { id: "10", name: "Fantasy" },
];

export default function Dashboard() {
  const [search, setSearch] = useState(""); 
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");

  const { data: animes, isLoading, isError, error } = useAnime(page, genre);

  const filteredAnimes = useMemo(() => {
    if (!animes) return [];
    if (!search.trim()) return animes;
    
    return animes.filter((anime: AnimeRawData) =>
      anime.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [animes, search]);

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);
    setPage(1); 
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className='max-w-7xl mx-auto'>
        
        <header className="mb-16 text-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
          <h1 className="relative text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Anime Explorer
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
            Discover the world of anime, find your favorite series and add them to your own list. 
          </p>
        </header>

        <div className="mb-12 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1 w-full">
            <Input 
              placeholder="Search for anime locally..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
           <div className="w-full md:w-48 overflow-hidden rounded-2xl">

          <select 
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value)}
             className="w-full p-4 bg-gray-800/50 border border-white/10 text-white outline-none"
          >
            {GENRES.map((g) => ( 
              <option key={g.id} value={g.id} className="bg-gray-800">
                {g.name}
              </option>
            ))}
          </select>
          </div>
        </div>
         
        {isLoading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-6 text-slate-400 font-medium animate-pulse">Loading anime data...</p>
          </div>
        )}

        {isError && (
          <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-center">
            <p className="text-red-200">Error: {error instanceof Error ? error.message : "Failed to fetch"}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAnimes.map((anime: AnimeRawData) => (
            <div key={anime.mal_id} className="transform hover:-translate-y-2 transition-transform duration-300">
              <AnimeCard anime={anime} /> 
            </div>
          ))}
        </div>

        {!isLoading && filteredAnimes.length > 0 && (
          <div className="mt-16 flex justify-center items-center gap-6 pb-10">
            <Button 
              variant="outline" 
              onClick={() => {
                setPage(p => p - 1);
                window.scrollTo(0, 0); 
              }} 
              disabled={page === 1}
            >
              ← Previous
            </Button>

            <span className="text-blue-400 font-bold text-lg">Page {page}</span>

            <Button 
              variant="outline" 
              onClick={() => {
                setPage(p => p + 1);
                window.scrollTo(0, 0);
              }}
            >
              Next →
            </Button>
          </div>
        )}

        {!isLoading && filteredAnimes.length === 0 && search && (
          <div className="text-center py-20 bg-gray-800/30 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-500 text-xl">No anime found matching "{search}" </p>
          </div>
        )}
      </div>
    </div>
  );
}