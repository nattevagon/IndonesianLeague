import React, { useEffect, useState } from 'react'
import { Services } from "@/service";
import { useRouter } from "next/router";
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout";
import { useUserActions } from "@/utils/admin/userActions";
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";

const DetailUser = () => {
  const router = useRouter();
  const { asPath, query } = router;
  const { id } = query;
  const [detailData, setDetailData] = useState({})
  const { handleRestore, handleSoftDelete, handleHardDelete, handleGender, handleRole } = useUserActions(router);
  const moment = require("moment");
  require("moment/locale/en-gb");

  console.log("router ", router)

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

  console.log('id => ', id, detailData)

  return (
    <AdminTableLayout
      id={id}
      data={detailData}
      title="User Detail"
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
                Name
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{detailData?.name}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Gender
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{handleGender(detailData?.gender)?.name}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Date of Birth
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{moment(detailData?.date_of_birth).format("dddd, D MMMM YYYY")}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Role
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{handleRole(detailData?.role)?.name}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
          Secure
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[180px]">
                Email
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{detailData?.email}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Phone Number
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{detailData?.phone_number}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Username
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{detailData?.username}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-[180px]">
                Password
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>****</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </AdminTableLayout>
  )
}

export default DetailUser