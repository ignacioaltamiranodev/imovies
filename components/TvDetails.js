import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useWatchlist } from '../context/watchlistContext';
import { episodeRuntime } from '../utils/utils';

const TvDetails = ({ tv, cast }) => {
  const {
    watchlist,
    addShowToWatchlist,
    removeShowFromWatchlist,
  } = useWatchlist();

  const inWatchlist = watchlist.find((item) => item.id === tv?.id);
  return (
    <section className="details-grid mx-4 sm:mx-0">
      {/* IMAGE */}
      <div className="flex justify-center items-center">
        <Image
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w780${tv?.poster_path}`}
          alt={tv?.name}
          width={500}
          height={700}
        />
      </div>
      {/* INFO */}
      <div className="flex flex-col justify-center sm:mt-0 mt-4">
        <div className="flex flex-col items-start sm:mt-6">
          <div className="flex items-center sm:mt-6 w-full">
            <h2 className="text-3xl font-bold">
              {tv?.name} {`(${tv?.first_air_date.slice(0, 4)})`}
            </h2>
            <p className="ml-auto text-lg">{episodeRuntime(tv)}</p>
          </div>
          <div className="my-4">
            {tv?.genres?.map((genre) => (
              <p
                className="bg-secondary-color hover:bg-dark-blue transition-all duration-300 sm:mt-4 my-4 mr-4 p-2 border-2 rounded-full inline-block"
                key={genre?.id}
              >
                {genre?.name}
              </p>
            ))}
          </div>
          <p className="text-lg max-w-prose">{tv?.overview}</p>
          {tv?.homepage && (
            <Link
              href={tv.homepage}
              className="font-bold inline-block mt-3 text-lg hover:text-secondary-color"
              target="_blank"
              rel="noopener"
            >
              Website
            </Link>
          )}
          <button
            className={`btn bg-primary-color hover:bg-secondary-color mt-4`}
            onClick={
              inWatchlist
                ? () => removeShowFromWatchlist(tv)
                : () => addShowToWatchlist(tv, cast)
            }
          >
            {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          </button>
        </div>
        {/* CAST */}
        <div>
          <h3 className="text-2xl font-bold my-4">Casts</h3>
          <div className="casts">
            {cast?.slice(0, 5).map((member) => (
              <div key={member.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/w780${member?.profile_path}`}
                  alt={member.name}
                  width={300}
                  height={300}
                />
                <p className="text-sm text-center mt-2">{member?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TvDetails;
