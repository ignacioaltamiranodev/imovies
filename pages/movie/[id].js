import axios from 'axios';
import Loader from '../../components/Loader';
import Video from '../../components/Video';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Card from '../../components/Card';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieDetails from '../../components/MovieDetails';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Movie = ({ movie, videos, cast }) => {
  const { back, query } = useRouter();
  const id = query.id;

  const { data: similar, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  return (
    <main className="container mx-auto my-6">
      <button
        className={`btn bg-primary-color hover:bg-secondary-color mx-4 sm:mx-0 mb-6`}
        onClick={() => back()}
      >
        Go Back
      </button>
      {movie ? <MovieDetails movie={movie} cast={cast} /> : <Loader />}
      <section>
        {videos?.map((video) => (
          <Video key={video?.id} video={video} />
        ))}
      </section>
      {similar?.results?.length >= 1 && (
        <section>
          <h2 className="font-bold text-2xl mt-6 sm:mx-0 mx-6">
            Similar Movies
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
                <SwiperSlide key={item.id} className="swiper-slide m-0">
                  <Card media="movie" item={item} id={item.id} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </section>
      )}
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
