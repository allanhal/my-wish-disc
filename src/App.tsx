/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

import instagram from './assets/instagram.webp';

const KEY = "fDPuzDCZvRVudVyXTyMJ";
const SECRET = "ncLniYJXSgMCoydevODixTIDrgULdzLM";
const KEY_STRING = `?&key=${KEY}&secret=${SECRET}`;

const IDS = [
  5604009, // sobrevivendo no inferno
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

function App() {
  const [data, setData] = useState<
    {
      id: string;
      artists_sort: string;
      thumb: string;
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

  // if (!data || data.length === 0) {
  //   return <p className="animate-ping">Loading...</p>;
  // }

  return (
    <div className="">
      {/* <div>{ids}</div> */}
      <div className="pb-5 flex flex-col gap-10 justify-center items-center">
        <span className="text-5xl">Estou em busca dessas mídias.</span>
        <div className="flex flex-col justify-center items-center">
          <span className="text-xl">Contato instagram:</span>
          <a href="https://www.instagram.com/allanhal/" target="_blank">
            <img
              src={instagram}
              alt="instagram link"
              style={{ width: "100px" }}
            />
            <span className="text-xl">@allanhal</span>
          </a>
        </div>
      </div>
      <div className="flex justify-center gap-10 flex-wrap">
        {data?.map((item) => (
          <a key={item.id} href={item.uri} target="_blank">
            <div className="max-w-sm rounded overflow-hidden shadow-lg py-5 w-[300px]">
              {/* <span>LP</span> */}
              <div className="pb-5">
                <span className="text-2xl">{item.formats[0].name}</span>
              </div>
              <div className="flex justify-center items-center">
                <img
                  className="h-[100px]"
                  src={item.thumb}
                  alt="Sunset in the mountains"
                />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {item.artists_sort}
                </div>
                <p className="text-gray-700 text-base mb-2">{item.title}</p>
                {/* <div className="text-xs">Menor preço: {item.lowest_price}</div> */}
              </div>
              <div className="px-6 pt-4 pb-2">
                {item.styles.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
