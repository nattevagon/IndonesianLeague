import { useState } from "react";
import Footer from "@/components/molecules/Footer";
import NavigationSection from "@/components/molecules/NavigationSection";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [isTopTeamsList, setTopTeamsList] = useState(true)

  return (
    <div>
      <NavigationSection
        isTopTeamsList={isTopTeamsList}
        onSetTopTeamsList={(value) => setTopTeamsList(value)}
      />
      <div className={isTopTeamsList ? "" : "lg:pt-[64px]"}>
        <Component
          {...pageProps}
        />
      </div>
      <Footer />
    </div>
  );
}
