import Link from 'next/link';
import Card from './Card';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from './Loader';
import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

const TrendingSeries = ({ trendingSeries }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <section className="mx-4 sm:mx-0">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Trending Series Today</h2>
        <Link
          className="cursor-pointer border-2 p-2 rounded-lg hover:bg-secondary-color hover:text-white ease-out duration-200 sm:text-base text-sm"
          href="/tv"
        >
          View More
        </Link>
      </div>
      <div>
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
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          loop={true}
          autoplay={{ delay: 4000 }}
        >
          {!trendingSeries ? (
            <Loader />
          ) : (
            trendingSeries?.results.map((item) => (
              <SwiperSlide key={item.id} className="swiper-slide">
                <Card media="tv" item={item} id={item.id} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingSeries;
