import React, { useEffect, useState } from 'react'
import { Services } from "@/service";
import { useRouter } from "next/router";
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout";
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import { useNewsActions } from "@/utils/admin/newsActions";
import { TabBody, TabButton, TabContent, TabControl, Tabs } from "@/components/admin/atoms/Tabs";
import PostRender from "@/components/molecules/PostRender";
import Badge from "@/components/atoms/Badge";

const DetailNews = () => {
  const router = useRouter();
  const { asPath, query } = router;
  const { id } = query;
  const [detailData, setDetailData] = useState({});
  const [tab, setTab] = useState(1);
  const { handleRestore, handleSoftDelete, handleHardDelete, handleGender, handleIsPublish } = useNewsActions(router);
  const [isLoadingPage, setLoadingPage] = useState(false);
  const moment = require("moment");
  require("moment/locale/en-gb");

  useEffect(() => {
    if (id) {
      setLoadingPage(true);
      Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
        .get("/api/get/news/" + id)
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

  console.log('id => ', id, detailData)

  return (
    <AdminTableLayout
      isLoadingPage={isLoadingPage}
      id={id}
      data={detailData}
      title="News Detail"
      type="detail"
      onSoftDelete={() => handleSoftDelete(id, () => {
        router.back();
      })}
      onHardDelete={() => handleHardDelete(id, () => {
        router.back();
      })}
      onRestore={() => handleRestore(id, () => {
        router.back();
      })}
    >
      <Tabs defaultActive="tab-1">
        <TabControl>
          <TabButton id="tab-1">General & Visibility</TabButton>
          <TabButton id="tab-2">Content Post</TabButton>
        </TabControl>
        <TabBody>
          <TabContent id="tab-1">
            <div className="mt-4">
              <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
                General
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-[180px]">
                      ID
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div>{detailData?.id}</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[180px]">
                      Title
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div>{detailData?.title}</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[180px]">
                      Permalink
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div>{detailData?.permalink}</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[180px]">
                      Tag
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div className="flex flex-wrap gap-2">
                        {detailData?.tag && JSON.parse(detailData?.tag).map((tag, i) => (
                          <Badge key={i}>{tag}</Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[180px]">
                      Author
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div>{detailData?.author}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
                Visibility
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-[180px]">
                      Is Publish
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div>{handleIsPublish(detailData?.is_publish)?.name}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabContent>
          <TabContent id="tab-2">
            <div className="mt-4">
              <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
                Image Post
              </div>
              <div className="p-4 bg-secondary-white dark:bg-secondary-black">
                <img
                  src={detailData?.image_url}
                  alt="Image"
                  className="object-contain w-full max-h-[250px]"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
                Content
              </div>
              <div className="p-4 bg-secondary-white dark:bg-secondary-black">
                <PostRender
                  content={detailData?.content ? JSON.parse(detailData.content) : null}
                />
              </div>
            </div>
          </TabContent>
        </TabBody>
      </Tabs>
    </AdminTableLayout>
  )
}

export default DetailNews