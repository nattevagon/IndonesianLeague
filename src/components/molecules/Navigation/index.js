import React, { useEffect, useState } from 'react'
import Modal from "@/components/atoms/Modal"
import Image from "next/image"
import Link from "next/link"
import { Bars3Icon } from "@heroicons/react/20/solid"

function Navigation() {
  const clubs = [
    {
      "pathname": "arema",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/32.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "baliutd",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/71.png",
      "url": ""
    },
    {
      "pathname": "barito",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/133.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "borneo",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/192.png",
      "url": "http://www.borneofc.id/"
    },
    {
      "pathname": "dewautd",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/209.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "madurautd",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/40.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "malututd",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/1819851379.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "persebaya",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/280.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "persib",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/11.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "persija",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/12.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "persik",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/37.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "persis",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/67.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "persita",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/15.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "psbs",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/181.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "psis",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/20.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "psm",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/50.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "pss",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/23.png",
      "url": "http://www.aremafc.com/"
    },
    {
      "pathname": "semen-padang",
      "logo": "https://assets.ligaindonesiabaru.com/uploads/images/logo/81/h/50/5.png",
      "url": "http://www.aremafc.com/"
    }
  ]
  const [isTopTeamsList, setTopTeamsList] = useState(true)
  const [isLoginModal, setLoginModal] = useState(false);

  useEffect(() => {
    const element = document.querySelector('#topTeamsList');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setTopTeamsList(false)
          console.log('Element is NOT visible in the viewport');
        } else {
          setTopTeamsList(true)
          console.log('Element is visible in the viewport');
        }
      });
    });

    observer.observe(element);
  }, [])

  return (
    <div className="w-full">
      <div id="topTeamsList" className="bg-[#262624] w-full h-16 hidden lg:flex items-center justify-center hidden">
        {clubs.map(item => (
          <Link
            href={item.url}
            className="mx-2 flex justify-center items-center"
          >
            <Image
              className="w-[32px] h-[32px] hover:w-[40px] hover:h-[40px] transition-all duration-100 ease-in-out"
              src={item.logo}
              alt="Club"
              width={40}
              height={40}
            />
          </Link>
        ))}
      </div>
      <div className={"bg-[#034C8C] w-full z-[2]" + (isTopTeamsList ? '' : ' fixed top-0')}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <Image
              className={"invert brightness-0 mb-2 mr-4" + (isTopTeamsList ? ' mt-[-50px] w-[68px] drop-shadow-[0_1px_4px_rgba(0,0,1,1)]' : ' mt-2 w-[40px]') + " transition-all duration-100 ease-in-out"}
              src={'https://assets.ligaindonesiabaru.com/assets/img/competition-logo/81.png'}
              width={100}
              height={100}
              alt="LeagueLogo"
            />
            <div className="hidden lg:flex text-white py-4">
              <Link
                href={'/'}
                className="mx-2 text-[18px]"
              >
                Home
              </Link>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="mx-2 text-[18px]">Competition</div>
                <div tabIndex={0} className="dropdown-content menu z-[2] left-1/2 -translate-x-1/2">
                  <ul className="bg-[#262624] w-52 mt-2 shadow relative before:absolute before:content-[''] before:block before:border-[8px] before:border-transparent before:border-b-[#262624] before:top-[-16px] before:left-1/2 before:-ml-2">
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">BRI Liga 1</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">Pegadaian Liga 2</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">PNM Liga 3</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">Liga 4</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">Piala Indonesia</div>
                    </Link>
                  </ul>
                </div>
              </div>
              <Link
                href={'/Schedule'}
                className="mx-2 text-[18px]"
              >
                Schedule
              </Link>
              <Link
                href={'/Tables'}
                className="mx-2 text-[18px]"
              >
                Tables
              </Link>
              <Link
                href={'/Teams'}
                className="mx-2 text-[18px]"
              >
                Teams
              </Link>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="mx-2 text-[18px]">News</div>
                <div tabIndex={0} className="dropdown-content menu z-[2] left-1/2 -translate-x-1/2">
                  <ul className="bg-[#262624] w-52 mt-2 shadow relative before:absolute before:content-[''] before:block before:border-[8px] before:border-transparent before:border-b-[#262624] before:top-[-16px] before:left-1/2 before:-ml-2">
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">News List</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">Release</div>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="mx-2 text-[18px]">Development</div>
                <div tabIndex={0} className="dropdown-content menu z-[2] left-1/2 -translate-x-1/2">
                  <ul className="bg-[#262624] w-52 mt-2 shadow relative before:absolute before:content-[''] before:block before:border-[8px] before:border-transparent before:border-b-[#262624] before:top-[-16px] before:left-1/2 before:-ml-2">
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">U20 Liga 1</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">U-18 Liga 1</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">U-16 Liga 1</div>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="mx-2 text-[18px]">Others</div>
                <div tabIndex={0} className="dropdown-content menu z-[2] left-1/2 -translate-x-1/2">
                  <ul className="bg-[#262624] w-52 mt-2 shadow relative before:absolute before:content-[''] before:block before:border-[8px] before:border-transparent before:border-b-[#262624] before:top-[-16px] before:left-1/2 before:-ml-2">
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">Gallery</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">Stats</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">Publish</div>
                    </Link>
                    <Link
                      href={'/'}
                    >
                      <div className="w-full p-4 hover:bg-[#161616]">History</div>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Bars3Icon
              onClick={() => setLoginModal(true)}
              className="w-[2rem] lg:hidden h-[2rem] cursor-pointer text-white"
            />
            {/* <Image
              className={"invert brightness-0 mb-2 ml-4" + (isTopTeamsList ? ' mt-[-50px] w-[68px] drop-shadow-[0_1px_4px_rgba(0,0,1,1)]' : ' mt-2 w-[40px]') + " transition-all duration-100 ease-in-out"}
              src={'https://assets.ligaindonesiabaru.com/uploads/images/logo/lib-2022.png'}
              width={100}
              height={100}
              alt="LeagueLogo"
            /> */}
          </div>
        </div>
      </div>
      <Modal isOpen={isLoginModal} onClose={() => setLoginModal(false)}>
        <button
          onClick={() => setLoginModal(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close Modal
        </button>
      </Modal>
    </div>
  )
}

export default Navigation