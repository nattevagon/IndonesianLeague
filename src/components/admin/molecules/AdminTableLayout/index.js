import React, { useState } from 'react'
import Pagination from "@/components/atoms/Pagination"
import { useRouter } from "next/router";
import { ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon, ArrowPathIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import Breadcrumb from "@/components/atoms/Breadcrumb";
import Button from "@/components/atoms/Button";

const AdminTableLayout = ({ children, data, title, type, dataPagination, loading, onCreate, onUpdate, onRestore, onSoftDelete, onHardDelete }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  return (
    <div>
      <div className="flex">
        <div className="w-full mr-4">
          <div className="text-black dark:text-primary-black dark:text-primary-white text-[28px] font-medium w-full">{title}</div>
          <div className="mt-2">
            <Breadcrumb />
          </div>
        </div>
        <div className="flex justify-end items-end gap-4 w-full">
          {(type === 'detail' || type === 'update') && data.is_deleted === 0 && (
            <Button
              onClick={() => onSoftDelete()}
              icon={TrashIcon}
              label="Move to Trash"
            />
          )}
          {(type === 'detail' || type === 'update') && data.is_deleted === 1 && (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => onRestore()}
                icon={ArrowLeftStartOnRectangleIcon}
                label="Restore"
              />
              <Button
                onClick={() => onHardDelete()}
                icon={TrashIcon}
                label="Delete Permanently"
              />
            </div>
          )}
          {type === 'detail' && (
            <Button
              href={`${asPath}/update`}
              icon={PencilIcon}
              label="Update"
            />
          )}
          {type === 'list' && (
            <Button
              href={`${pathname}/trash`}
              icon={ArchiveBoxIcon}
              label="Trash List"
            />
          )}
          {type === 'list' && (
            <Button
              href={`${pathname}/create`}
              icon={PencilIcon}
              label="Create"
            />
          )}
          {type === 'create' && (
            <Button
              onClick={() => onCreate()}
              icon={ArrowPathIcon}
              label="Save"
            />
          )}
          {type === 'update' && (
            <Button
              onClick={() => onUpdate()}
              icon={ArrowPathIcon}
              label="Save"
            />
          )}
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
      {((type === "list" || type === "trash") && dataPagination) && (
        <div className="flex mt-4 justify-end">
          <Pagination
            data={dataPagination}
          />
        </div>
      )}
    </div >
  )
}

export default AdminTableLayout