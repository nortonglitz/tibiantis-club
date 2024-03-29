"use client"

import { useDayPlayersOnline } from '@/app/hooks/useDayPlayersOnline'
import { LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip } from 'recharts'

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="b
                    bg-stone-800/30
                    px-1 
                    rounded-md
                    border
                    border-stone-600/30
                "
            >
                <p>
                    <span className="font-yatra-one text-tibia-green text-lg text-center">{payload[0].value}</span>
                    <span className="text-stone-500"> at {label}</span>
                </p>
            </div>
        );
    }

    return null;
};

const DayPlayersChart = () => {
    const { dayPlayers, error, isLoading } = useDayPlayersOnline()

    return (
        <>
            {isLoading ?
                <div className="w-[350px] h-[200px] bg-stone-500/30 animate-pulse rounded-3xl" />
                :
                error ?
                    <div className="
                            w-[350px] 
                            h-[200px] 
                            bg-stone-800/20
                            p-4
                            border
                            border-stone-700/40
                            rounded-3xl
                            flex
                            items-center
                            justify-center
                            text-stone-400
                            italic
                        "
                    >
                        Something went wrong
                    </div>
                    :
                    dayPlayers && dayPlayers.length < 1 ?
                        <div className="
                                w-[350px] 
                                h-[200px] 
                                bg-stone-800/20
                                p-4
                                border
                                border-stone-700/40
                                rounded-3xl
                                flex
                                items-center
                                justify-center
                                text-stone-400
                                italic
                            "
                        >
                            No data to display
                        </div>
                        :
                        <div className="w-[350px] h-[200px] text-xs">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={dayPlayers}
                                    margin={{ top: 0, left: 0, right: 50, bottom: 0 }}
                                >
                                    <XAxis dataKey="createdAt" />
                                    <YAxis />
                                    <Tooltip content={CustomTooltip} />
                                    <Line type="monotone" dataKey="quantity" stroke="#fef08a" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
            }
        </>
    )
}

export default DayPlayersChart