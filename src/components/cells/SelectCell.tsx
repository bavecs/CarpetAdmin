import {  useEffect, useState } from "react"
import { SelectPicker } from "rsuite"

type ValueType = string | number;


export default function SelectCell({ value, onChange, options }: { value: ValueType, onChange: any, options: string[] }) {
    const SelectList = options.map(item => ({ label: item, value: item }))
    const [CellValue, setCellValue] = useState(value)

    useEffect(() => {
        console.log("new value")
        onChange(CellValue)

    }, [CellValue])

    return (
       
            <SelectPicker data={SelectList as any} block style={{ width: "100%"}} value={value} placeholder="Válassz" size="sm" cleanable={false}  onChange={value => setCellValue(value as ValueType)} />

    )
}