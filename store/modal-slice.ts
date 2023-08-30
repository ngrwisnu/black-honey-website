import { create } from "zustand";

interface ModalStateType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModal = create<ModalStateType>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useModal;
