import ThemeToggle from "@/components/molecules/ThemeToggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { useRouter } from "next/router";
import React, { useEffect } from 'react'

const AdminSidebar = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      const drawer = document.getElementById("admin-sidebar");
      if (drawer) drawer.checked = false;
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="bg-primary-blue p-4 block lg:hidden">
          <label htmlFor="admin-sidebar" className="drawer-button">
            <Bars3Icon
              className="w-[2rem] lg:hidden h-[2rem] cursor-pointer text-primary-white"
            />
          </label>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <div className="menu bg-primary-blue w-full h-screen p-0">
          <div className="p-4 block lg:hidden">
            <label htmlFor="admin-sidebar" className="drawer-button">
              <XMarkIcon
                className="w-[2rem] lg:hidden h-[2rem] cursor-pointer text-primary-white"
              />
            </label>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="text-primary-white text-[28px] font-medium flex items-center gap-4">
              <img
                src="https://assets.ligaindonesiabaru.com/uploads/images/logo/logo-color-ver.png"
                alt="I-League"
                className="w-[40px] h-auto brightness-0 invert"
              />
              Admin
            </div>
            <ThemeToggle />
          </div>
          <ul className="text-base-content w-full lg:w-80 p-4">
            <li className="text-primary-white text-[16px] w-full">
              <Link
                className="w-full p-4"
                href={'/admin'}
              >
                Dashboard
              </Link>
            </li>
            <li className="text-primary-white text-[16px] w-full">
              <Link
                className="w-full p-4"
                href={'/admin/users'}
              >
                Users
              </Link>
            </li>
             <li className="text-primary-white text-[16px] w-full">
              <Link
                className="w-full p-4"
                href={'/admin/news'}
              >
                News
              </Link>
            </li>
            <li className="text-primary-white text-[16px] w-full">
              <Link
                className="w-full p-4"
                href={'/admin/competitions'}
              >
                Competitions
              </Link>
            </li>
            <li className="text-primary-white text-[16px] w-full">
              <Link
                className="w-full p-4"
                href={'/admin/players'}
              >
                Players
              </Link>
            </li>
            <li className="text-primary-white text-[16px] w-full">
              <Link
                className="w-full p-4"
                href={'/admin/teams'}
              >
                Teams
              </Link>
            </li>
            <li className="text-primary-white text-[16px] w-full">
              <Link
                className="w-full p-4"
                href={'/admin/matches'}
              >
                Matches
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar