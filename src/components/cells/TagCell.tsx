import { useEffect, useState } from "react"
import { TagPicker } from "rsuite"

const ketegoriak = ['Kelimek(kézi szőttes)', 'Kézi csomózású', 'Gépi szőnyegek', '• Legnépszerűbbek',].map(
    item => ({ label: item, value: item })
  );

 export default function TagCell({ value, onChange }: { value: string[], onChange: any }) {
    const [CellValue, setCellValue] = useState(value)
    
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="col-span-6 p-1 sm:col-span-3">
            <TagPicker data={ketegoriak} value={CellValue} block placeholder="Kategóriák" size="sm" onChange={e => setCellValue(e)} />

        </td>

    )
}