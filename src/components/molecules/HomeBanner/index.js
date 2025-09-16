import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";
import Video from "@/components/atoms/Video";
import { ClockIcon, PlayIcon, TvIcon } from "@heroicons/react/20/solid";
import { TagIcon } from "@heroicons/react/24/solid";

const HomeBanner = () => {
  return (
    <Swiper
      // className="w-full z-[0]"
      // install Swiper modules
      modules={[Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
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
        <div className="relative">
          <div className="absolute !bottom-[0px] left-[0px] p-[32px] pt-[60px] bg-gradient-to-t from-fourth-black to-transparent">
            <div className="text-4xl">PSM Makassar vs Persib Bandung</div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="font-medium flex items-center gap-1">
                <PlayIcon className="w-[16px]" />
                LIVE
              </div>
              <div className="font-normal flex items-center gap-1">
                <TagIcon className="w-[16px]" />
                BRI Super League
              </div>
              <div className="font-normal flex items-center gap-1">
                <ClockIcon className="w-[16px]" />
                16 September, 19.30 WIB
              </div>
            </div>
            <div className="text-md mt-1">
              <p>Mampukah PSM Makassar menakhlukkan Persib yang sedang dalam tren yang sangat baik, atau Persib siap mempertahankan trennya.</p>
            </div>
          </div>
          <Video
            src="https://www.pexels.com/id-id/download/video/6077718/"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeBanner