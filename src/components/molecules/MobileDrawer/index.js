import React from 'react'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

const NavigationDrawer = () => {
  return (
    <div className="drawer drawer-end w-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button">
          <Bars3Icon
            className="w-[2rem] lg:hidden h-[2rem] cursor-pointer text-primary-black dark:text-primary-white"
          />
        </label>
      </div>
      <div className="drawer-side z-[2]">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-primary-blue text-primary-black dark:text-primary-white min-h-full w-full p-0 md:w-[500px]">
          <div className="container p-4 flex justify-between gap-4">
            <ul className="w-full">
              <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                <Link
                  className="w-full p-4"
                  href={'/'}
                >
                  Home
                </Link>
              </li>
              <div className="collapse text-primary-black dark:text-primary-white text-[16px] w-full">
                <input type="checkbox" />
                <div className="collapse-title min-h-fit h-min">Competition</div>
                <ul className="collapse-content p-0 pl-4">
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      BRI Liga 1
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      Pegadaian Liga 2
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      PNM Liga 3
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      Liga 4
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      Piala Indonesia
                    </Link>
                  </li>
                </ul>
              </div>
              <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                <Link
                  className="w-full p-4"
                  href={'/'}
                >
                  Schedule
                </Link>
              </li>
              <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                <Link
                  className="w-full p-4"
                  href={'/'}
                >
                  Tables
                </Link>
              </li>
              <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                <Link
                  className="w-full p-4"
                  href={'/'}
                >
                  Teams
                </Link>
              </li>
              <div className="collapse text-primary-black dark:text-primary-white text-[16px] w-full">
                <input type="checkbox" />
                <div className="collapse-title min-h-fit h-min">News</div>
                <ul className="collapse-content p-0 pl-4">
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/news'}
                    >
                      News
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/gallery'}
                    >
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="collapse text-primary-black dark:text-primary-white text-[16px] w-full">
                <input type="checkbox" />
                <div className="collapse-title min-h-fit h-min">Development</div>
                <ul className="collapse-content p-0 pl-4">
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      U20 Liga 1
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      U18 Liga 1
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      U16 Liga 1
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="collapse text-primary-black dark:text-primary-white text-[16px] w-full">
                <input type="checkbox" />
                <div className="collapse-title min-h-fit h-min">Others</div>
                <ul className="collapse-content p-0 pl-4">
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      Gallery
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      Stats
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      Publish
                    </Link>
                  </li>
                  <li className="text-primary-black dark:text-primary-white text-[16px] w-full">
                    <Link
                      className="w-full p-4"
                      href={'/'}
                    >
                      History
                    </Link>
                  </li>
                </ul>
              </div>
            </ul>
            <label htmlFor="my-drawer-4" className="drawer-button pt-2">
              <XMarkIcon
                className="w-[2rem] lg:hidden h-[2rem] cursor-pointer text-primary-black dark:text-primary-white"
              />
            </label>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationDrawer