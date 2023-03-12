import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { heroInfo } from '../utils/utils';

const Hero = () => {
  return (
    <Swiper
      slidesPerView={'auto'}
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      loop={true}
      autoplay={{ delay: 4000 }}
    >
      {heroInfo.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            className="w-full h-[70vh] relative flex justify-start items-center"
            style={{
              backgroundImage: `url(
             ${item.url}
             )`,
              backgroundSize: '100% 100%',
            }}
          >
            <div class="content-overlay"></div>
            <div className="flex md:w-1/2 h-full justify-center md:items-start items-start flex-col md:ml-14 mx-14 text-white z-10">
              <h2 className="text-5xl font-bold mb-4">{item.title}</h2>
              <div className="mb-4 hidden md:block">
                {item?.genres?.map((genre, i) => (
                  <p
                    className="bg-primary-color sm:mt-4 my-4 mr-4 p-2 rounded-full inline-block"
                    key={i}
                  >
                    {genre?.name}
                  </p>
                ))}
              </div>
              <p className="sm:text-lg mb-4">{item.text}</p>
              <Link
                className="btn md:py-2 md:px-6 text-lg hover:text-white hover:bg-secondary-color bg-primary-color"
                href={`/movie/${item.id}`}
              >
                More Info
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
