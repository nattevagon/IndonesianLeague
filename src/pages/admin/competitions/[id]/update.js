import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout";
import { Services } from "@/service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import TextField from "@/components/atoms/TextField";
import { useCompetitionActions } from "@/utils/admin/competitionActions";

const UpdateCompetitions = () => {
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
  const { handleUpdate, handleSoftDelete, handleHardDelete, handleRestore } = useCompetitionActions(router);
  const toCompetitionsDetail = asPath.split("/").slice(0, 4).join("/");

  useEffect(() => {
    if (id) {
      setLoadingPage(true);
      Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
        .get("/api/get/competitions/" + id)
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

  console.log("detailData ", detailData)

  return (
    <AdminTableLayout
      isLoadingPage={isLoadingPage}
      id={id}
      data={detailData}
      title="Update Competitions"
      type="update"
      onUpdate={() => handleUpdate(id, detailData, (result) => {
        if (result.status) {
          router.replace(toCompetitionsDetail);
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
      <div className="mt-4">
        <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
          General
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Name
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="text"
                    placeholder="Type a Name"
                    name="name"
                    onChange={handleChangeForm}
                    value={detailData?.name || ""}
                    className="w-full bg-transparent p-2"
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Division
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="select"
                    placeholder="Select a Division"
                    name="division"
                    onChange={handleChangeForm}
                    value={detailData?.division || ""}
                    className="w-full bg-transparent p-2"
                    options={[
                      { id: 1, name: "1" },
                      { id: 2, name: "2" },
                      { id: 3, name: "3" }
                    ]}
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
                    value={detailData?.is_publish}
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
    </AdminTableLayout>
  )
}

export default UpdateCompetitions