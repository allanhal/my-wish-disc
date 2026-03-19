/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import instagram from './assets/instagram.webp';

const KEY = "fDPuzDCZvRVudVyXTyMJ";
const SECRET = "ncLniYJXSgMCoydevODixTIDrgULdzLM";
const KEY_STRING = `?&key=${KEY}&secret=${SECRET}`;

const IDS = [
  // 5604009, // sobrevivendo no inferno
  13953461, // blueman
  // 2848009, // back to black
  6528159, // o glorioso retorno de quem nunca esteve aqui
  25683820, // damn
  3419793, // curtain calls
  981795, // bb king
  1529452, //Legião-Urbana-Música-P-Acampamentos
  14451287, // vinil - this is america
  // 4609520, // dvd - legiao dvd
  // 10501023, // cd - legiao show
  // 7296834, // cd - legiao mais do mesmo
  6302256, // Criolo-Emicida-Ao-Vivo
  12261925, // cd - meus momentos the fevers
];

function VinylDisc() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" className="drop-shadow-lg">
      {/* Outer edge */}
      <circle cx="50" cy="50" r="48" fill="#52525b" />
      {/* Disc body */}
      <circle cx="50" cy="50" r="46" fill="#3f3f46" stroke="#71717a" strokeWidth="0.8" />
      {/* Grooves */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#52525b" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#4a4a52" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#52525b" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#4a4a52" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="#52525b" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="22" fill="none" stroke="#4a4a52" strokeWidth="0.6" />
      {/* Light reflection */}
      <ellipse cx="38" cy="38" rx="18" ry="12" fill="url(#vinylShine)" transform="rotate(-30 38 38)" />
      {/* Label */}
      <circle cx="50" cy="50" r="16" fill="#b45309" />
      <circle cx="50" cy="50" r="15" fill="url(#labelGrad)" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="#92400e" strokeWidth="0.3" opacity="0.5" />
      {/* Center hole */}
      <circle cx="50" cy="50" r="3" fill="#27272a" />
      <defs>
        <radialGradient id="vinylShine" cx="50%" cy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="labelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CdDisc() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" className="drop-shadow-lg">
      {/* Outer disc */}
      <circle cx="50" cy="50" r="48" fill="#d4d4d8" />
      <circle cx="50" cy="50" r="46" fill="url(#cdBase)" stroke="#a1a1aa" strokeWidth="0.5" />
      {/* Rainbow iridescence rings */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#cdRainbow1)" strokeWidth="3" opacity="0.3" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#cdRainbow2)" strokeWidth="2.5" opacity="0.25" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="url(#cdRainbow3)" strokeWidth="2" opacity="0.3" />
      {/* Data track lines */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#c4c4c8" strokeWidth="0.3" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#c4c4c8" strokeWidth="0.3" />
      <circle cx="50" cy="50" r="29" fill="none" stroke="#c4c4c8" strokeWidth="0.3" />
      {/* Light reflection */}
      <ellipse cx="36" cy="36" rx="20" ry="10" fill="white" opacity="0.15" transform="rotate(-35 36 36)" />
      {/* Inner transparent ring */}
      <circle cx="50" cy="50" r="20" fill="#e4e4e7" stroke="#a1a1aa" strokeWidth="0.3" />
      <circle cx="50" cy="50" r="18" fill="none" stroke="#d4d4d8" strokeWidth="0.5" opacity="0.5" />
      {/* Center hole */}
      <circle cx="50" cy="50" r="8" fill="#18181b" />
      <circle cx="50" cy="50" r="7.5" fill="#27272a" stroke="#3f3f46" strokeWidth="0.3" />
      <defs>
        <radialGradient id="cdBase" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#f4f4f5" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </radialGradient>
        <linearGradient id="cdRainbow1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="cdRainbow2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="cdRainbow3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FormatIcon({ name }: { name: string }) {
  const isVinyl = name.toLowerCase() === 'vinyl';
  return (
    <div className="flex items-center gap-2">
      {isVinyl ? <VinylDisc /> : <CdDisc />}
      <span className={`text-base font-semibold tracking-wider uppercase ${isVinyl ? 'text-amber-400' : 'text-zinc-300'}`}>
        {name}
      </span>
    </div>
  );
}

function App() {
  const [data, setData] = useState<
    {
      id: string;
      artists_sort: string;
      thumb: string;
      images: {
        type: string;
        uri: string;
        uri150: string;
        resource_url: string;
        width: number;
        height: number;
      }[];
      title: string;
      type: string;
      styles: string[];
      formats: {
        descriptions: string[];
        name: string;
      }[];
      uri: string;
      lowest_price: string;
    }[]
  >();

  useEffect(() => {
    const execReqRemote = async () => {
      const res = await Promise.all(
        IDS.map((id) => {
          const a = axios(
            `https://api.discogs.com/releases/${id}` + KEY_STRING
          );

          return a;
        })
      );

      setData(res.map((res) => res.data));
    };

    execReqRemote();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Header */}
      <header className="pt-12 pb-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-5xl">&#127926;</span>
            <h1 className="text-5xl md:text-6xl tracking-wide bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Estou em busca dessas mídias.
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-zinc-800/60 backdrop-blur rounded-full px-6 py-3 border border-zinc-700/50 hover:border-amber-500/40 transition-colors">
            <a
              href="https://www.instagram.com/allanhal/"
              target="_blank"
              className="flex items-center gap-3 no-underline"
            >
              <img
                src={instagram}
                alt="instagram link"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-lg text-zinc-300 hover:text-amber-400 transition-colors">
                @allanhal
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Loading state */}
      {!data && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item) => (
            <a
              key={item.id}
              href={item.uri}
              target="_blank"
              className="group no-underline"
            >
              <div className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1">
                {/* Album art */}
                <div className="relative px-5 pt-5 pb-2">
                  <div className="w-full aspect-square overflow-hidden rounded-lg shadow-2xl">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={item.images?.[0]?.uri ?? item.thumb}
                      alt={item.title}
                    />
                  </div>
                  {/* Format icon overlay */}
                  <div className="absolute bottom-4 right-7 bg-zinc-900/70 backdrop-blur-sm rounded-xl p-2">
                    <FormatIcon name={item.formats[0].name} />
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 pb-3">
                  <h2 className="text-xl font-bold text-white mb-1 truncate">
                    {item.artists_sort}
                  </h2>
                  <p className="text-zinc-400 text-base mb-3 truncate">
                    {item.title}
                  </p>
                </div>

                {/* Tags */}
                <div className="px-5 pb-5 flex flex-wrap gap-2">
                  {item.styles.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-700/50 text-zinc-300 rounded-full px-3 py-1 text-xs border border-zinc-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
