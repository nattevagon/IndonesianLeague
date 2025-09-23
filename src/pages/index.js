import Button from "@/components/atoms/Button";
import FirstLeagueTables from "@/components/molecules/FirstLeagueTables";
import HomeBanner from "@/components/molecules/HomeBanner";
import HomeGallery from "@/components/molecules/HomeGallery";
import MatchweekToday from "@/components/molecules/MatchweekToday";
import { Services } from "@/service";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [isLoadingPage, setLoadingPage] = useState(false);
  const [newsData, setNewsData] = useState([])

  useEffect(() => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get(
        `/api/get/news/today?limit=3`
      )
      .then((res) => {
        setNewsData(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoadingPage(false));
  }, [])

  console.log('newsData => ', newsData)

  return (
    <div className="container text-primary-black dark:text-primary-white py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-12">
        <div className="col-span-1 w-full flex flex-col gap-6 mb-12">
          {/* <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1> */}
          <MatchweekToday />
          <FirstLeagueTables />
        </div>
        <div className="col-span-2 row-[1] md:row-auto">
          <div>
            <HomeBanner />
          </div>
          <div className="my-4">
            <h1 className="flex justify-between items-center">
              <div className="text-2xl font-bold">News</div>
              <Button
                href="/news"
                label="See More"
                className="bg-transparent hover:bg-transparent hover:underline"
              />
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-2">
              {newsData.map((news) => (
                <div key={news.id}>
                  <Link
                    className="hover:underline"
                    href={'/news/' + news.permalink}
                  >
                    <Image
                      src={news.image_url}
                      width={400}
                      height={360}
                      alt="News"
                    />
                    <div className="my-2 text-lg line-clamp-2">{news.title}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Matchweek Summary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-2">
              <div className="">
                <div className="bg-primary-blue text-primary-black dark:text-primary-white text-[28px] font-medium text-center p-2">
                  Stadium Attendance
                </div>
                <div className="text-center bg-[#262624]">
                  <div className="text-[16px] py-1 pt-2 border-b-[1px] border-[#161616]">BRI LIGA 1 2024-25</div>
                  <div className="text-[30px] py-1 pt-2 border-b-[1px] border-[#161616]">783343</div>
                </div>
              </div>
              <div className="">
                <div className="bg-primary-blue text-primary-black dark:text-primary-white text-[28px] font-medium text-center p-2">
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