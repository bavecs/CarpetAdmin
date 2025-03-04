import ColumnInterface, { ColumnDaraSrc } from "./interfaces/column"
import SzonyegInterface from "./interfaces/szonyeg"
import TitleCell from "./cells/TitleCell"
import Cell from "./cells/Cell"
import SizeCell from "./cells/SizeCell"
import TagCell from "./cells/TagCell"
import SelectCell from "./cells/SelectCell"


interface RowProps {
    ActiveColumns: Array<ColumnInterface>,
    Szonyeg: SzonyegInterface,
    edit(id: number, editedValues: SzonyegInterface): any,
    remove(id: number): any
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

  
        return Szonyeg[collSrc] as string | number | string[]
    }


    return (

        <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <>
                {ActiveColumns.map(column => {


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
                                    edit(Szonyeg.id, { ...Szonyeg, [column.dataSrc as keyof SzonyegInterface]: val }
                                    )
                            }
                            options={column.options ?? []}
                            />
                        case "TitleCell":
                            return <TitleCell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                                (val: SzonyegInterface) =>
                                    edit(Szonyeg.id, { ...Szonyeg, title: val.title, description: val.description }
                                    )
                            } />
                        case "SizeCell":
                            return <SizeCell value={getVal(column.dataSrc) as any} key={column.id} onChange={
                                (val: SzonyegInterface) =>
                                    edit(Szonyeg.id, { ...Szonyeg, width: val.width, height: val.height }
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

