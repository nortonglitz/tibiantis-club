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
    const { dayPlayers, isLoading } = useDayPlayersOnline()

    return (
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
    )
}

export default DayPlayersChart