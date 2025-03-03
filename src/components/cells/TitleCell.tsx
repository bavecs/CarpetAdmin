import { useEffect, useState } from "react"

export default function TitleCell({ value, onChange }: { value: { title: string, description: string }, onChange: any }) {

    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="flex flex-col col-span-6 p-1 sm:col-span-3">
            <input
                onChange={e => setCellValue({ ...CellValue, title: e.target.value })}
                type="text" value={CellValue.title}
                className="mb-4 !text-black  !font-semibold focus:border-sky-200 focus:outline focus:outline-sky-200 block w-full p-2.5 pb-1 "
                placeholder="Szőnyeg neve..."
                />
            
            <textarea onChange={e => setCellValue({ ...CellValue, description: e.target.value })} value={CellValue.description}
            className="!text-black  h-9 focus:h-16 transition-all focus:border-sky-200 focus:outline focus:outline-sky-200  block w-full p-2.5 pt-1 block p-2.5 w-full text-sm text-gray-900 " placeholder="Leírás..."></textarea>

        </td>

    )
}