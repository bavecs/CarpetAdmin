import { useEffect, useState } from "react"
import { TagPicker } from "rsuite"



 export default function TagCell({ value, onChange, options }: { value: string[], onChange: any, options: string[] }) {
    const TagList = options.map(item => ({ label: item, value: item }))
    const [CellValue, setCellValue] = useState(value)
    
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
    
            <TagPicker data={TagList} value={value} placeholder="Válassz..." size="sm" style={{ width: "100%", maxHeight: 100, overflowX: "hidden", overflowY: "auto" }} cleanable={false} block onChange={e => setCellValue(e)} />


    )
}