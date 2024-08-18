import './App.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

const KEY = "fDPuzDCZvRVudVyXTyMJ";
const SECRET = "ncLniYJXSgMCoydevODixTIDrgULdzLM";
const KEY_STRING = `?&key=${KEY}&secret=${SECRET}`;

const IDS = [5604009, 3535360];

function App() {
  const [data, setData] = useState<
    {
      id: string;
      artists_sort: string;
      thumb: string;
      title: string;
      styles: string[];
      uri: string;
      lowest_price: string;
    }[]
  >();

  useEffect(() => {
    const execReq = async () => {
      const res = await Promise.all(
        IDS.map((id) =>
          axios(`https://api.discogs.com/releases/${id}` + KEY_STRING)
        )
      );

      setData(res.map((res) => res.data));
    };
    execReq();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data[0]);
  //   }
  // }, [data]);

  if (!data || data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <div className="pb-5">
        <span className="text-5xl">Lista de desejos</span>
      </div>
      <div className="flex justify-center items-center gap-10 flex-wrap">
        {data?.map((item) => (
          <a key={item.id} href={item.uri} target="_blank">
            <div className="max-w-sm rounded overflow-hidden shadow-lg py-5">
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
                <div className="text-xs">Menor preço: {item.lowest_price}</div>
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
