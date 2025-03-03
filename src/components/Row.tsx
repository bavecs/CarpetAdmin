






import { useEffect, useState } from "react"
import ColumnInterface, { ColumnDaraSrc } from "./interfaces/column"
import SzonyegInterface from "./interfaces/szonyeg"
import React from "react"


interface RowProps {
    ActiveColumns: Array<ColumnInterface>,
    Szonyeg: SzonyegInterface,
    edit(id: number, editedValues: SzonyegInterface): any,
    remove(id: number): any
}

function Cell({ value, onChange }: { value: string | number, onChange: any }) {
    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="col-span-6 p-1 sm:col-span-3">
            <input

                onChange={e => setCellValue(e.target.value)}

                value={CellValue}
                className=" !text-black focus:border-sky-200 focus:outline focus:outline-sky-200  block w-full p-2.5 " />
        </td>

    )
}

function TitleCell({ value, onChange }: { value: { title: string, description: string }, onChange: any }) {

    const [CellValue, setCellValue] = useState(value)
    useEffect(() => {
        onChange(CellValue)
    }, [CellValue])

    return (
        <td className="flex flex-col col-span-6 p-1 sm:col-span-3">
            <input
                onChange={e => setCellValue({ ...CellValue, title: e.target.value })}
                type="text" value={CellValue.title}
                className="mb-4 !text-black  !font-semibold focus:border-sky-200 focus:outline focus:outline-sky-200 block w-full p-2.5 pb-1 "
                placeholder="Szőnyeg neve..."
                />
            
            <textarea onChange={e => setCellValue({ ...CellValue, description: e.target.value })} value={CellValue.description}
            className="!text-black  h-9 focus:h-16 transition-all focus:border-sky-200 focus:outline focus:outline-sky-200  block w-full p-2.5 pt-1 block p-2.5 w-full text-sm text-gray-900 " placeholder="Leírás..."></textarea>

        </td>

    )
}



export default function Row({ ActiveColumns, Szonyeg, edit, remove }: RowProps) {

    function getVal(collSrc: ColumnDaraSrc) {



        if (typeof collSrc === "object") {

            let valueObject: Object = {}

            Object.values(collSrc).forEach(values => {
                let key: string = values.toString()

                valueObject = { ...valueObject, [key]: getVal(key as any) }

            });
            return valueObject
        }

        return Szonyeg[collSrc] as string | number
    }


    return (

        <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <>
                {ActiveColumns.map(column => {


                    switch (column.component) {
                        case "TitleCell":
                            return <TitleCell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                                (val: SzonyegInterface) =>
                                    edit(Szonyeg.id, { ...Szonyeg, title: val.title, description: val.description }
                                    )
                            } />
                        default:
                            return <Cell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                                (val: SzonyegInterface) =>
                                    edit(Szonyeg.id, { ...Szonyeg, [column.dataSrc as keyof SzonyegInterface]: val }
                                    )
                            } />

                    }

                }


                )}</>

            <td className="col-span-3 sm:col-span-3">
                <button className="!text-xs text-red-500 m-1" onClick={() => remove(Szonyeg.id)}>Törlés</button>
            </td>


        </tr>

    )

}

