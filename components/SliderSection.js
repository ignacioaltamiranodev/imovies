import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from './Card';
import Loader from './Loader';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const SliderSection = ({ data }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <>
      {data.map((section, i) => (
        <section key={i} className="mx-4 sm:mx-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl">{section.title}</h2>
            <Link
              className="cursor-pointer  border-2 p-2 rounded-lg hover:bg-secondary-color hover:text-white ease-out duration-200 sm:text-base text-sm"
              href={`${section.media === 'movie' ? '/movie' : '/tv'}`}
            >
              View More
            </Link>
          </div>
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
            {!section ? (
              <Loader />
            ) : (
              section?.section?.map((item) => (
                <SwiperSlide key={item.id} className="swiper-slide">
                  <Card media={section.media} item={item} id={item.id} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </section>
      ))}
    </>
  );
};

export default SliderSection;
