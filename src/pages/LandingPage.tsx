import { Link } from "react-router";

const BACKDROP_POSTERS = [
  "https://i.pinimg.com/736x/4d/9a/b2/4d9ab2cd47254df6b035609f64ad3fef.jpg",
  "https://i.pinimg.com/736x/9e/ac/91/9eac91a2cf192c265b7f8aad8238c9d5.jpg",
  "https://i.pinimg.com/1200x/39/35/63/39356332bf7be4c5e43a49f7a404a887.jpg",
  "https://i.pinimg.com/736x/49/0a/ca/490aca920d9cebe11c6e23a921f3cdcc.jpg",
  "https://i.pinimg.com/1200x/b0/a4/02/b0a402d3cae767744ec4ec906e04301d.jpg",
  "https://i.pinimg.com/736x/c1/2b/74/c12b74c3184d905bf01e61cb28be0eee.jpg",
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            <div className="absolute inset-0 z-0 opacity-15 md:opacity-20 pointer-events-none overflow-hidden">
        <div className="flex gap-4 rotate-12 scale-110 md:scale-125 transition-transform duration-700">
          {[1, 2, 3, 4, 5].map((col) => (
            <div 
              key={col} 
              className={`flex flex-col gap-4 ${col > 3 ? 'hidden md:flex' : 'flex'} 
                         ${col % 2 === 0 ? 'animate-slide-up' : 'animate-slide-down'}`}
            >
              {[...BACKDROP_POSTERS, ...BACKDROP_POSTERS].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Anime Poster"
                  className="w-32 h-48 md:w-48 md:h-72 object-cover rounded-xl shadow-2xl border border-white/5"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
          KAGE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">WATCH</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-medium">
          Your own world to explore and follow the best anime series.
          Start your journey now and build your favorites list with just one tap.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/dashboard"
            className="group relative px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-2"
          >
            <span>Start exploring</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link
            to="/mylist"
            className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
          >
            Watch My List
          </Link>
        </div>
        <div className="mt-24 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
          <div>
            <div className="text-3xl font-black text-white">25K+</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">Anime Series</div>
          </div>
          <div className="border-x border-white/5">
            <div className="text-3xl font-black text-white">100%</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">Free Access</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">24/7</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
}