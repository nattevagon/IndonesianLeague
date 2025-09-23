import React, { useState } from 'react'
import Footer from "@/components/molecules/Footer";
import NavigationSection from "@/components/molecules/NavigationSection";

const MainLayout = ({ children }) => {
  const [isTopTeamsList, setTopTeamsList] = useState(true)

  return (
    <div className="">
      <NavigationSection
        isTopTeamsList={isTopTeamsList}
        onSetTopTeamsList={(value) => setTopTeamsList(value)}
      />
      <div className={isTopTeamsList ? "" : "pt-[58px] lg:pt-[64px]"}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout