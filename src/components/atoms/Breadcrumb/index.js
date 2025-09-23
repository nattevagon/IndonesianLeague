import Link from "next/link";
import { useRouter } from "next/router";
import React from 'react'

const Breadcrumb = ({ className, isHome, title }) => {
  const router = useRouter();
  const pathParts = router.asPath.split("?")[0].split("/").filter(Boolean);

  return (
    <div className={"breadcrumbs text-sm p-0 text-primary-black dark:text-primary-white overflow-hidden" + (className ? ` ${className}` : "")}>
      <ul>
        {isHome && (
          <li key="home">
            <Link href="/" className="capitalize">
              Home
            </Link>
          </li>
        )}

        {pathParts.map((part, idx) => {
          const href = "/" + pathParts.slice(0, idx + 1).join("/");
          const isLast = idx === pathParts.length - 1;

          return (
            <li key={href}>
              {isLast ? (
                <span className="font-semibold capitalize">
                  {title ?? part}
                </span>
              ) : (
                <Link href={href} className="capitalize">
                  {part}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumb