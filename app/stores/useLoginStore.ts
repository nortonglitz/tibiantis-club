import { create } from 'zustand'

interface LoginStore {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

const useLoginStore = create<LoginStore>((set) => ({
    isOpen: false,
    setIsOpen: (value) => set(() => ({ isOpen: value }))
}))

export default useLoginStore