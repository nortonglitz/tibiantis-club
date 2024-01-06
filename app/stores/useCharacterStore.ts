import { create } from 'zustand'
import { Character } from '@prisma/client'

interface CharacterStore {
    character: Character | null
    setCharacter: (value: Character) => void
}

const useCharacterStore = create<CharacterStore>((set) => ({
    character: null,
    setCharacter: (value) => set(() => ({ character: value }))
}))

export default useCharacterStore