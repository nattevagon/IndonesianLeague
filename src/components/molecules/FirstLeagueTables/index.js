import React, { useEffect, useState } from 'react'
import { Services } from "@/service";
import Image from "next/image"

const FirstLeagueTables = () => {
	const [tablesData, setTablesData] = useState([])

	useEffect(() => {
		Services('http://localhost:7001')
			.get(`/api/first-league/tables`)
			.then((getResponse) => {
				const response = getResponse.data
				setTablesData(response)
			})
			.catch((error) => { });
	}, [])

	return (
		<div className="z-[0]">
			<div className="bg-[#034C8C] text-white text-[28px] font-medium text-center p-2">BRI Liga 1 Tables</div>
			<div className="overflow-x-hidden bg-[#262624]">
				<table className="table">
					<thead className="border-b-[1px] border-[#161616]">
						<tr>
							<th></th>
							<th>Club</th>
							<th>M</th>
							<th>Pts</th>
						</tr>
					</thead>
					<tbody>
						{tablesData.length > 0 && (
							tablesData.map((item, i) => (
								<tr className="border-y-[2px] border-[#161616]" key={i}>
									<th>{item.position}</th>
									<td>
										<div className="flex items-center">
											<Image
												className="mx-2"
												src={item.logo}
												alt="Team"
												width={28}
												height={28}
											/>
											<div className="hidden md:inline">{item.club}</div>
											<div className="md:hidden">{item.code}</div>
										</div>
									</td>
									<td>{item.matches}</td>
									<td>{item.points}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default FirstLeagueTables