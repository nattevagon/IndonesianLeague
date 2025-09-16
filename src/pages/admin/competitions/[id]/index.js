import React, { useEffect, useState } from 'react'
import { Services } from "@/service";
import { useRouter } from "next/router";
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout";
import { Table, TableBody, TableCell, TableRow } from "@/components/admin/atoms/Table";
import { useCompetitionActions } from "@/utils/admin/competitionActions";

const DetailCompetition = () => {
  const router = useRouter();
  const { asPath, query } = router;
  const { id } = query;
  const [detailData, setDetailData] = useState({});
  const { handleRestore, handleSoftDelete, handleHardDelete, handleGender, handleIsPublish } = useCompetitionActions(router);
  const [isLoadingPage, setLoadingPage] = useState(false);
  const moment = require("moment");
  require("moment/locale/en-gb");

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

  console.log('id => ', id, detailData)

  return (
    <AdminTableLayout
      isLoadingPage={isLoadingPage}
      id={id}
      data={detailData}
      title="Competition Detail"
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
                Division
              </TableCell>
              <TableCell className="flex items-center">
                <div className="mr-4">:</div>
                <div>{detailData?.division}</div>
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
    </AdminTableLayout>
  )
}

export default DetailCompetition