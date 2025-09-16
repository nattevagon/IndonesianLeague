import React, { useEffect, useState } from 'react'
import { Services } from "@/service"
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
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
import { useUserActions } from "@/utils/admin/userActions"
import Loading from "@/components/atoms/Loading"

const Users = () => {
  const router = useRouter();
  const { query, pathname } = router;
  // const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    role: [
      { value: 0, label: "User", checked: false },
      { value: 1, label: "Admin", checked: false },
      { value: 2, label: "Super Admin", checked: false }
    ]
  })
  const [search, setSearch] = useState("");
  const [isLoadingPage, setLoadingPage] = useState(false);
  const [usersData, setUsersData] = useState([])
  const [usersDataPagination, setUsersDataPagination] = useState({});
  const { handleSoftDelete, handleRole } = useUserActions(router);

  useEffect(() => {
    const currentPage = query?.page || 1;
    const currentSearch = query?.search || '';
    const currentRoles = query?.roles || '';

    setSearch(currentSearch);
    handleInitialsFilter(currentRoles);

    handleGetData(currentPage, currentSearch, currentRoles)
  }, [query?.page, query?.search, query?.roles]);

  const handleGetData = (currentPage, currentSearch, currentRoles) => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get(
        `/api/get/users?limit=10&page=${currentPage}` +
        (currentSearch ? `&search=${currentSearch}` : '') +
        (currentRoles ? `&roles=${currentRoles}` : '')
      )
      .then((res) => {
        setUsersData(res.data.data);
        setUsersDataPagination(res.data.pagination);
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

  const handleInitialsFilter = (queryRoles) => {
    if (queryRoles) {
      const selectedRoles = queryRoles
        .split(",")
        .map((v) => Number(v));

      setFilter((prev) => ({
        ...prev,
        role: prev.role.map((r) => ({
          ...r,
          checked: selectedRoles.includes(r.value),
        })),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        role: prev.role.map((r) => ({ ...r, checked: false })),
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
    const roles = filter.role.filter(r => r.checked).map(r => r.value).join(",");

    router.replace({
      pathname,
      query: {
        ...query,
        roles,
      },
    });
  }

  const handleResetFilter = () => {
    const newQuery = { ...router.query };
    delete newQuery.roles;

    router.replace({
      pathname: pathname,
      query: newQuery,
    });
  }

  console.log('Router=> ', router)

  return (
    <AdminTableLayout
      isLoadingPage={isLoadingPage}
      dataPagination={usersDataPagination}
      title="Users List"
      type="list"
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
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Phone</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell className="text-center">Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData && usersData.length > 0 ? (
            usersData?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="hover:underline">
                  <Link
                    className="p-[4px]"
                    href={`${router.pathname}/${user.id}`}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{handleRole(user.role).name}</TableCell>
                <TableCell className="flex items-center justify-center">
                  <AdminDropdownMenu
                    position="dropdown-left dropdown-center"
                  >
                    <AdminDropdownButton>
                      <EllipsisVerticalIcon className="w-[20px] cursor-pointer text-primary-black dark:text-primary-white" />
                    </AdminDropdownButton>
                    <AdminDropdownContent type="menu" menuClassName="bg-primary-blue">
                      <AdminDropdownItem
                        icon={PencilSquareIcon}
                        label="Update"
                        linkUrl={`${router.pathname}/${user.id}/update`}
                      />
                      <AdminDropdownItem
                        icon={TrashIcon}
                        label="Move to Trash"
                        onClick={() => handleSoftDelete(user.id, () => {
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
              <TableCell colspan={6} className="text-center py-6">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </AdminTableLayout>
  )
}

export default Users