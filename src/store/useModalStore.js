import { create } from "zustand";

const useModalStore = create((set) => ({
    isOpen: false,
    title: "",
    desc: "",
    onConfirm: null,
    loading: false,

    openModal: (title, desc, onConfirm) => set({ isOpen: true, title, desc, onConfirm }),
    closeModal: () => set({ isOpen: false, title: "", desc: "", onConfirm: null, loading: false }),
    setLoading: (loading) => set({ loading }),
}));

export default useModalStore;
