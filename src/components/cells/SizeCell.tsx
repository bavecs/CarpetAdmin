import { useEffect, useState } from "react"
import getSize from "../../lib/getSize"
import { Input, InputGroup } from "rsuite"

export default function SizeCell({ value, onChange }: { value: { width: number, height: number }, onChange: any }) {

    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    const styles = {
        width: 150,
        marginBottom: 2
      };

    return (
        <div className="relative col-span-6 p-1 sm:col-span-3">
               <InputGroup style={styles}>
                <Input type="number" placeholder="Sz" value={CellValue.width} size="sm" onChange={e => setCellValue({ ...CellValue, width: parseInt(e) })} />
                <InputGroup.Addon>x</InputGroup.Addon>
                <Input type="number" placeholder="H" value={CellValue.height} size="sm" onChange={e => setCellValue({ ...CellValue, height: parseInt(e) })} />
                </InputGroup>


            <p  style={styles} className="overflow-hidden text-black h-[15px] text-[12px] absolute top-[39px] left-2">{getSize(CellValue.width, CellValue.height)}</p>

        </div>

    )
}