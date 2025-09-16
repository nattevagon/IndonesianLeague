import React, { useEffect, useState } from 'react'
import { Services } from "@/service";
import { useRouter } from "next/router";
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout";
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import { useTeamActions } from "@/utils/admin/teamActions";
import Image from "next/image";

const DetailTeam = () => {
  const router = useRouter();
  const { asPath, query } = router;
  const { id } = query;
  const [detailData, setDetailData] = useState({});
  const { handleRestore, handleSoftDelete, handleHardDelete, handleGender, handleCompetitionId } = useTeamActions(router);
  const [isLoadingPage, setLoadingPage] = useState(false);
  const moment = require("moment");
  require("moment/locale/en-gb");

  useEffect(() => {
    if (id) {
      setLoadingPage(true);
      Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
        .get("/api/get/teams/" + id)
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
      title="Team Detail"
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
      <div className="grid grid-cols-3 gap-4">
        <div class="col-span-2">
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
                    Short Name
                  </TableCell>
                  <TableCell className="flex items-center">
                    <div className="mr-4">:</div>
                    <div>{detailData?.short_name}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[180px]">
                    City
                  </TableCell>
                  <TableCell className="flex items-center">
                    <div className="mr-4">:</div>
                    <div>{detailData?.city}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[180px]">
                    Founded Year
                  </TableCell>
                  <TableCell className="flex items-center">
                    <div className="mr-4">:</div>
                    <div>{detailData?.founded_year}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[180px]">
                    Competition
                  </TableCell>
                  <TableCell className="flex items-center">
                    <div className="mr-4">:</div>
                    <div>{detailData?.competition_name}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[180px]">
                    Coach
                  </TableCell>
                  <TableCell className="flex items-center">
                    <div className="mr-4">:</div>
                    <div>{detailData?.coach_name}</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <div className="mt-4">
            <div className="bg-primary-blue text-primary-white text-[28px] font-medium px-4 py-2">
              Logo
            </div>
            <div className="bg-secondary-black p-2">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={detailData?.logo_url}
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </AdminTableLayout>
  )
}

export default DetailTeam