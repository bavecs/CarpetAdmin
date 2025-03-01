import { useState } from "react";

import ColumnList from "./columns.json"
import feltoltes from "../data/feltoltes.json"
import Row from "./Row";
import ColumnInterface from "./interfaces/column";
import SzonyegInterface from "./interfaces/szonyeg";

const emptySzonyeg =
{
  "title": "",
  "description": "",
  "price": 0,
  "discountPrice": 0,
  "alak": "",
  "allapot": "",
  "anyag": [],
  "keszites": "",
  "szarmazasiHely": "",
  "szin": [],
  "kepekSzama": 6,
  "categories": [],
  "width": 0,
  "height": 0,
  "gepi": false,
  "futo": false,
  "csomoszam": 0
}


export default function Table() {

  const [activeColumns, setActiveColumns] = useState([1, 2, 3, 4, 5, 6, 7])

  const [szonyegek, setSzonyegek] = useState(feltoltes.szonyegek)

  function getActiveColumns() {
    const columns = ColumnList.filter((column) => activeColumns.includes(column.id))

    return columns as ColumnInterface[]
  }

  function editSzonyeg(id: number, editedValues: SzonyegInterface) {
    setSzonyegek(
      szonyegek.map(szonyeg => szonyeg.id === id ? editedValues : szonyeg)
    )
  }

  function removeSzonyeg(id: number) {
    setSzonyegek(szonyegek.filter(szonyeg => szonyeg.id !== id))
  }

  function addSzonyeg() {
    setSzonyegek([...szonyegek, {
      ...emptySzonyeg,
      id: newId(),
      cikkszam: newCikkszam()
    }])
  }

  function newId() {
    let max = 0;
    szonyegek.forEach(item => {
      if (item.id > max) max = item.id
    });
    return max + 1
  }

  function newCikkszam() {

    let gepi = false;
    let max = 0;

    szonyegek.forEach(item => {
      const cikkszam = parseInt(item.cikkszam.replace(/\D/g, ''))
      const itemIsGepi = item.cikkszam.indexOf("G") > -1;

      if (cikkszam > max) {
        max = cikkszam
        gepi = itemIsGepi
      }
    });

    return gepi ? "G" + (max + 1) : "" + (max + 1)
  }

  return (<>

    <div className="m-1">
      <button onClick={addSzonyeg} >Hozzáadás</button>
      <button >Generálás</button>

    </div>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-1">


      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {
              getActiveColumns().map(col => <th scope="col" className="px-6 py-3">{col.name}</th>)
            }
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>

          {szonyegek && szonyegek.map(szonyeg =>
            <Row Szonyeg={szonyeg} ActiveColumns={getActiveColumns()} edit={editSzonyeg} remove={removeSzonyeg} />
          )}

          <button onClick={addSzonyeg} >+</button>


        </tbody>
      </table>

    </div>
  </>

  )
}