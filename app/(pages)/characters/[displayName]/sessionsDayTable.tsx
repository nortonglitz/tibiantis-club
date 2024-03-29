"use client"

import { useCharacterSessionsDay } from "@/app/hooks/useCharacterSessionsDay"
import useCharacterStore from "@/app/stores/useCharacterStore"
import { differenceInCalendarDays, intervalToDuration } from "date-fns"

const TODAY = new Date()

const SessionsDayTable = () => {

    const { character } = useCharacterStore()
    const { sessionsDay, error, isLoading } = useCharacterSessionsDay(character ? character.id : '')

    return (
        <div
            className="
                bg-stone-800
                px-4
                pb-4 
                rounded-3xl 
                border 
                border-stone-600/30 
                w-full
                h-fit
                sm:w-[70vw] 
                md:w-[60vw] 
                lg:w-[50vw]
                xl:w-[40vw]
            "
        >
            <div className="flex items-center">
                <div
                    className={`
                        p-2
                        bg-gradient-radial
                        rounded-full
                        from-stone-500
                        via-transparent
                    `}
                >
                    <img src="/assets/imgs/icons/char_sessions_day.gif" alt="sessions day" />
                </div>
                <h3
                    className="
                        mt-2
                        ml-1
                        font-yatra-one 
                        text-2xl 
                        whitespace-nowrap 
                        text-yellow-200
                    "
                >
                    Sessions
                </h3>
            </div>
            <hr className="border-stone-700 mb-2" />
            <div className="max-h-[40vh] md:max-h-[50vh] h-fit w-full overflow-y-auto">
                <table className="w-full h-fit relative">
                    <thead className="sticky top-0">
                        <tr className="
                                text-center
                                shadow-md
                                uppercase
                                font-yatra-one
                                bg-stone-800
                                font-bold
                                [&>th]:pb-1
                            "
                        >
                            <th colSpan={1}>When</th>
                            <th colSpan={1}>Level</th>
                            <th colSpan={1}>Duration</th>
                            <th colSpan={1}>Exp</th>
                        </tr>
                    </thead>
                    <tbody
                        className="
                            [&>tr>th]:text-left 
                            [&>tr>th]:p-2
                            text-center
                        "
                    >
                        {isLoading || !character ?
                            <>
                                {[1, 2, 3].map((key) => (
                                    <tr className="odd:bg-stone-300/10 even:bg-stone-400/10" key={key}>
                                        <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                        <td className="py-2"><div className="w-[2rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                        <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                        <td className="py-2"><div className="w-[5rem] m-auto bg-stone-500/30 animate-pulse h-[0.875rem] rounded-full" /></td>
                                    </tr>
                                ))}
                            </>
                            :
                            error ?
                                <tr>
                                    <td colSpan={4} className="text-center py-2 bg-stone-300/10">Something went wrong.</td>
                                </tr>
                                :
                                !sessionsDay || sessionsDay.length < 1 ?
                                    <tr>
                                        <td colSpan={4} className="text-center py-2 bg-stone-300/10">
                                            No sessions day has been found.
                                        </td>
                                    </tr>
                                    :
                                    <>
                                        {sessionsDay && sessionsDay.map(({ createdAt, duration, expGained, startLevel }, i) => (
                                            <tr
                                                key={i}
                                                className="
                                                    [&>td]:py-2
                                                    odd:bg-stone-300/10 
                                                    even:bg-stone-400/10
                                                    hover:outline
                                                    hover:-outline-offset-1
                                                    hover:outline-stone-400/80
                                                "
                                            >
                                                <td>
                                                    {differenceInCalendarDays(TODAY, createdAt) === 0 ?
                                                        'today'
                                                        :
                                                        differenceInCalendarDays(TODAY, createdAt) === 1 ?
                                                            `${differenceInCalendarDays(TODAY, createdAt)} day ago`
                                                            :
                                                            `${differenceInCalendarDays(TODAY, createdAt)} days ago`
                                                    }
                                                </td>
                                                <td>
                                                    {startLevel}
                                                </td>
                                                <td
                                                    className={`
                                                        ${duration > 360 && duration < 540 ?
                                                            'text-orange-400'
                                                            :
                                                            duration >= 540 && duration < 720 ?
                                                                'text-orange-500'
                                                                :
                                                                duration >= 720 && duration < 900 ?
                                                                    'text-orange-600'
                                                                    :
                                                                    duration > 900 ?
                                                                        'text-orange-700'
                                                                        :
                                                                        ''
                                                        }
                                                    `}
                                                >
                                                    {
                                                        intervalToDuration({ start: 0, end: duration * 60 * 1000 }).hours
                                                        &&
                                                        `${intervalToDuration({ start: 0, end: duration * 60 * 1000 }).hours}h`
                                                    }
                                                    {
                                                        intervalToDuration({ start: 0, end: duration * 60 * 1000 }).minutes
                                                        &&
                                                        `${intervalToDuration({ start: 0, end: duration * 60 * 1000 }).minutes}m`
                                                    }
                                                </td>
                                                <td>
                                                    {expGained === 0 ?
                                                        '-'
                                                        :
                                                        expGained > 0 ?
                                                            <i className="text-green-500">+{expGained.toLocaleString()}</i>
                                                            :
                                                            <i className="text-red-500">{expGained.toLocaleString()}</i>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SessionsDayTable