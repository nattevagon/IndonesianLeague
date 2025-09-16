import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout"
import { useRouter } from "next/router";
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import TextField from "@/components/atoms/TextField";
import dynamic from "next/dynamic";
import { useNewsActions } from "@/utils/admin/newsActions";
import { TabBody, TabButton, TabContent, TabControl, Tabs } from "@/components/admin/atoms/Tabs";

const AdminEditor = dynamic(() => import("@/components/admin/molecules/AdminEditor"), {
  ssr: false, // <- ini kunci supaya tidak jalan di server
});

const CreateNews = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState({});
  const [fieldValid, setFieldValid] = useState({
    status: false,
    name: '',
    message: ''
  });
  const [content, setContent] = useState();
  const { handleCreate } = useNewsActions(router);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setDetailData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

  console.log('detail', detailData);

  return (
    <AdminTableLayout
      title="Create News"
      type="create"
      onCreate={() => handleCreate(detailData, (result) => {
        if (result.status) {
          router.back();
        }
        else {
          setFieldValid({
            status: true,
            name: result.name,
            message: result.message
          });
        }
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
                        <TextField
                          type="text"
                          placeholder="Type a Tag"
                          name="tag"
                          onChange={handleChangeForm}
                          value={detailData?.tag || ""}
                          className="w-full bg-transparent p-2"
                          fieldValid={fieldValid}
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
                <AdminEditor onRenderContent={(value) => handleChangeContent(value)} />
              </div>
            </div>
          </TabContent>
        </TabBody>
      </Tabs>
    </AdminTableLayout >
  )
}

export default CreateNews