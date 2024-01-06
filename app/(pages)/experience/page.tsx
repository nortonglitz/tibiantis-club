import type { Metadata } from 'next'
import { tableExp } from "../../libs/tableExp"

export const metadata: Metadata = {
    title: 'Experience - Tibiantis Club',
}

export default function ExperiencePage() {

    const { exp1, exp2, exp3 } = tableExp

    return (
        <main
            className="
                flex
                justify-center
                py-5
                md:py-10
            "
        >
            <div className="px-3 pt-1 bg-stone-800 rounded-3xl border border-stone-200/10 w-full sm:w-[75vw]">
                <div className="h-[80vh] w-full overflow-y-auto rounded-xl flex flex-wrap pl-[7px] gap-1">
                    <table className="relative text-center min-w-[300px] flex-1">
                        <thead className="top-0 sticky z-10">
                            <tr
                                className="
                                    self-end
                                    [&>th]:py-1
                                    uppercase
                                    font-yatra-one
                                    bg-stone-800
                                    shadow-md
                                "
                            >
                                <th scope="col">Level</th>
                                <th scope="col">Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exp1.map(({ lvl, exp }, i) => (
                                <tr
                                    key={i}
                                    className="
                                        [&>td]:py-2
                                        odd:bg-stone-400/10 
                                        even:bg-stone-300/10
                                        hover:outline
                                        hover:-outline-offset-1
                                        hover:outline-stone-400/80
                                        group
                                    "
                                >
                                    <td className="font-bold relative">
                                        <div
                                            className="
                                                group-hover:visible
                                                invisible 
                                                absolute 
                                                bg-stone-900/80 
                                                top-[-30%]
                                                left-[70%]
                                                px-2
                                                rounded-full
                                                text-[#00EF00]
                                                font-semibold
                                                z-20
                                            "
                                        >
                                            +{(i === 0 ? 0 : exp - exp1[i - 1].exp).toLocaleString()}
                                        </div>
                                        {lvl}
                                    </td>
                                    <td>{exp.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                                <td colSpan={6} className="py-2" />
                            </tr>
                        </tfoot>
                    </table>
                    <table className="relative text-center min-w-[300px] flex-1">
                        <thead className="top-0 sticky z-10">
                            <tr
                                className="
                                    self-end
                                    [&>th]:py-1
                                    uppercase
                                    font-yatra-one
                                    bg-stone-800
                                    shadow-md
                                "
                            >
                                <th scope="col">Level</th>
                                <th scope="col">Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exp2.map(({ lvl, exp }, i) => (
                                <tr
                                    key={i}
                                    className="
                                        [&>td]:py-2
                                        odd:bg-stone-400/10 
                                        even:bg-stone-300/10
                                        hover:outline
                                        hover:-outline-offset-1
                                        hover:outline-stone-400/80
                                        group
                                    "
                                >
                                    <td className="font-bold relative">
                                        <div
                                            className="
                                                group-hover:visible
                                                invisible 
                                                absolute 
                                                bg-stone-900/80 
                                                top-[-30%]
                                                left-[70%]
                                                px-2
                                                rounded-full
                                                text-[#00EF00]
                                                font-semibold
                                                z-20
                                            "
                                        >
                                            +{(i === 0 ? exp - exp1[99].exp : exp - exp2[i - 1].exp).toLocaleString()}
                                        </div>
                                        {lvl}
                                    </td>
                                    <td>{(exp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                                <td colSpan={6} className="py-2" />
                            </tr>
                        </tfoot>
                    </table>
                    <table className="relative text-center min-w-[300px] flex-1">
                        <thead className="top-0 sticky z-10">
                            <tr
                                className="
                                    self-end
                                    [&>th]:py-1
                                    uppercase
                                    font-yatra-one
                                    bg-stone-800
                                    shadow-md
                                "
                            >
                                <th scope="col">Level</th>
                                <th scope="col">Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exp3.map(({ lvl, exp }, i) => (
                                <tr
                                    key={i}
                                    className="
                                        [&>td]:py-2
                                        odd:bg-stone-400/10 
                                        even:bg-stone-300/10
                                        hover:outline
                                        hover:-outline-offset-1
                                        hover:outline-stone-400/80
                                        group
                                    "
                                >
                                    <td className="font-bold relative">
                                        <div
                                            className="
                                                group-hover:visible
                                                invisible 
                                                absolute 
                                                bg-stone-900/80 
                                                top-[-30%]
                                                left-[70%]
                                                px-2
                                                rounded-full
                                                text-[#00EF00]
                                                font-semibold
                                                z-20
                                            "
                                        >
                                            +{(i === 0 ? exp - exp2[99].exp : exp - exp3[i - 1].exp).toLocaleString()}
                                        </div>
                                        {lvl}
                                    </td>
                                    <td>{(exp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="sticky bottom-0 bg-stone-800 italic text-sm pb-1 z-10" >
                                <td colSpan={6} className="py-2" />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </main>
    )
}
