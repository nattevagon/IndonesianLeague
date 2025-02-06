import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";

const HomeGallery = () => {
  return (
    <Swiper
      // className="w-full z-[0]"
      // install Swiper modules
      modules={[Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={3}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <Image
          src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Persija-Fokus-Benahi-Lini-Belakang-1738811970.jpeg'}
          width={1000}
          height={600}
          alt="BannerItem"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Pembuktian-Ahmad-Agung-Bersama-Persib-Bandung-1738727275.jpeg'}
          width={1000}
          height={600}
          alt="BannerItem"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Bentrok-Lawan-PSBS--Madura-United-Berusaha-Tidak-Tetpeleset-1738726668.jpg'}
          width={1000}
          height={600}
          alt="BannerItem"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Persija-Fokus-Benahi-Lini-Belakang-1738811970.jpeg'}
          width={1000}
          height={600}
          alt="BannerItem"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Pembuktian-Ahmad-Agung-Bersama-Persib-Bandung-1738727275.jpeg'}
          width={1000}
          height={600}
          alt="BannerItem"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Bentrok-Lawan-PSBS--Madura-United-Berusaha-Tidak-Tetpeleset-1738726668.jpg'}
          width={1000}
          height={600}
          alt="BannerItem"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeGallery