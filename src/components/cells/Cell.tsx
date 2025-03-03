import { useEffect, useState } from "react"

 export default function Cell({ value, onChange }: { value: string | number, onChange: any }) {
    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="col-span-6 p-1 sm:col-span-3">
            <input

                onChange={e => setCellValue(e.target.value)}

                value={CellValue}
                className=" !text-black focus:border-sky-200 focus:outline focus:outline-sky-200  block w-full px-1 py-3" />
        </td>

    )
}