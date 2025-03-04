import {  useEffect, useState } from "react"
import { InlineEdit, SelectPicker } from "rsuite"

type ValueType = string | number;


export default function SelectCell({ value, onChange, options }: { value: ValueType, onChange: any, options: string[] }) {
    const SelectList = options.map(item => ({ label: item, value: item }))
    const [CellValue, setCellValue] = useState(value)

    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <InlineEdit
            placeholder="Hozzáadás"
            style={{ width: "100%"}}
            defaultValue={CellValue}
            showControls={false}
        >            
            <SelectPicker data={SelectList as any} block value={CellValue} placeholder="Válassz" size="sm" cleanable={false}  onChange={value => setCellValue(value as ValueType)} />
        </InlineEdit>

    )
}