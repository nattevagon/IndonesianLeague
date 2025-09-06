import Breadcrumb from "@/components/atoms/Breadcrumb"
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout";
import { Services } from "@/service";
import useModalStore from "@/store/useModalStore";
import { useUserActions } from "@/utils/admin/userActions";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import TextField from "@/components/atoms/TextField";

const UpdateUser = () => {
  const router = useRouter();
  const { asPath, pathname, query } = router;
  const backPath = pathname.split("/").slice(0, 3).join("/");
  const { id } = query;
  const [detailData, setDetailData] = useState({})
  const [loadingModal, setLoadingModal] = useState(false)
  const { openModal, closeModal, setLoading } = useModalStore();
  const { handleUpdate, handleSoftDelete, handleHardDelete, handleRestore } = useUserActions(router);

  useEffect(() => {
    if (id) {
      Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
        .get("/api/get/users/" + id)
        .then((res) => {
          const result = res.data;
          const data = result.data;

          setDetailData(data)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id])

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setDetailData((prev) => ({
      ...prev,
      [name]: name === "role" ? Number(value) : value,
    }));
  }

  console.log("detailData ", detailData)

  return (
    <AdminTableLayout
      id={id}
      data={detailData}
      title="Update User"
      type="update"
      loading={loadingModal}
      onUpdate={() => handleUpdate(id, detailData)}
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
              <TableCell className="w-[180px]">
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
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Gender
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="select"
                    placeholder="Select a Gender"
                    name="gender"
                    onChange={handleChangeForm}
                    value={detailData?.gender?.toString() || ""}
                    className="w-full bg-transparent p-2"
                    options={[
                      { value: 0, label: "Male" },
                      { value: 1, label: "Female" }
                    ]}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
                Date of Birth
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="calendar"
                    placeholder="Type a Date Of Birth"
                    name="date_of_birth"
                    onChange={handleChangeForm}
                    value={detailData?.date_of_birth || ""}
                    className="w-full bg-transparent p-2"
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Role
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="select"
                    placeholder="Select a Role"
                    name="role"
                    onChange={handleChangeForm}
                    value={detailData?.role?.toString() || ""}
                    className="w-full bg-transparent p-2"
                    options={[
                      { value: 0, label: "User" },
                      { value: 1, label: "Admin" },
                      { value: 2, label: "Super Admin" },
                    ]}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
          Account
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[180px]">
                Email
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="email"
                    placeholder="Type a Email"
                    name="email"
                    onChange={handleChangeForm}
                    value={detailData?.email || ""}
                    className="w-full bg-transparent p-2"
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Phone Number
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="tel"
                    placeholder="Type a Phone Number"
                    name="phone_number"
                    onChange={handleChangeForm}
                    value={detailData?.phone_number || ""}
                    className="w-full bg-transparent p-2"
                  />
                </div>
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell className="w-[180px]">
                Username
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="text"
                    placeholder="Type a Username"
                    name="username"
                    onChange={handleChangeForm}
                    value={detailData?.username || ""}
                    className="w-full bg-transparent p-2"
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Password
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div className="w-full">
                  <TextField
                    type="password"
                    placeholder="Type a Password"
                    name="password"
                    onChange={handleChangeForm}
                    value={detailData?.password || ""}
                    className="w-full bg-transparent p-2"
                  />
                </div>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </AdminTableLayout>
  )
}

export default UpdateUser