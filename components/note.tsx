interface NoteProps {
    children: React.ReactNode
}

export const Note = ({ children }: NoteProps) => {
    return (
        <div className="rounded-xl bg-stone-800/30 p-4">
            <p className="font-yatra-one text-stone-300"><b>Note</b></p>
            <p className="text-sm text-stone-300">{children}</p>
        </div>
    )
}
