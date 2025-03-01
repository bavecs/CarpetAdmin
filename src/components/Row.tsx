import { useEffect, useState } from "react"
import ColumnInterface from "./interfaces/column"
import SzonyegInterface from "./interfaces/szonyeg"

interface RowProps {
    ActiveColumns: Array<ColumnInterface>,
    Szonyeg: SzonyegInterface,
    edit(id: number, editedValues: SzonyegInterface): any,
    remove(id: number): any
}

function Cell({ value, type, onChange }: { value: string | number, type: string, onChange: any }) {
    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="col-span-6 sm:col-span-3 p-1">
            <input

                onChange={e => setCellValue(e.target.value)}

                type={type} value={CellValue}
                className="   text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </td>

    )
}

export default function Row({ ActiveColumns, Szonyeg, edit, remove }: RowProps) {

    function getCellValue(collSrc: keyof SzonyegInterface) {
        return Szonyeg[collSrc] as string | number
    }


    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            {ActiveColumns.map(column =>

                <Cell key={"c-" + column.id} type={column.type} value={getCellValue(column.dataSrc)}
                    onChange={
                        (val: SzonyegInterface) =>
                            edit(Szonyeg.id, { ...Szonyeg, [column.dataSrc]: val }
                            )
                    }

                />

            )}

            <td className="col-span-3 sm:col-span-3">
                <button className="!text-xs text-red-500 m-1" onClick={() => remove(Szonyeg.id)}>Törlés</button>
            </td>


        </tr>

    )

}