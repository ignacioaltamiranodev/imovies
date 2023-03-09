/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import Video from '../../components/Video';
import { useWatchlist } from '../../context/watchlistContext';
import useSWR from 'swr';
import Card from '../../components/Card';
import { useState } from 'react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { episodeRuntime } from '../../utils/utils';
import { toast } from 'react-hot-toast';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Movie = ({ tv, videos, cast }) => {
  const {
    watchlist,
    addShowToWatchlist,
    removeShowFromWatchlist,
  } = useWatchlist();
  const [pageCount, setPageCount] = useState(1);
  const { back, query } = useRouter();
  const id = query.id;

  const { data: similar, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=${pageCount}`
  );

  if (!tv || !videos || !cast) return <Loader />;
  if (error) toast.error(error.message);

  const prevPage = () => {
    if (pageCount < 1) return;
    setPageCount((prev) => prev - 1);
  };

  const nextPage = () => {
    setPageCount((prev) => prev + 1);
  };

  const inWatchlist = watchlist.find((item) => item.id === tv?.id);

  return (
    <main className="container mx-auto my-6">
      <button
        className={`btn bg-primary-color hover:bg-secondary-color mx-4 sm:mx-0 mb-6`}
        onClick={() => back()}
      >
        Go Back
      </button>
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
        <div className="flex flex-col items-center justify-center sm:mt-0 mt-4">
          <div>
            <div className="flex items-center sm:mt-6">
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
              className={`btn bg-primary-color hover:bg-secondary-color mt-4 block`}
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
          <>
            <h3 className="text-2xl font-bold my-4">Casts</h3>
            <div className="casts">
              {cast?.slice(0, 5).map((member) => (
                <div key={member.id}>
                  <img
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
      {similar?.results?.length >= 1 && (
        <section>
          <h2 className="font-bold text-2xl mt-6 sm:mx-0 mx-6">
            Similar TV Shows
          </h2>
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
          >
            {!similar && !error ? (
              <Loader />
            ) : (
              similar?.results.map((item) => (
                <SwiperSlide key={item.id} className="swiper-slide">
                  <Card media="tv" item={item} id={item.id} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
          <div className="flex justify-center items-center">
            {pageCount > 1 && (
              <button
                className={`btn bg-primary-color hover:bg-secondary-color`}
                onClick={prevPage}
              >
                Prev
              </button>
            )}
            <button
              className={`btn bg-primary-color hover:bg-secondary-color ml-4`}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default Movie;

export async function getStaticPaths() {
  const { data: series } = await axios.get(
    `https://api.themoviedb.org/3/discover/tv/?api_key=${process.env.API_KEY}&page=1`
  );

  const paths = series.results.map((tv) => ({
    params: { id: tv.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data: tv } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );

  const { data: videosData } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
  );

  const { data: castData } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );

  const videos = videosData.results.slice(0, 3);
  const cast = castData.cast;

  return {
    props: {
      tv,
      videos,
      cast,
    },
  };
}
