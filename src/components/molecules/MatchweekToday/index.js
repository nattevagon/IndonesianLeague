import { Services } from "@/service";
import Image from "next/image"
import React, { useEffect, useState } from 'react'
const moment = require("moment");
require("moment/locale/en-gb");

const MatchweekToday = () => {
  const [matchWeekData, setMatchWeekData] = useState();

  useEffect(() => {
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get("/api/get/matches/competition/1/?match_day=" + 1)
      .then((res) => {
        const result = res.data;
        const data = result.data;

        setMatchWeekData(data)
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [])

  return (
    matchWeekData && (
      <div>
        <div className="bg-primary-blue text-primary-black dark:text-primary-white text-[28px] font-medium text-center p-2">Matchweek {matchWeekData?.match_day}</div>
        <div className="text-center bg-[#262624]">
          <div className="text-xs py-1 pt-2 border-b-[1px] border-[#161616]">All times shown are your local time</div>
          {matchWeekData?.dates.map((dates, i) => (
            <div key={i}>
              <div className="text-lg py-1 mb-1">{moment(dates?.date).format("dddd, D MMMM YYYY")}</div>
              {dates?.matches.map((match, j) => (
                <div className="flex items-center text-center justify-center py-2 hover:bg-[#161616] border-y-[1px] border-[#161616]" key={j}>
                  <div className="text-lg font-medium text-primary-black dark:text-primary-white">{match?.home_team_short}</div>
                  <Image
                    className="mx-2"
                    src={match?.home_team_logo}
                    alt="Team"
                    width={32}
                    height={32}
                  />
                  <div className="bg-gradient-to-r from-[#001A6E] to-[#C62E2E] text-lg font-bold py-1 px-2 rounded-lg">{match?.home_team_score} - {match?.away_team_score}</div>
                  <Image
                    className="mx-2"
                    src={match?.away_team_logo}
                    alt="Team"
                    width={32}
                    height={32}
                  />
                  <div className="text-lg font-medium text-primary-black dark:text-primary-white">{match.away_team_short}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ))
}

export default MatchweekToday