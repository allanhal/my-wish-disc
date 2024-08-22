/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const KEY = "fDPuzDCZvRVudVyXTyMJ";
const SECRET = "ncLniYJXSgMCoydevODixTIDrgULdzLM";
const KEY_STRING = `?&key=${KEY}&secret=${SECRET}`;

const IDS = [
  5604009, 3535360,
  //  12642678,
  13953461,
  //  1007820,
  2848009, 6528159,
  // 247822,
];
const IDS_REMOTE = [247822];

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ids, setIds] = useState(searchParams.get('ids') || IDS.join(','));

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
    const execReqLocal = async () => {
      const res = await Promise.all(
        (ids || '').split(',').map((id) => import(`../data/${id}.json`))
      );

      setData(res);
    };

    const execReqRemote = async () => {
      const res = await Promise.all(
        (ids || '').split(',').map((id) =>
          axios(`https://api.discogs.com/releases/${id}` + KEY_STRING)
        )
      );

      setData(res.map((res) => res.data));
    };

    // if (IDS && IDS.length > 0) {
    //   execReqLocal();
    // }

    if (IDS_REMOTE && IDS_REMOTE.length > 0) {
      execReqRemote();
    }
  }, [ids]);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data[0]);
  //   }
  // }, [data]);

  useEffect(() => {
    if (searchParams) {
      console.log(searchParams);
    }
  }, [searchParams]);

  if (!data || data.length === 0) {
    return <p className="animate-ping">Loading...</p>;
  }

  return (
    <div className="">
      <div>{ids}</div>
      <div className="pb-5">
        <span className="text-5xl">Lista de desejos</span>
      </div>
      <div className="flex justify-center gap-10 flex-wrap">
        {data?.map((item) => (
          <a key={item.id} href={item.uri} target="_blank">
            <div className="max-w-sm rounded overflow-hidden shadow-lg py-5 w-[300px]">
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
