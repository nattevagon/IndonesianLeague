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

const Users = () => {
  const router = useRouter();
  const { query } = router;
  const [page, setPage] = useState(1)
  const [usersData, setUsersData] = useState([])
  const [usersDataPagination, setUsersDataPagination] = useState({})
  const { handleSoftDelete, handleRole } = useUserActions(router);

  useEffect(() => {
    const currentPage = query?.page || 1;
    setPage(currentPage)
    console.log('CURRENT ', currentPage)

    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get("/api/get/users?limit=10&page=" + currentPage)
      .then((res) => {
        const result = res.data;
        const data = result.data;
        const dataPagination = result.pagination;

        setUsersData(data)
        setUsersDataPagination(dataPagination)
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [query?.page])

  console.log(router)

  return (
    <AdminTableLayout
      dataPagination={usersDataPagination}
      title="Users List"
      type="list"
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
          {usersData && usersData?.map((user, i) => (
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
                <AdminDropdownMenu>
                  <AdminDropdownButton>
                    <EllipsisVerticalIcon className="w-[20px] cursor-pointer text-primary-black dark:text-primary-white" />
                  </AdminDropdownButton>
                  <AdminDropdownContent>
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
          ))}
        </TableBody>
      </Table>
    </AdminTableLayout>
  )
}

export default Users