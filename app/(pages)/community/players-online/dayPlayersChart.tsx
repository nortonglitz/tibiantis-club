"use client"

import { useDayPlayersOnline } from '@/app/hooks/useDayPlayersOnline'
import { LineChart, ResponsiveContainer, XAxis, YAxis, Line } from 'recharts'

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
                    <Line type="monotone" dataKey="quantity" stroke="#fef08a" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DayPlayersChart