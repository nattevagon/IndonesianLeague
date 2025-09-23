import Badge from "@/components/atoms/Badge";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import PostRender from "@/components/molecules/PostRender"
import { Services } from "@/service";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'

const DetailNews = () => {
  const router = useRouter();
  const { asPath, query } = router;
  const { id } = query;
  const [relatedNewsData, setRelatedNewsData] = useState([])
  const [detailData, setDetailData] = useState({});
  const [isLoadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get(
        `/api/get/news/today?limit=6`
      )
      .then((res) => {
        setRelatedNewsData(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoadingPage(false));
  }, [])

  useEffect(() => {
    if (id) {
      setLoadingPage(true);
      Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
        .get("/api/get/news/permalink/" + id)
        .then((res) => {
          const result = res.data;
          const data = result.data;

          setDetailData(data)
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingPage(false);
        });
    }
  }, [id])

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Breadcrumb
          isHome={true}
          title={detailData?.title}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-12">
        {/* <div className="col-span-1 w-full flex flex-col gap-6 mb-12 mt-6 lg:mt-0 order-2 lg:order-1">
          <div className="">
            <div className="bg-primary-blue text-primary-black dark:text-primary-white text-[28px] font-medium text-center p-2">
              Related News
            </div>
            <div className="text-center bg-[#262624]">
              <div className="flex flex-col items-center gap-8 p-4">
                {relatedNewsData.map((news) => (
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
                      <div className="text-primary-black dark:text-primary-white text-md text-left line-clamp-2">{news.title}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
        {/* col-span-2 */}
        <div className="col-span-3 xl:max-w-[1280px] m-auto order-1 lg:order-2"> 
          <div>
            <img
              className="w-full h-auto"
              src={detailData?.image_url}
              alt="PostImg"
            />
          </div>
          <div className="p-8 bg-secondary-white dark:bg-secondary-black">
            <div className="mb-8">
              <h1 className="text-primary-black dark:text-primary-white text-3xl font-bold mb-2">{detailData?.title}</h1>
              <div>{moment(detailData?.created_at).format("dddd, D MMMM YYYY")}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {detailData?.tag && JSON.parse(detailData?.tag).map((tag, i) => (
                  <Badge key={i} link={'/news?tag=' + tag}>{tag}</Badge>
                ))}
              </div>
            </div>
            <PostRender
              content={detailData?.content ? JSON.parse(detailData.content) : null}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailNews