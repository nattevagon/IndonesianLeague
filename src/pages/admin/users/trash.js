import React, { useEffect, useState } from 'react'
import AdminTableLayout from "@/components/admin/molecules/AdminTableLayout"
import { Services } from "@/service"
import useModalStore from "@/store/useModalStore"
import { ArrowLeftStartOnRectangleIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  AdminDropdownMenu,
  AdminDropdownButton,
  AdminDropdownContent,
  AdminDropdownItem
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
  const { query, pathname } = router;
  const { openModal, closeModal, setLoading } = useModalStore();
  const backPath = pathname.split("/").slice(0, 3).join("/");
  const [page, setPage] = useState(1)
  const [usersData, setUsersData] = useState([])
  const [usersDataPagination, setUsersDataPagination] = useState({})
  const { handleRestore, handleHardDelete, handleRole } = useUserActions(router);

  useEffect(() => {
    getData(query?.page)
  }, [query?.page, router])

  const getData = (queryPage) => {
    const currentPage = queryPage || 1;
    setPage(currentPage)
    console.log('CURRENT ', currentPage)

    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get("/api/get/users/trash/?limit=10&page=" + currentPage)
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
  }

  console.log(router)

  return (
    <AdminTableLayout
      dataPagination={usersDataPagination}
      title="Users Trash List"
      type="trash"
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
                  href={`${backPath}/${user.id}`}
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
                      icon={ArrowLeftStartOnRectangleIcon}
                      label="Restore"
                      onClick={() => handleRestore(user.id, () => {
                        router.reload();
                      })}
                    />
                    <AdminDropdownItem
                      icon={TrashIcon}
                      label="Delete Permanently"
                      onClick={() => handleHardDelete(user.id, () => {
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