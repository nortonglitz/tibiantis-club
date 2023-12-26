"use client"

interface TableProps {
    displayName: string
}

const Table: React.FC<TableProps> = ({ displayName }) => {
    return (
        <div>
            {displayName}
        </div>
    )
}

export default Table