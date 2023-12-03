import { create } from 'zustand'

interface SidebarStore {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

const useSidebarStore = create<SidebarStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set(() => ({ isOpen: value }))
}))

export default useSidebarStore