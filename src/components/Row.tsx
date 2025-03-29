import ColumnInterface, { ColumnDataSrc } from "./interfaces/ColumnInterface"
import SzonyegInterface from "./interfaces/SzonyegInterface"
import TitleCell from "./cells/TitleCell"
import Cell from "./cells/Cell"
import SizeCell from "./cells/SizeCell"
import TagCell from "./cells/TagCell"
import SelectCell from "./cells/SelectCell"
import IndexKep from "./cells/IndexKep"
import { IconButton } from "rsuite"
import TrashIcon from '@rsuite/icons/Trash';


interface RowProps {
    ActiveColumns: Array<ColumnInterface>,
    Szonyeg: SzonyegInterface,
    edit(id: number, editedValues: SzonyegInterface, valueKey?: any): any,
    remove(id: number): any
}



export default function Row({ ActiveColumns, Szonyeg, edit, remove }: RowProps) {

    function getVal(collSrc: ColumnDataSrc) {

        if (typeof collSrc === "object") {

            let valueObject: Object = {}

            Object.values(collSrc).forEach(values => {
                let key: string = values.toString()

                valueObject = { ...valueObject, [key]: getVal(key as any) }

            });
            return valueObject
        }

  
        return Szonyeg[collSrc] as string | number | string[]
    }


    function generateCell(column: ColumnInterface) {
        switch (column.component) {
            case "SelectCell":
                return <SelectCell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                    (val: SzonyegInterface) =>
                        edit(Szonyeg.id, { ...Szonyeg, [column.dataSrc as keyof SzonyegInterface]: val }
                        )
                }
                options={column.options ?? []}
                />
            case "TagCell":
                return <TagCell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                    (val: SzonyegInterface) =>
                        edit(Szonyeg.id, { ...Szonyeg, [column.dataSrc as keyof SzonyegInterface]: val } )
                }
                options={column.options ?? []}
                />
            case "IndexKep":
                return <IndexKep value={getVal(column.dataSrc) as any} key={column.id} onChange={
                    (val: SzonyegInterface) =>
                        edit(Szonyeg.id, { ...Szonyeg, title: val.title, description: val.description } )
                } />
            case "TitleCell":
                return <TitleCell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                    (val: SzonyegInterface) =>
                        edit(Szonyeg.id, { ...Szonyeg, title: val.title, description: val.description }, "title")
                } />
            case "SizeCell":
                return <SizeCell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                    (val: SzonyegInterface) =>
                        edit(Szonyeg.id, { ...Szonyeg, width: val.width, height: val.height })
                } />
            default:
                return <Cell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                    (val: SzonyegInterface) =>
                        edit(Szonyeg.id, { ...Szonyeg, [column.dataSrc as keyof SzonyegInterface]: val }, column.dataSrc)
                } />

        }
    }


    return (
<>
        <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
            <>
                {ActiveColumns.map(column => {
                    if(column.id === 1) {
                        return <th key={"col_"+column.id} className="col-span-6 p-1" >{generateCell(column)}</th>

                    } else {
                        return <td key={"col_"+column.id} className="col-span-6 p-1 sm:col-span-3">{generateCell(column)}</td>

                    }
                    

                }


                )}</>


                <td className="trash-c sticky right-0 z-30 rounded-tl rounded-bl">
                <IconButton circle icon={<TrashIcon />} color="red" className=" !mx-3 h-full " appearance="link" onClick={() => remove(Szonyeg.id)} />

                </td>

        </tr>
        </>
    )

}

