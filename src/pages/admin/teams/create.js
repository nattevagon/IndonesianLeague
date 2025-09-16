import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout"
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import TextField from "@/components/atoms/TextField";
import { useTeamActions } from "@/utils/admin/teamActions";
import { Services } from "@/service";

const CreateTeam = () => {
  const router = useRouter();
  const [isLoadingPage, setLoadingPage] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [selectOptionData, setSelectOptionData] = useState({});
  const [fieldValid, setFieldValid] = useState({
    status: false,
    name: '',
    message: ''
  });
  const { handleCreate } = useTeamActions(router);

  useEffect(() => {
    handleGetSelectOption();
  }, [])

  const handleGetSelectOption = () => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get("/api/get/teams/select-option")
      .then((res) => {
        const result = res.data;
        const data = result.data;

        console.log('select=> ', data)

        setSelectOptionData(data)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    if (name === "founded_year") {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

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
      title="Create Team"
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
                Competition
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="select"
                    placeholder="Select a Division"
                    name="competition_id"
                    onChange={handleChangeForm}
                    value={detailData?.competition_id || ""}
                    className="w-full bg-transparent p-2"
                    options={selectOptionData.competitions}
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
          Profile
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Description
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="textarea"
                    placeholder="Type a Description"
                    name="description"
                    onChange={handleChangeForm}
                    value={detailData?.description || ""}
                    className="w-full bg-transparent p-2"
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Short Name
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="text"
                    placeholder="Type a Short Name"
                    name="short_name"
                    onChange={handleChangeForm}
                    value={detailData?.short_name || ""}
                    className="w-full bg-transparent p-2"
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Founded Year
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="text"
                    placeholder="Type a Founded Year"
                    name="founded_year"
                    onChange={handleChangeForm}
                    value={detailData?.founded_year || ""}
                    className="w-full bg-transparent p-2"
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Logo URL
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="text"
                    placeholder="Type a Logo URL"
                    name="logo_url"
                    onChange={handleChangeForm}
                    value={detailData?.logo_url || ""}
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
          Managerial
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Coach
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="select"
                    placeholder="Select a Coach"
                    name="coach_id"
                    onChange={handleChangeForm}
                    value={detailData?.coach_id || ""}
                    className="w-full bg-transparent p-2"
                    options={selectOptionData.coaches}
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
          Homebase
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                City
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="text"
                    placeholder="Type a City"
                    name="city"
                    onChange={handleChangeForm}
                    value={detailData?.city || ""}
                    className="w-full bg-transparent p-2"
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Stadium
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="select"
                    placeholder="Select a Stadium"
                    name="stadium_id"
                    onChange={handleChangeForm}
                    value={detailData?.stadium_id || ""}
                    className="w-full bg-transparent p-2"
                    options={selectOptionData.stadiums}
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

export default CreateTeam