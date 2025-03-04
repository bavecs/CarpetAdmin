import { useEffect, useState } from "react"
import { InlineEdit, TagPicker } from "rsuite"



 export default function TagCell({ value, onChange, options }: { value: string[], onChange: any, options: string[] }) {
    const TagList = options.map(item => ({ label: item, value: item }))
    const [CellValue, setCellValue] = useState(value)
    
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="col-span-6 p-1 sm:col-span-3">
            <InlineEdit
                    placeholder="Hozzáadás"
                    style={{ width: 200 }}
                    defaultValue={CellValue}
                >
    
            <TagPicker data={TagList} value={CellValue} block placeholder="Kategóriák" size="sm" cleanable={false} onChange={e => setCellValue(e)} />
            </InlineEdit>

        </td>

    )
}