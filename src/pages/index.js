import Modal from "@/components/atoms/Modal";
import FirstLeagueTables from "@/components/molecules/FirstLeagueTables";
import HomeBanner from "@/components/molecules/HomeBanner";
import HomeGallery from "@/components/molecules/HomeGallery";
import MatchweekToday from "@/components/molecules/MatchweekToday";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';

const Home = () => {
  return (
    <div className="container overflow-auto text-white py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="col-span-1 w-full flex flex-col gap-6">
          <MatchweekToday />
          <FirstLeagueTables />
        </div>
        <div className="col-span-2">
          <div>
            <HomeBanner />
          </div>
          <div className="my-4">
            <h1 className="text-2xl font-bold">News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-2">
              <Link
                className="hover:underline"
                href={'/news/coach-has-been-sacked-3213213'}
              >
                <Image
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Pena-Kecewa-Persija-Hanya-Raih-Hasil-Imbang-1738574337.jpeg'}
                  width={400}
                  height={360}
                  alt="News"
                />
                <div className="my-2 text-lg">Coach has been sacked!</div>
              </Link>
              <Link
                className="hover:underline"
                href={'/news/coach-has-been-sacked-3213213'}
              >
                <Image
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Persija-Fokus-Benahi-Lini-Belakang-1738811970.jpeg'}
                  width={400}
                  height={360}
                  alt="News"
                />
                <div className="my-2 text-lg">Persija Focuses on Improving Back Line</div>
              </Link>
              <Link
                className="hover:underline"
                href={'/news/coach-has-been-sacked-3213213'}
              >
                <Image
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/news/Pendekar-Cisadane-Kembali-Bermain-di-Indomilk-Arena-1738745734.jpg'}
                  width={400}
                  height={360}
                  alt="News"
                />
                <div className="my-2 text-lg">Cisadane Warriors Return to Play at Indomilk Arena</div>
              </Link>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Matchweek Summary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-2">
              <div className="">
                <div className="bg-[#034C8C] text-white text-[28px] font-medium text-center p-2">
                  Stadium Attendance
                </div>
                <div className="text-center bg-[#262624]">
                  <div className="text-[16px] py-1 pt-2 border-b-[1px] border-[#161616]">BRI LIGA 1 2024-25</div>
                  <div className="text-[30px] py-1 pt-2 border-b-[1px] border-[#161616]">783343</div>
                </div>
              </div>
              <div className="">
                <div className="bg-[#034C8C] text-white text-[28px] font-medium text-center p-2">
                  Stats
                </div>
                <div className="text-center bg-[#262624]">
                  <div className="text-[16px] py-1 pt-2 border-b-[1px] border-[#161616]">2 February 2025 - 3 February 2025</div>
                  <div className="grid grid-cols-4">
                    <div>
                      <div className="text-[16px] py-1 pt-2 border-b-[1px] border-[#161616]">Goals</div>
                      <div className="text-[30px] py-1 pt-2 border-b-[1px] border-[#161616]">15</div>
                    </div>
                    <div>
                      <div className="text-[16px] py-1 pt-2 border-b-[1px] border-[#161616]">Saves</div>
                      <div className="text-[30px] py-1 pt-2 border-b-[1px] border-[#161616]">24</div>
                    </div>
                    <div>
                      <div className="text-[16px] py-1 pt-2 border-b-[1px] border-[#161616]">Yellow Card</div>
                      <div className="text-[30px] py-1 pt-2 border-b-[1px] border-[#161616]">18</div>
                    </div>
                    <div>
                      <div className="text-[16px] py-1 pt-2 border-b-[1px] border-[#161616]">Red Card</div>
                      <div className="text-[30px] py-1 pt-2 border-b-[1px] border-[#161616]">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Gallery</h1>
            <div className="py-2">
              <HomeGallery />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;