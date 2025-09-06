import Image from "next/image"
import React, { useEffect, useState } from 'react'
import TeamsLayout from "@/components/molecules/TeamsLayout"
import { Services } from "@/service"

const Teams = ({ teamDetail }) => {
  console.log('Index', teamDetail)

  return (
    <TeamsLayout>
      <div className="mt-4">
        Overview
      </div>
    </TeamsLayout>
  )
}

export default Teams