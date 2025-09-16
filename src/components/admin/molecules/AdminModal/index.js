import Button from "@/components/atoms/Button";
import Loading from "@/components/atoms/Loading";
import GeneralModal from "@/components/molecules/GeneralModal";
import useModalStore from "@/store/useModalStore";
import React from "react";

const AdminModal = () => {
  const { isOpen, title, desc, onConfirm, closeModal, loading } = useModalStore();

  return (
    <GeneralModal
      title={title}
      isOpen={isOpen}
      onClose={() => closeModal()}
    >
      <p className="mt-1">{desc}</p>
      <div className="mt-4 flex items-center justify-end !gap-4">
        <Button
          onClick={() => onConfirm()}
          label="Confirm"
          icon={loading ? Loading : ""}
        />
        <Button
          onClick={() => closeModal()}
          label="Cancel"
        />
      </div>
    </GeneralModal>
  );
};

export default AdminModal;
