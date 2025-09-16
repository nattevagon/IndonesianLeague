import React, { useState } from 'react'
import Pagination from "@/components/atoms/Pagination"
import { useRouter } from "next/router";
import { ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon, ArrowPathIcon, PencilIcon, TrashIcon, FunnelIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/20/solid"
import Breadcrumb from "@/components/atoms/Breadcrumb";
import Button from "@/components/atoms/Button";
import Loading from "@/components/atoms/Loading";
import TextField from "@/components/atoms/TextField";
import { AdminDropdownButton, AdminDropdownContent, AdminDropdownMenu } from "../AdminDropdownMenu";
import CheckboxField from "@/components/atoms/CheckboxField";

const AdminTableLayout = ({
  children,
  data,
  title,
  type,
  dataPagination,
  isLoadingPage,
  search,
  filter,
  onCreate,
  onUpdate,
  onRestore,
  onSoftDelete,
  onHardDelete,
  onSearch,
  onSubmitSearch,
  onFilter,
  onSubmitFilter,
  onResetFilter
}) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleFilter = (event, value) => {
    const name = event.target.name;
    const checked = event.target.checked;

    onFilter(name, value, checked);
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="min-w-[260px] mr-4">
          <div className="text-black dark:text-primary-black dark:text-primary-white text-[28px] font-medium w-full">{title}</div>
          <div className="mt-2">
            <Breadcrumb />
          </div>
        </div>
        <div className="flex justify-end items-end gap-4 w-full">
          {(type === 'list' || type === 'trash') && (
            <div className="flex items-center gap-4">
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmitSearch(search);
                }}
              >
                <TextField
                  className="w-full bg-transparent p-2 h-[40px]"
                  type="text"
                  placeholder="Search a Item"
                  name="search"
                  onChange={(event) => onSearch(event.target.value)}
                  value={search || ""}
                />
                <Button
                  icon={MagnifyingGlassIcon}
                />
              </form>
              <AdminDropdownMenu
                position="dropdown-bottom dropdown-end"
              >
                <AdminDropdownButton>
                  <Button
                    icon={FunnelIcon}
                  />
                </AdminDropdownButton>
                <AdminDropdownContent className="bg-secondary-white dark:bg-secondary-black p-4 mt-2 min-w-[200px] border border-third-white dark:border-third-black text-primary-black dark:text-primary-white">
                  {filter && filter?.role &&
                    <div className="">
                      <p className="mb-2 font-medium">Role</p>
                      <div className="flex flex-col gap-2">
                        {filter?.role.map((item, i) => (
                          <CheckboxField
                            key={i}
                            name="role"
                            label={item.label}
                            value={item.value}
                            checked={item.checked}
                            onChange={(event) => handleFilter(event, item.value)}
                          />
                        ))}
                      </div>
                    </div>
                  }
                  {filter && filter?.isPublish &&
                    <div className="">
                      <p className="mb-2 font-medium">Is Publish</p>
                      <div className="flex flex-col gap-2">
                        {filter?.isPublish.map((item, i) => (
                          <CheckboxField
                            key={i}
                            name="isPublish"
                            label={item.label}
                            value={item.value}
                            checked={item.checked}
                            onChange={(event) => handleFilter(event, item.value)}
                          />
                        ))}
                      </div>
                    </div>
                  }
                  {filter && filter?.competitionId &&
                    <div className="">
                      <p className="mb-2 font-medium">Competition</p>
                      <div className="flex flex-col gap-2">
                        {filter?.competitionId.map((item, i) => (
                          <CheckboxField
                            key={i}
                            name="competitionId"
                            label={item.label}
                            value={item.value}
                            checked={item.checked}
                            onChange={(event) => handleFilter(event, item.value)}
                          />
                        ))}
                      </div>
                    </div>
                  }
                  <div className="flex items-center gap-4 justify-between mt-4">
                    <Button
                      className="w-full"
                      labelClassName="w-full"
                      onClick={() => onSubmitFilter()}
                      label="Filter"
                    />
                    <Button
                      className="w-full"
                      labelClassName="w-full"
                      onClick={() => onResetFilter()}
                      label="Reset"
                    />
                  </div>
                </AdminDropdownContent>
              </AdminDropdownMenu>

            </div>
          )}
          {(type === 'detail' || type === 'update') && data.is_deleted === 0 && (
            <Button
              onClick={() => onSoftDelete()}
              icon={TrashIcon}
              label="Move to Trash"
              labelClassName="hidden lg:block"
            />
          )}
          {(type === 'detail' || type === 'update') && data.is_deleted === 1 && (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => onRestore()}
                icon={ArrowLeftStartOnRectangleIcon}
                label="Restore"
                labelClassName="hidden lg:block"
              />
              <Button
                onClick={() => onHardDelete()}
                icon={TrashIcon}
                label="Delete Permanently"
                labelClassName="hidden lg:block"
              />
            </div>
          )}
          {type === 'detail' && (
            <Button
              href={`${asPath}/update`}
              icon={PencilIcon}
              label="Update"
              labelClassName="hidden lg:block"
            />
          )}
          {type === 'list' && (
            <Button
              href={`${pathname}/trash`}
              icon={ArchiveBoxIcon}
              label="Trash"
              labelClassName="hidden lg:block"
            />
          )}
          {type === 'list' && (
            <Button
              href={`${pathname}/create`}
              icon={PlusIcon}
              label="Create"
              labelClassName="hidden lg:block"
            />
          )}
          {type === 'create' && (
            <Button
              onClick={() => onCreate()}
              icon={ArrowPathIcon}
              label="Save"
              labelClassName="hidden lg:block"
            />
          )}
          {type === 'update' && (
            <Button
              onClick={() => onUpdate()}
              icon={ArrowPathIcon}
              label="Save"
              labelClassName="hidden lg:block"
            />
          )}
        </div>
      </div>
      {
        !isLoadingPage ?
          <div className="mt-4">
            {children}
            {((type === "list" || type === "trash") && dataPagination) && (
              <div className="flex mt-4 justify-end">
                <Pagination
                  data={dataPagination}
                />
              </div>
            )}
          </div >
          :
          <div className="px-4 py-[60px] flex items-center justify-center">
            <Loading
              type="dots"
              size="loading-xl"
            />
          </div>
      }
    </div >
  )
}

export default AdminTableLayout