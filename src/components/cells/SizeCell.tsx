import { useEffect, useState } from "react"

export default function SizeCell({ value, onChange }: { value: { width: number, height: number }, onChange: any }) {

    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="col-span-6 p-1 sm:col-span-3">
            <div className="flex flex-row items-center justify-center h-full">

            <input
                onChange={e => setCellValue({ ...CellValue, width: parseInt(e.target.value) })}
                type="number" value={CellValue.width}
                className="mr-2 w-[3rem] text-right !text-black right-0 focus:border-sky-200 focus:outline focus:outline-sky-200 block p-1  "
                placeholder="0 cm"
                />
            <span className="m-1 font-bold text-black">x</span>
            <input
                onChange={e => setCellValue({ ...CellValue, height: parseInt(e.target.value) })}
                type="number" value={CellValue.height}
                className="mr-2 w-[3rem] !text-black  focus:border-sky-200 focus:outline focus:outline-sky-200 block  p-1 "
                placeholder="0 cm"
                />
            
            
            </div>

        </td>

    )
}