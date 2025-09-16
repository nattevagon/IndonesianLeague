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
import { useTeamActions } from "@/utils/admin/teamActions"

const TeamsTrash = () => {
  const router = useRouter();
  const { query, pathname } = router;
  // const [page, setPage] = useState(1);
  const backPath = pathname.split("/").slice(0, 3).join("/");
  const [filter, setFilter] = useState({
    competitionId: [
      { value: 0, label: "Liga 1", checked: false },
      { value: 1, label: "Liga 2", checked: false }
    ]
  })
  const [search, setSearch] = useState("");
  const [isLoadingPage, setLoadingPage] = useState(false);
  const [teamsData, setTeamsData] = useState([])
  const [teamsDataPagination, setTeamsDataPagination] = useState({});
  const adminPath = pathname.split("/").slice(0, 2).join("/");
  const { handleHardDelete, handleRestore } = useTeamActions(router);

  useEffect(() => {
    const currentPage = query?.page || 1;
    const currentSearch = query?.search || '';
    const currentCompetitionId = query?.competition_id || '';

    setSearch(currentSearch);
    handleInitialsFilter(currentCompetitionId);

    handleGetData(currentPage, currentSearch, currentCompetitionId)
  }, [query?.page, query?.search, query?.competition_id]);

  const handleGetData = (currentPage, currentSearch, currentCompetitionId) => {
    setLoadingPage(true);
    Services(process.env.NEXT_PUBLIC_LOCAL_SERVICE)
      .get(
        `/api/get/teams/trash?limit=10&page=${currentPage}` +
        (currentSearch ? `&search=${currentSearch}` : '') +
        (currentCompetitionId ? `&competition_id=${currentCompetitionId}` : '')
      )
      .then((res) => {
        setTeamsData(res.data.data);
        setTeamsDataPagination(res.data.pagination);
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

  const handleInitialsFilter = (queryCompetitionId) => {
    if (queryCompetitionId) {
      const selectedCompetitionId = queryCompetitionId
        .split(",")
        .map((v) => Number(v));

      setFilter((prev) => ({
        ...prev,
        competitionId: prev.competitionId.map((r) => ({
          ...r,
          checked: selectedCompetitionId.includes(r.value),
        })),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        competitionId: prev.competitionId.map((r) => ({ ...r, checked: false })),
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
    const competitionId = filter.competitionId.filter(r => r.checked).map(r => r.value).join(",");

    router.replace({
      pathname,
      query: {
        ...query,
        competition_id: competitionId,
      },
    });
  }

  const handleResetFilter = () => {
    const newQuery = { ...router.query };
    delete newQuery.competition_id;

    router.replace({
      pathname: pathname,
      query: newQuery,
    });
  }

  console.log('Router=> ', router, teamsData)

  return (
    <AdminTableLayout
      isLoadingPage={isLoadingPage}
      dataPagination={teamsDataPagination}
      title="Teams Trash"
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
            <TableHeaderCell>Short</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>Founded</TableHeaderCell>
            <TableHeaderCell>Competition</TableHeaderCell>
            <TableHeaderCell className="text-center">Division</TableHeaderCell>
            <TableHeaderCell>Coach</TableHeaderCell>
            <TableHeaderCell className="text-center">Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamsData && teamsData.length > 0 ? (
            teamsData?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="hover:underline">
                  <Link
                    className="p-[4px]"
                    href={`${router.pathname}/${item.id}`}
                  >
                    {item.team_name}
                  </Link>
                </TableCell>
                <TableCell>{item.short_name}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.founded_year}</TableCell>
                <TableCell className="hover:underline">
                  <Link
                    className="p-[4px]"
                    href={`${adminPath}/competitions/${item.competition_id}`}
                  >
                    {item.competition_name}
                  </Link>
                </TableCell>
                <TableCell className="flex items-center justify-center">{item.division}</TableCell>
                <TableCell>{item.coach_name}</TableCell>
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
              <TableCell colspan={8} className="text-center py-6">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </AdminTableLayout>
  )
}

export default TeamsTrash