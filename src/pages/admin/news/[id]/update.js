import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout";
import { Services } from "@/service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import TextField from "@/components/atoms/TextField";
import { useNewsActions } from "@/utils/admin/newsActions";
import dynamic from "next/dynamic";
import safeJsonParse from "@/helper/safeJsonParse";
import { TabBody, TabButton, TabContent, TabControl, Tabs } from "@/components/admin/atoms/Tabs";
import InputBadgesField from "@/components/atoms/InputBadgeField";

const AdminEditor = dynamic(() => import("@/components/molecules/PostEditor"), {
  ssr: false,
});

const UpdateNews = () => {
  const router = useRouter();
  const { asPath, pathname, query } = router;
  const backPath = pathname.split("/").slice(0, 3).join("/");
  const { id } = query;
  const [detailData, setDetailData] = useState({})
  const [isLoadingPage, setLoadingPage] = useState(false);
  const [fieldValid, setFieldValid] = useState({
    status: false,
    name: '',
    message: ''
  });
  const { handleUpdate, handleSoftDelete, handleHardDelete, handleRestore } = useNewsActions(router);
  const toNewsDetail = asPath.split("/").slice(0, 4).join("/");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoadingPage(true);
        const res = await Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE).get(`/api/get/news/${id}`);
        const data = res.data.data;
        setDetailData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchData();
  }, [id]);


  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setDetailData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log('name, value', name, value);

    setFieldValid(() => ({
      status: false,
      name: '',
      message: ''
    }));
  }

  const handleChangeContent = (value) => {
    const valueStringify = JSON.stringify(value);

    setDetailData((prev) => ({
      ...prev,
      content: valueStringify
    }));
  }

  console.log("detailData ", detailData)

  return (
    <AdminTableLayout
      isLoadingPage={isLoadingPage}
      id={id}
      data={detailData}
      title="Update News"
      type="update"
      onUpdate={() => handleUpdate(id, detailData, (result) => {
        if (result.status) {
          router.replace(toNewsDetail);
        }
        else {
          setFieldValid({
            status: true,
            name: result.name,
            message: result.message
          });
        }
      })}
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
                    <TableCell className="w-[180px] text-[16px]">
                      Title
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div className="w-full">
                        <TextField
                          type="text"
                          placeholder="Type a Title"
                          name="title"
                          onChange={handleChangeForm}
                          value={detailData?.title || ""}
                          className="w-full bg-transparent p-2"
                          fieldValid={fieldValid}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[180px] text-[16px]">
                      Image URL
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div className="w-full">
                        <TextField
                          type="text"
                          placeholder="Type a Image URL"
                          name="image_url"
                          onChange={handleChangeForm}
                          value={detailData?.image_url || ""}
                          className="w-full bg-transparent p-2"
                          fieldValid={fieldValid}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[180px] text-[16px]">
                      Author
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div className="w-full">
                        <TextField
                          type="text"
                          placeholder="Type a Author"
                          name="author"
                          onChange={handleChangeForm}
                          value={detailData?.author || ""}
                          className="w-full bg-transparent p-2"
                          fieldValid={fieldValid}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="w-[180px] text-[16px]">
                      Tag
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div className="w-full">
                        <InputBadgesField
                          name="tag"
                          initial={detailData?.tag ? safeJsonParse(detailData?.tag) : []}
                          suggestions={["Malut United", "Persib", "Persija", "Bali United", "PSM Makassar", "Arema", "Persebaya", "Dewa United"]}
                          onChange={handleChangeForm}
                        />
                      </div>
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
                    <TableCell className="w-[180px] text-[16px]">
                      Is Publish
                    </TableCell>
                    <TableCell className="flex items-center">
                      <div className="mr-4">:</div>
                      <div className="w-full">
                        <TextField
                          type="select"
                          placeholder="Select a Is Publish"
                          name="is_publish"
                          onChange={handleChangeForm}
                          value={detailData?.is_publish || ""}
                          className="w-full bg-transparent p-2"
                          options={[
                            { id: 0, name: "False" },
                            { id: 1, name: "True" },
                          ]}
                          fieldValid={fieldValid}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabContent>
          <TabContent id="tab-2">
            <div className="mt-4">
              <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
                Content
              </div>
              <div className="shadow-sm bg-secondary-white dark:bg-secondary-black w-full">
                {detailData?.content && (
                  <AdminEditor
                    initialData={safeJsonParse(detailData?.content) || {}}
                    onRenderContent={(value) => handleChangeContent(value)}
                  />
                )}
              </div>
            </div>
          </TabContent>
        </TabBody>
      </Tabs>
    </AdminTableLayout>
  )
}

export default UpdateNews