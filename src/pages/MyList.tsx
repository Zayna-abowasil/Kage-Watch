import { useState } from "react";
import { useWatchList } from "../context/WatchListContext";
import AnimeCard from "../components/AnimeCard";
import { Link } from "react-router";
import Button from "../components/ui/Button"; 

export default function MyList() {
  const { watchList: watchlist, removeFromWatchList, updateNotes } = useWatchList();
  const [tempNote, setTempNote] = useState<{ [key: number]: string }>({});
  const [animeToDelete, setAnimeToDelete] = useState<any>(null);
 
  const handleAddNote = (animeId: number) => {
    const noteText = tempNote[animeId];
    if (!noteText?.trim()) return;
    
    const currentAnime = watchlist.find(a => a.mal_id === animeId);
    const existingNotes = currentAnime?.personalNote || [];
    
    updateNotes(animeId, [...existingNotes, noteText]);
    setTempNote({ ...tempNote, [animeId]: "" });
  };

  const handleDeleteNote = (animeId: number, noteIndex: number) => {
    const currentAnime = watchlist.find(a => a.mal_id === animeId);
    const updatedNotes = currentAnime?.personalNote.filter((_, i) => i !== noteIndex) || [];
    updateNotes(animeId, updatedNotes);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            My List
          </h1>
          
          <Link to="/dashboard">
            <Button>+ Add Anime</Button>
          </Link>
        </header>
       
        {watchlist.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-400 text-xl font-light">Your watchlist is empty. Start adding anime to your list!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {watchlist.map((anime) => (
              <div key={anime.mal_id} className="bg-gray-900/50 p-6 rounded-3xl border border-white/10 flex flex-col shadow-2xl">
                <AnimeCard anime={anime} />

                <div className="mt-6 flex-grow">
                  <h3 className="text-sm font-bold text-blue-400 mb-3 uppercase tracking-widest">Personal Notes</h3>
                  
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text"
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500 transition-all"
                      placeholder="Write a note..."
                      value={tempNote[anime.mal_id] || ""}
                      onChange={(e) => setTempNote({ ...tempNote, [anime.mal_id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNote(anime.mal_id)}
                    />
                    <Button 
                      onClick={() => handleAddNote(anime.mal_id)} 
                      className="text-xs px-4"
                    >
                      Save
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {Array.isArray(anime.personalNote) && anime.personalNote.length > 0 ? (
                      anime.personalNote.map((note, index) => (
                        <div key={index} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all">
                          <p className="text-sm text-gray-300 break-all leading-relaxed">{note}</p>
                          <button 
                            onClick={() => handleDeleteNote(anime.mal_id, index)}
                            className="text-red-500 opacity-0 group-hover:opacity-100 transition-all ml-2 hover:scale-110"
                            title="Delete Note"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-600 italic">No notes added yet.</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setAnimeToDelete(anime)} 
                  className="mt-6 pt-4 border-t border-white/5 text-red-500/40 hover:text-red-500 text-xs transition-colors text-center w-full"
                >
                  Delete Anime from List
                </button>
              </div>
            ))}
          </div>
        )}
        {animeToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setAnimeToDelete(null)} 
            ></div>

            <div className="relative bg-gray-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full shadow-2xl text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold mb-2 text-white">Are you sure?</h2>
              <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                You are about to remove <span className="text-blue-400 font-bold">{animeToDelete.title}</span> from your list.
              </p>

              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setAnimeToDelete(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger"
                  onClick={() => {
                    removeFromWatchList(animeToDelete.mal_id);
                    setAnimeToDelete(null);
                  }}
                  className="flex-1"
                >
                  Yes, Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}