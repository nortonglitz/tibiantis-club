import { create } from 'zustand'

interface RegisterStore {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

const useRegisterStore = create<RegisterStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set(() => ({ isOpen: value }))
}))

export default useRegisterStore