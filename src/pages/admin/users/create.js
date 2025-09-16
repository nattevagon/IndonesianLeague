import Breadcrumb from "@/components/atoms/Breadcrumb"
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout"
import { Services } from "@/service";
import { useUserActions } from "@/utils/admin/userActions";
import { useRouter } from "next/router";
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import TextField from "@/components/atoms/TextField";

const CreateUser = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState({});
  const [fieldValid, setFieldValid] = useState({
    status: false,
    name: '',
    message: ''
  });
  const { handleCreate } = useUserActions(router);

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
      title="Create User"
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
                    value={detailData?.gender || ""}
                    className="w-full bg-transparent p-2"
                    options={[
                      { id: 0, name: "Male" },
                      { id: 1, name: "Female" }
                    ]}
                    fieldValid={fieldValid}
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
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
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
                    value={detailData?.role || ""}
                    className="w-full bg-transparent p-2"
                    options={[
                      { id: 0, name: "User" },
                      { id: 1, name: "Admin" },
                      { id: 2, name: "Super Admin" },
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
          Account
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
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
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
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
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
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
                    fieldValid={fieldValid}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px] text-[16px]">
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

export default CreateUser