import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout"
import { useRouter } from "next/router";
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import TextField from "@/components/atoms/TextField";
import { useCompetitionActions } from "@/utils/admin/competitionActions";

const CreateCompetition = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState({});
  const [fieldValid, setFieldValid] = useState({
    status: false,
    name: '',
    message: ''
  });
  const { handleCreate } = useCompetitionActions(router);

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

  return (
    <AdminTableLayout
      title="Create Competition"
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
    </AdminTableLayout >
  )
}

export default CreateCompetition