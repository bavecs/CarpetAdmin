import { useEffect, useState } from "react"

 export default function Cell({ value, onChange }: { value: string | number, onChange: any }) {
    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        
            <input

                onChange={e => setCellValue(e.target.value)}

                value={value}
                className=" !text-black focus:border-sky-200 focus:outline focus:outline-sky-200  block w-full px-1 py-3" />

    )
}