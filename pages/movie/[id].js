/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../../components/Loader';
import Video from '../../components/Video';
import { useWatchlistContext } from '../../context/watchlistContext';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Card from '../../components/Card';
import { useState } from 'react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { btnStyle } from '../../utils/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Movie = ({ movie, videos, cast }) => {
  const {
    watchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
  } = useWatchlistContext();
  const [pageCount, setPageCount] = useState(1);
  const { back, query } = useRouter();
  const id = query.id;

  const { data: similar, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=${pageCount}`
  );

  if (!movie || !videos || !cast) return <Loader />;

  const inWatchlist = watchlist?.find((item) => item.id === movie?.id);

  const prevPage = () => {
    if (pageCount < 1) return;
    setPageCount((prev) => prev - 1);
  };

  const nextPage = () => {
    setPageCount((prev) => prev + 1);
  };

  return (
    <main className="container mx-auto my-6">
      <button
        className={`${btnStyle} mx-4 sm:mx-0 mb-6`}
        onClick={() => back()}
      >
        Go back
      </button>
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
                  className="bg-secondary-color hover:bg-black transition-all duration-300 sm:mt-4 my-4 mr-4 p-2 border-2 rounded-full  border-primary-color inline-block"
                  key={genre?.id}
                >
                  {genre?.name}
                </p>
              ))}
            </div>
            <p className="text-lg max-w-prose">{movie?.overview}</p>
            {movie?.homepage && (
              <Link href={movie.homepage}>
                <a
                  className="font-bold inline-block mt-3 text-primary-color text-lg"
                  target="_blank"
                  rel="noopener"
                >
                  Website
                </a>
              </Link>
            )}
            <button
              className={`${btnStyle} mt-4`}
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
              {cast?.slice(0, 5).map((member) => (
                <div key={member.id}>
                  <img
                    initial="hidden"
                    animate="show"
                    src={`https://image.tmdb.org/t/p/w780${member?.profile_path}`}
                    alt={member.name}
                  />
                  <p className="text-sm text-center mt-2">{member?.name}</p>
                </div>
              ))}
            </div>
          </>
        </div>
      </section>
      <section>
        {videos?.map((video) => (
          <Video key={video?.id} video={video} />
        ))}
      </section>
      <section>
        <h2 className="font-bold text-2xl mt-6 sm:mx-0 mx-6">Similar Movies</h2>
        <Swiper
          className="swiper-container"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          modules={[Navigation, Scrollbar, Pagination, Autoplay]}
          navigation
          loop={true}
          autoplay={{ delay: 4000 }}
          scrollbar={{ draggable: true }}
        >
          {!similar && !error ? (
            <Loader />
          ) : (
            similar?.results.map((item) => (
              <SwiperSlide key={item.id} className="swiper-slide m-0">
                <Card media="movie" item={item} id={item.id} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div className="flex justify-center items-center">
          {pageCount > 1 && (
            <button className={btnStyle} onClick={prevPage}>
              Prev
            </button>
          )}
          <button className={`${btnStyle} ml-4`} onClick={nextPage}>
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default Movie;

export async function getStaticPaths() {
  const { data: movies } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.API_KEY}&page=1`
  );

  const paths = movies.results.map((movie) => ({
    params: { id: movie.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data: movie } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );

  const { data: videosData } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
  );

  const { data: castData } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  const videos = videosData.results.slice(0, 3);
  const cast = castData.cast;

  return {
    props: {
      movie,
      videos,
      cast,
    },
  };
}
