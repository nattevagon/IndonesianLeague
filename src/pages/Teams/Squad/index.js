import React from 'react'
import Image from "next/image"
import TeamsLayout from "@/components/molecules/TeamsLayout"

const Squad = () => {
  return (
    <TeamsLayout>
      <div className="text-white">
        <div className="mt-4">
          <div className="text-[32px] mb-4">Goalkeepers</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE6878.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/id.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">1</div>
                <div className="px-2">ANGGA .S</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">3</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">22</div>
              </div>
            </div>
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE1814747314.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/id.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">25</div>
                <div className="px-2">NADEO WINATA</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">20</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">28</div>
              </div>
            </div>
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE22188237.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/id.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">63</div>
                <div className="px-2">DAFFA FASYA</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">3</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">20</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-[32px] mb-4">Defenders</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE24062279.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/br.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">2</div>
                <div className="px-2">RONALDO</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">3</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">22</div>
              </div>
            </div>
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE24155703.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/br.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">5</div>
                <div className="px-2">G. FURTADO</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">20</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">28</div>
              </div>
            </div>
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE21037363.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/id.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">6</div>
                <div className="px-2">IKHSAN NUL</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">3</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">20</div>
              </div>
            </div>
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE21037363.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/id.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">6</div>
                <div className="px-2">IKHSAN NUL</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">3</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">20</div>
              </div>
            </div>
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE21037363.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/id.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">6</div>
                <div className="px-2">IKHSAN NUL</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">3</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">20</div>
              </div>
            </div>
            <div className="w-full hover:opacity-80 cursor-pointer">
              <div className="relative">
                <Image
                  className="w-full"
                  src={'https://assets.ligaindonesiabaru.com/uploads/images/player/PE21037363.png'}
                  width={200}
                  height={200}
                  alt="Player"
                />
                <Image
                  className="absolute top-2 right-2 border border-2"
                  src={'https://flagcdn.com/id.svg'}
                  width={40}
                  height={40}
                  alt="Player"
                />
              </div>

              <div className="bg-[#034C8C] w-full text-[24px] flex items-center">
                <div className="bg-white px-3 text-black">6</div>
                <div className="px-2">IKHSAN NUL</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Penampilan</div>
                <div className="px-2">3</div>
              </div>
              <div className="bg-[#262624] w-full text-[16px] flex items-center justify-between">
                <div className="px-2">Age</div>
                <div className="px-2">20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeamsLayout>
  )
}

export default Squad