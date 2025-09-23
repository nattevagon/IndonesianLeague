import Breadcrumb from "@/components/atoms/Breadcrumb";
import Button from "@/components/atoms/Button";
import Pagination from "@/components/atoms/Pagination";
import { Services } from "@/service";
import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'

const News = () => {
  const router = useRouter();
  const { asPath, query } = router;
  const { id } = query;
  const [page, setPage] = useState(1);
  const [highlightNewsData, setHighlightNewsData] = useState([]);
  const [latestNewsData, setLatestNewsData] = useState([]);
  const [newsDataPagination, setNewsDataPagination] = useState({});
  const [detailData, setDetailData] = useState({});
  const [isLoadingPage, setLoadingPage] = useState(false);
  const [search, setSearch] = useState("");
  const currentPage = query?.page || 1;
  const currentSearch = query?.search || '';
  const currentTag = query?.tag || '';

  useEffect(() => {
    handleGetLatestNews(currentPage, currentSearch, currentTag);
    handleGetHighlightNews();
    setLoadingPage(currentPage);
    setSearch(currentSearch);
  }, [currentPage, currentSearch, currentTag])

  const handleGetLatestNews = (currentPage, currentSearch, currentTag) => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get(
        `/api/get/news?limit=6&page=${currentPage}` +
        (currentSearch ? `&search=${currentSearch}` : '') + `&is_publish=1` +
        (currentTag ? `&tag=${currentTag}` : '')
      )
      .then((res) => {
        setLatestNewsData(res.data.data);
        setNewsDataPagination(res.data.pagination);
      })
      .catch(console.error)
      .finally(() => setLoadingPage(false));
  }

  const handleGetHighlightNews = () => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get(
        `/api/get/news/today?limit=7`
      )
      .then((res) => {
        setHighlightNewsData(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoadingPage(false));
  }

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Breadcrumb isHome={true} />
      </div>
      {(query?.page || query?.tag) ?
        <div>
          <div className="flex items-center justify-between mb-6 gap-4 bg-secondary-white text-primary-black dark:bg-secondary-black dark:text-primary-white p-2">
            <Button
              onClick={() => router.back()}
              className="bg-transparent hover:bg-transparent text-primary-black h-full hover:opacity-75 h-full"
              icon={ArrowLeftIcon}
            />
            <div className="w-full font-medium text-[28px] h-full text-center">
              {(query?.page && !query?.tag) ? "Latest News" : ""}
              {(query?.page && query?.tag) || query?.tag ? "Tag : " + query?.tag : ""}
            </div>
          </div>
          <div className="col-span-3 w-full order-1 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNewsData.map((news) => (
                <div key={news.id} className="w-full">
                  <Link
                    className="gap-2"
                    href={'/news/' + news.permalink}
                  >
                    <img
                      className="w-full h-auto object-cover"
                      src={news.image_url}
                      alt="News"
                    />
                    <div className="bg-secondary-black text-primary-white text-md text-left p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarDaysIcon className="h-4 w-4 inline-block" />
                        {moment(news.created_at).format("dddd, D MMMM YYYY")}</div>
                      <div className="text-primary-black dark:text-primary-white text-md text-left line-clamp-2 mt-2 hover:underline">{news.title}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex mt-8 justify-center">
            <Pagination
              data={newsDataPagination}
            />
          </div>
        </div >
        :
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-12">
          <div className="col-span-1 w-full flex flex-col gap-6 mb-12 mt-6 lg:mt-0 order-2 lg:order-1">
            <div className="">
              <div className="bg-primary-blue text-primary-black dark:text-primary-white text-[28px] font-medium text-center p-2">
                Latest News
              </div>
              <div className="text-center bg-[#262624]">
                <div className="flex flex-col items-center gap-8 p-4">
                  {latestNewsData.map((news) => (
                    <div key={news.id} className="w-full">
                      <Link
                        className="flex items-center gap-2 hover:underline"
                        href={'/news/' + news.permalink}
                      >
                        <img
                          className="w-[140px] h-[80px] object-cover mr-4"
                          src={news.image_url}
                          alt="News"
                        />
                        <div className="text-md text-primary-black dark:text-primary-white text-left line-clamp-2">{news.title}</div>
                      </Link>
                    </div>
                  ))}
                  <Button
                    href={`/news?page=1`}
                    label="More News"
                    className="bg-primary-black hover:bg-third-black w-full flex justify-center items-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 w-full order-1 lg:order-2">
            <div className="mb-8">
              <div key={highlightNewsData[0]?.id} className="w-full">
                <Link
                  className="gap-2 hover:underline"
                  href={'/news/' + highlightNewsData[0]?.permalink}
                >
                  <img
                    className="w-full h-auto object-cover"
                    src={highlightNewsData[0]?.image_url}
                    alt="News"
                  />
                  <div className="text-primary-black dark:text-primary-white text-3xl font-bold text-left line-clamp-2 mt-4">{highlightNewsData[0]?.title}</div>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlightNewsData.slice(1).map((news) => (
                <div key={news.id} className="w-full">
                  <Link
                    className="gap-2 hover:underline"
                    href={'/news/' + news.permalink}
                  >
                    <img
                      className="w-full h-auto object-cover"
                      src={news.image_url}
                      alt="News"
                    />
                    <div className="text-primary-black dark:text-primary-white text-md text-left line-clamp-2 mt-2">{news.title}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default News