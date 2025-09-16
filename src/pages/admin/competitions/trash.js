import React, { useEffect, useState } from 'react'
import { Services } from "@/service"
import { ArrowLeftStartOnRectangleIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout"
import {
  AdminDropdownButton,
  AdminDropdownContent,
  AdminDropdownItem,
  AdminDropdownMenu
} from "@/components/admin/molecules/AdminDropdownMenu"
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/admin/atoms/Table"
import { useCompetitionActions } from "@/utils/admin/competitionActions"

const CompetitionsTrash = () => {
  const router = useRouter();
  const { query, pathname } = router;
  // const [page, setPage] = useState(1);
  const backPath = pathname.split("/").slice(0, 3).join("/");
  const [filter, setFilter] = useState({
    isPublish: [
      { value: 0, label: "False", checked: false },
      { value: 1, label: "True", checked: false }
    ]
  })
  const [search, setSearch] = useState("");
  const [isLoadingPage, setLoadingPage] = useState(false);
  const [competitionsData, setCompetitionsData] = useState([])
  const [competitionsDataPagination, setCompetitionsDataPagination] = useState({});
  const { handleIsPublish, handleHardDelete, handleRestore } = useCompetitionActions(router);

  useEffect(() => {
    const currentPage = query?.page || 1;
    const currentSearch = query?.search || '';
    const currentIsPublish = query?.is_publish || '';

    setSearch(currentSearch);
    handleInitialsFilter(currentIsPublish);

    handleGetData(currentPage, currentSearch, currentIsPublish)
  }, [query?.page, query?.search, query?.is_publish]);

  const handleGetData = (currentPage, currentSearch, currentIsPublish) => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get(
        `/api/get/competitions/trash?limit=10&page=${currentPage}` +
        (currentSearch ? `&search=${currentSearch}` : '') +
        (currentIsPublish ? `&is_publish=${currentIsPublish}` : '')
      )
      .then((res) => {
        setCompetitionsData(res.data.data);
        setCompetitionsDataPagination(res.data.pagination);
      })
      .catch(console.error)
      .finally(() => setLoadingPage(false));
  }

  const handleSearch = (search) => {
    router.replace({
      pathname,
      query: {
        ...query,
        search,
      },
    });
  };

  const handleInitialsFilter = (queryIsPublish) => {
    if (queryIsPublish) {
      const selectedIsPublish = queryIsPublish
        .split(",")
        .map((v) => Number(v));

      setFilter((prev) => ({
        ...prev,
        isPublish: prev.isPublish.map((r) => ({
          ...r,
          checked: selectedIsPublish.includes(r.value),
        })),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        isPublish: prev.isPublish.map((r) => ({ ...r, checked: false })),
      }));
    }
  }

  const handleFilter = (name, value, checked) => {
    setFilter((prev) => ({
      ...prev,
      [name]: prev[name].map((r) =>
        r.value === value ? { ...r, checked } : r
      ),
    }));
  };

  const handleSubmitFilter = () => {
    const isPublish = filter.isPublish.filter(r => r.checked).map(r => r.value).join(",");

    router.replace({
      pathname,
      query: {
        ...query,
        is_publish: isPublish,
      },
    });
  }

  const handleResetFilter = () => {
    const newQuery = { ...router.query };
    delete newQuery.is_publish;

    router.replace({
      pathname: pathname,
      query: newQuery,
    });
  }

  console.log('Router=> ', router)

  return (
    <AdminTableLayout
      isLoadingPage={isLoadingPage}
      dataPagination={competitionsDataPagination}
      title="Competitions Trash"
      type="trash"
      search={search}
      filter={filter}
      onSearch={(value) => setSearch(value)}
      onSubmitSearch={() => handleSearch(search)}
      onFilter={(name, value, item) => handleFilter(name, value, item)}
      onSubmitFilter={() => handleSubmitFilter()}
      onResetFilter={() => handleResetFilter()}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Division</TableHeaderCell>
            <TableHeaderCell>Is Publish</TableHeaderCell>
            <TableHeaderCell className="text-center">Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {competitionsData && competitionsData.length > 0 ? (
            competitionsData?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="hover:underline">
                  <Link
                    className="p-[4px]"
                    href={`${backPath}/${item.id}`}
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.division}</TableCell>
                <TableCell>{handleIsPublish(item.is_publish).name}</TableCell>
                <TableCell className="flex items-center justify-center">
                  <AdminDropdownMenu
                    position="dropdown-left dropdown-center"
                  >
                    <AdminDropdownButton>
                      <EllipsisVerticalIcon className="w-[20px] cursor-pointer text-primary-black dark:text-primary-white" />
                    </AdminDropdownButton>
                    <AdminDropdownContent type="menu" menuClassName="bg-primary-blue">
                      <AdminDropdownItem
                        icon={ArrowLeftStartOnRectangleIcon}
                        label="Restore"
                        onClick={() => handleRestore(item.id, () => {
                          router.reload();
                        })}
                      />
                      <AdminDropdownItem
                        icon={TrashIcon}
                        label="Delete Permanently"
                        onClick={() => handleHardDelete(item.id, () => {
                          router.reload();
                        })}
                      />
                    </AdminDropdownContent>
                  </AdminDropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colspan={5} className="text-center py-6">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </AdminTableLayout>
  )
}

export default CompetitionsTrash