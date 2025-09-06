import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Services } from "@/service";

const TeamsLayout = ({ children }) => {
  const [teamDetail, setTeamDetail] = useState();

  useEffect(() => {
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get("/api/get/teams/" + 8)
      .then((res) => {
        const result = res.data;
        const data = result.data;

        setTeamDetail(data)
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [])

  return (
    <div>
      <div className="container bg-gradient-to-r from-[#ff7701] to-[#262624] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
        <div className="flex items-center">
          <Image
            src={'https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/192.png'}
            width={200}
            height={200}
            alt="Club"
          />
          <div className="text-primary-black dark:text-primary-white">
            <div className="font-bold text-[40px]">{teamDetail?.name}</div>
            <div className="text-[16px]">Est. {teamDetail?.founded_year} - {teamDetail?.city}</div>
          </div>
        </div>
        <div className="py-4">
          <Image
            className="w-full"
            src={'https://assets.ligaindonesiabaru.com/uploads/images/club/lineup_BORNEO_FC_SAMARINDA_1731051150.jpg'}
            width={200}
            height={200}
            alt="Gallery"
          />
        </div>
      </div>
      <div className="container bg-[#161616] py-8">
        <div className="flex items-center gap-4">
          <Link href={'/teams'}>
            <div className="bg-white py-2 px-4 flex items-center text-black hover:opacity-80">Overview</div>
          </Link>
          <Link href={'/teams/squad'}>
            <div className="bg-white py-2 px-4 flex items-center text-black hover:opacity-80">Squad</div>
          </Link>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default TeamsLayout