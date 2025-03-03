import { useState } from "react";

import feltoltes from "../data/feltoltes.json";
import Row from "./Row";
import ColumnList from "./columns.json";
import ColumnInterface from "./interfaces/column";
import SzonyegInterface from "./interfaces/szonyeg";
import AddOutlineIcon from '@rsuite/icons/AddOutline';

import { Button, IconButton, Input, Modal } from 'rsuite';
import CSVExport from "../csvExport";



const emptySzonyeg =
{
  "id": 0,
  "cikkszam": "",
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

  const [openGenModal, setOpenGenModal] = useState(false);

  const [activeColumns] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

  const [szonyegek, setSzonyegek] = useState(feltoltes.szonyegek)

  const [bunchGeneratedSzonyegek, setBunchGeneratedSzonyegek] = useState<string[]>([])
  const [bunchFromTo, setBunchFromTo] = useState({from: "0", to: "0"})

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

  function FromToHandler(direction:string, value:string) {
    if (!!!parseInt(value.replace(/\D/g, ''))) return;

    let from:number = 0
    let to:number = 0
    let gepi = false

    switch(direction) {
      case "from":
        gepi = ( value.indexOf("G") > -1);
        from = parseInt(value.replace(/\D/g, ''))
        setBunchFromTo({...bunchFromTo, from: value})
        to = parseInt(bunchFromTo.to.replace(/\D/g, ''))
        break;
      case "to":
        from = parseInt(bunchFromTo.from.replace(/\D/g, ''))
        to = parseInt(value.replace(/\D/g, ''))
        setBunchFromTo({...bunchFromTo, to: value})
        break;
    }


    if (from < to) {
      let newitems:string[] = []

      for(let i = from; i < to + 1; i++) {
        newitems = [...newitems, (gepi ? "G" : "")+i]
      }

      setBunchGeneratedSzonyegek(newitems)
    console.log(newitems)

    }
  }

  function generalas() {
    if (bunchGeneratedSzonyegek.length === 0) return;

    let generaltSzonyegek:SzonyegInterface[] = []

    for(let i = 0; i < bunchGeneratedSzonyegek.length; i++) {
      let cikkszam = bunchGeneratedSzonyegek[i];
      
      let newSzonyeg = {...emptySzonyeg, cikkszam: cikkszam, id: newId() + i}

      generaltSzonyegek.push(newSzonyeg)
      console.log(generaltSzonyegek)

    }

    setOpenGenModal(false)
    setSzonyegek([...szonyegek, ...generaltSzonyegek])
    
  }

  function exportHandle() {
    CSVExport(szonyegek, "https://kabiriszonyeghaz.hu/wp-content/uploads")
  }



  return (<>

    <div className="flex justify-between mb-4">

      <Button onClick={() => setOpenGenModal(true)}>Cikkszám generálás</Button>

      <Button  appearance="primary" disabled={szonyegek.length === 0} onClick={exportHandle}>
            CSV EXPORT
      </Button>



    </div>

    <Modal size={400} backdrop="static" open={openGenModal} onClose={() => setOpenGenModal(false)}>
        
        <Modal.Body>
          <p className="mb-2">Szőnyeg generálás, első és utolsó címkeazonosító megadásával.</p>
          <div className="flex items-center my-3 ">
            <Input placeholder="0000" onChange={(value) => FromToHandler("from", value)} /><span>-</span>
            <Input placeholder="0000" onChange={(value) => FromToHandler("to", value)} />
          </div>
          {bunchGeneratedSzonyegek.length} darab
          

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenGenModal(false)} appearance="subtle" size="sm"> 
            Mégse
          </Button>
          <Button  appearance="primary" size="sm" disabled={bunchGeneratedSzonyegek.length === 0} onClick={generalas}>
            Generálás
          </Button>
        </Modal.Footer>
      </Modal>

    <div className="relative m-1 overflow-x-auto shadow-md sm:rounded-lg">


      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="my-3 h-[3rem]">
            {
              getActiveColumns().map(col => <th scope="col" id={"column_"+col.id} className="!p-[1rem]">{col.name}</th>)
            }
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>

          {szonyegek && szonyegek.map(szonyeg =>
            <Row Szonyeg={szonyeg} ActiveColumns={getActiveColumns()} edit={editSzonyeg} remove={removeSzonyeg} />
          )}




        </tbody>
        
      </table>
      <IconButton icon={<AddOutlineIcon />} onClick={addSzonyeg} > Szőnyeg hozzáadás</IconButton>

    </div>
  </>

  )
}