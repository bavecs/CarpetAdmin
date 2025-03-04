import { ReactNode, useEffect, useState } from "react"
import { SelectPicker } from "rsuite"

type ValueType = string | number;


 export default function SelectCell({ value, onChange, options }: { value: ValueType, onChange: any, options: string[] }) {
    const SelectList = options.map(item => ({ label: item, value: item }))
    const [CellValue, setCellValue] = useState(value)
    
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="col-span-6 p-1 sm:col-span-3">
            <SelectPicker data={SelectList as any} value={CellValue} placeholder="Válassz"  size="sm" cleanable={false} block onChange={value => setCellValue(value as ValueType)}  />

        </td>

    )
}