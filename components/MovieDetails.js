import React from 'react';
import { useWatchlist } from '../context/watchlistContext';
import Link from 'next/link';
import Image from 'next/image';

const MovieDetails = ({ movie, cast }) => {
  const {
    watchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
  } = useWatchlist();

  const inWatchlist = watchlist?.find((item) => item.id === movie?.id);
  return (
    <section className="details-grid mx-4 sm:mx-0">
      {/* IMAGE */}
      <div className="flex justify-center items-center">
        <Image
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
          alt={movie?.title}
          width={500}
          height={700}
        />
      </div>
      {/* INFO */}
      <div className="flex flex-col justify-center sm:mt-0 mt-4">
        <div className="flex flex-col items-start sm:mt-6">
          <div className="flex items-center sm:mt-6 w-full">
            <h2 className="text-3xl font-bold">
              {movie?.title} {`(${movie?.release_date.slice(0, 4)})`}
            </h2>
            {movie?.runtime > 0 && (
              <p className="ml-auto text-lg">
                {`${Math.floor(movie.runtime / 60)}` < 1
                  ? `${Math.floor(movie.runtime & 60)} min`
                  : `${Math.floor(movie.runtime / 60)}h : ${
                      movie.runtime % 60
                    } min`}
              </p>
            )}
          </div>

          <div className="my-4">
            {movie?.genres?.map((genre) => (
              <p
                className="bg-secondary-color hover:bg-dark-blue transition-all duration-300 sm:mt-4 my-4 mr-4 p-2 border-2 rounded-full inline-block"
                key={genre?.id}
              >
                {genre?.name}
              </p>
            ))}
          </div>
          <p className="text-lg max-w-prose">{movie?.overview}</p>
          {movie?.homepage && (
            <Link
              href={movie.homepage}
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
                ? () => removeMovieFromWatchlist(movie)
                : () => addMovieToWatchlist(movie, cast)
            }
          >
            {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          </button>
        </div>
        {/* CAST */}
        <>
          <h3 className="text-2xl font-bold my-4">Casts</h3>
          <div className="casts">
            {cast?.slice(0, 5).map(({ id, profile_path, name }) => (
              <div key={id}>
                <Link href={`/person/${id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w780${profile_path}`}
                    alt={name}
                    width={300}
                    height={300}
                  />
                </Link>
                <p className="text-sm text-center mt-2">{name}</p>
              </div>
            ))}
          </div>
        </>
      </div>
    </section>
  );
};

export default MovieDetails;
