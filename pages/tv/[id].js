import axios from 'axios';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import Video from '../../components/Video';
import useSWR from 'swr';
import Card from '../../components/Card';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import TvDetails from '../../components/TvDetails';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Movie = ({ tv, videos, cast }) => {
  const { back, query } = useRouter();
  const id = query.id;

  const { data: similar, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );

  return (
    <main className="container mx-auto my-6">
      <button
        className={`btn bg-primary-color hover:bg-secondary-color mx-4 sm:mx-0 mb-6`}
        onClick={() => back()}
      >
        Go Back
      </button>
      {tv ? <TvDetails tv={tv} cast={cast} /> : <Loader />}
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
