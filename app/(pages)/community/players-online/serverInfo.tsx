const ServerInfo = () => {
    return (
        <div
            className="
                bg-stone-800/20
                p-4
                border
                border-stone-700/40
                rounded-3xl
            "
        >
            <table
                className="
                    [&>tr>th]:font-yatra-one
                    [&>tr>th]:text-right
                    [&>tr>td]:text-sm
                    border-separate
                    border-spacing-x-5
                "
            >
                <tbody>
                    <tr>
                        <th>Status</th>
                        <td className="text-tibia-green font-semibold">Online</td>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <td>
                            <div className="flex items-center">
                                London, UK
                                <img className="ml-2 h-[10px]" src="/assets/imgs/icons/uk_flag.gif" alt="UK" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>Launch Date</th>
                        <td>April 4, 2020</td>
                    </tr>
                    <tr>
                        <th>Players Online</th>
                        <td>301</td>
                    </tr>
                    <tr>
                        <th>PvP Type</th>
                        <td>Normal</td>
                    </tr>
                    <tr>
                        <th className="block">Online Record</th>
                        <td>802<p>September 18, 2023</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ServerInfo