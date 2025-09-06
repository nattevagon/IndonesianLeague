import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import React from 'react'

const Pagination = ({ data }) => {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const totalPages = data.totalPages;

  const goToPage = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  const renderPageNumbers = () => {
    let pages = [];

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => goToPage(1)}
        className={`text-primary-black dark:text-primary-white w-[40px] h-[40px] mx-[2px] flex items-center justify-center ${currentPage === 1 ? "bg-primary-white dark:bg-primary-black font-medium" : "bg-secondary-white dark:bg-secondary-black"}`}
      >
        1
      </button>
    );

    // Show dots if currentPage > 3
    if (currentPage > 3) {
      pages.push(
        <button key="dots-start" className="text-primary-black dark:text-primary-white bg-secondary-white dark:bg-secondary-black w-[40px] h-[40px] mx-[2px] flex items-center justify-center bg-third-white dark:bg-third-black">
          ...
        </button>
      );
    }

    // Show middle pages (around current page)
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`text-primary-black dark:text-primary-white w-[40px] h-[40px] mx-[2px] flex items-center justify-center ${currentPage === i ? "bg-primary-white dark:bg-primary-black font-medium" : "bg-secondary-white dark:bg-secondary-black"}`}
        >
          {i}
        </button>
      );
    }

    // Show dots if currentPage < totalPages - 2
    if (currentPage < totalPages - 2) {
      pages.push(
        <button key="dots-end" className="text-primary-black dark:text-primary-white bg-secondary-white dark:bg-secondary-black w-[40px] h-[40px] mx-[2px] flex items-center justify-center bg-third-white dark:bg-third-black">
          ...
        </button>
      );
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={`text-primary-black dark:text-primary-white w-[40px] h-[40px] mx-[2px] flex items-center justify-center ${currentPage === totalPages ? "bg-primary-white dark:bg-primary-black font-medium" : "bg-secondary-white dark:bg-secondary-black"}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center">
      {/* Previous button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={"bg-secondary-white dark:bg-secondary-black w-[40px] h-[40px] mx-[2px] flex items-center justify-center" + (currentPage === 1 ? " bg-third-white dark:bg-third-black font-medium" : "")}
      >
        <ChevronLeftIcon className="w-[16px] cursor-pointer text-primary-black dark:text-primary-white" />
      </button>

      {/* Page numbers */}
      {renderPageNumbers()}

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={"bg-secondary-white dark:bg-secondary-black w-[40px] h-[40px] mx-[2px] flex items-center justify-center" + (currentPage === totalPages ? " bg-third-white dark:bg-third-black font-medium" : "")}
      >
        <ChevronRightIcon className="w-[16px] cursor-pointer text-primary-black dark:text-primary-white" />
      </button>
    </div>
  );
};

export default Pagination;
