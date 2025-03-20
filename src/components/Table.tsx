import { useState } from "react";

import Row from "./Row";
import ColumnList from "./columns.json";
import ColumnInterface from "./interfaces/ColumnInterface";
import SzonyegInterface from "./interfaces/SzonyegInterface";
import AddOutlineIcon from '@rsuite/icons/AddOutline';

import { Button, IconButton, Input, Modal, SelectPicker } from 'rsuite';
import CSVExport from "../csvExport";
import beviteliModok from "../data/beviteliModOszlopok.json"


import { useRef } from 'react';
import { useGlobalData } from "./GlobalDataContext";

const emptySzonyeg: SzonyegInterface =
{
  "id": 0,
  "cikkszam": "",
  "title": "",
  "description": "",
  "price": 0,
  "discountPrice": 0,
  "alak": "téglalap",
  "allapot": "Új",
  "anyag": [],
  "keszites": "Kézi",
  "szarmazasiHely": "",
  "szin": [],
  "kepekSzama": 6,
  "categories": ["• Legnépszerűbbek"],
  "width": 0,
  "height": 0,
  "gepi": false,
  "futo": false,
  "csomoszam": 0
}


export default function Table({ szonyegekJson }: { szonyegekJson: SzonyegInterface[] }) {

  const [openGenModal, setOpenGenModal] = useState(false);


  const [activeColumns, setActiveColumns] = useState(beviteliModok[0].value)

  const [szonyegek, setSzonyegek] = useState(szonyegekJson)

  const [bunchGeneratedSzonyegek, setBunchGeneratedSzonyegek] = useState<string[]>([])
  const [bunchFromTo, setBunchFromTo] = useState({ from: "0", to: "0", gepi: false })

  const imageFolderUrl = useGlobalData().globalData.url


  function getActiveColumns() {
    const columns = ColumnList.filter((column) => activeColumns.includes(column.id))

    return columns as ColumnInterface[]
  }


  function automation(keyChange: keyof SzonyegInterface, newValue: any, szonyeg: SzonyegInterface) {

    switch (keyChange) {
      case "cikkszam":
        if (newValue.indexOf("G") > -1) {

          return {
            ...szonyeg,
            gepi: true,
            keszites: "Gépi",
            categories: ["Gépi szőnyegek", "• Legnépszerűbbek"],
          }

        }
        if (newValue.indexOf("G") === -1 && szonyeg.title.toLowerCase().indexOf("kelim") === -1) {

          return {
            ...szonyeg,
            gepi: false,
            keszites: "Kézi",
            categories: ["Kézi csomózás", "• Legnépszerűbbek"],
          }

        }
        return szonyeg
        break;
      case "title":
        if (szonyeg.title.toLowerCase().indexOf("kelim") > -1) {
          return {
            ...szonyeg,
            gepi: false,
            keszites: "Kézi Szőttes",
            categories: ["Kelimek(kézi szőttes)", "• Legnépszerűbbek"],
            anyag: ["Gyapjú"],
            szarmazasiHely: "Afganisztán",
            csomoszam: 0
          }
        }
        if (szonyeg.title.toLowerCase().indexOf("vegyes") > -1) {
          return {
            ...szonyeg,
            gepi: false,
            keszites: "Vegyes",
            categories: ["Vegyes technika", "• Legnépszerűbbek"],
            anyag: ["Vegyes", "Műszál"]
          }
        }
        return szonyeg
        break;
      default:
        return szonyeg

    }
  }





  function editSzonyeg(id: number, editedValues: SzonyegInterface) {
    const autoTransformedSzonyegek = (szonyeg: SzonyegInterface) => {
      let transformed = { ...editedValues }
      for (const key of Object.keys(szonyeg)) {
        transformed = automation(key as keyof SzonyegInterface, transformed[key as keyof SzonyegInterface] as any, transformed);
      }
      return transformed;
    };

    const newSzonyegArray = szonyegek.map(szonyeg =>
      szonyeg.id === id ? autoTransformedSzonyegek(szonyeg) : szonyeg
    );

    setSzonyegek([...newSzonyegArray]); 
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

  function FromToHandler(direction: string, value: string) {
    if (!!!parseInt(value.replace(/\D/g, ''))) return;

    let from: number = 0
    let to: number = 0
    let gepi = bunchFromTo.gepi

    switch (direction) {
      case "from":
        gepi = (value.indexOf("G") > -1);
        from = parseInt(value.replace(/\D/g, ''))
        setBunchFromTo({ ...bunchFromTo, from: value, gepi: gepi })
        to = parseInt(bunchFromTo.to.replace(/\D/g, ''))
        break;
      case "to":
        from = parseInt(bunchFromTo.from.replace(/\D/g, ''))
        to = parseInt(value.replace(/\D/g, ''))
        setBunchFromTo({ ...bunchFromTo, to: value })
        break;
    }


    if (from < to) {
      let newitems: string[] = []

      for (let i = from; i < to + 1; i++) {
        newitems = [...newitems, (bunchFromTo.gepi ? "G" : "") + i]
      }

      setBunchGeneratedSzonyegek(newitems)
    }
  }

  function generalas() {
    if (bunchGeneratedSzonyegek.length === 0) return;

    let generaltSzonyegek: SzonyegInterface[] = []

    for (let i = 0; i < bunchGeneratedSzonyegek.length; i++) {
      let cikkszam = bunchGeneratedSzonyegek[i];

      let newSzonyeg = emptySzonyeg

      if (bunchFromTo.gepi) {
        newSzonyeg = {
          ...newSzonyeg,
          gepi: bunchFromTo.gepi,
          keszites: "Gépi",
          categories: ["Gépi szőnyegek", "• Legnépszerűbbek"],
          anyag: ["Műszál"],
          cikkszam: cikkszam,
          id: newId() + i
        }
      } else {
        newSzonyeg = {
          ...newSzonyeg,
          gepi: bunchFromTo.gepi,
          keszites: "Kézi",
          categories: ["Kézi csomózású", "• Legnépszerűbbek"],
          anyag: ["Gyapjú"],
          cikkszam: cikkszam,
          id: newId() + i
        }
      }


      generaltSzonyegek.push(newSzonyeg)

    }

    setOpenGenModal(false)
    setSzonyegek([...szonyegek, ...generaltSzonyegek])

  }

  function exportHandle() {
    CSVExport(szonyegek, imageFolderUrl)
  }

  const tableWrapperRef = useRef(null);


  /*   function horizontalScoll(e: any) {
      let tw = document.querySelector("#tableWrapper")
      if (!tw) return
      if(e.deltaY < 0) {
        
        tw.scrollLeft -=30
      } else {
        tw.scrollLeft +=30
      }
    } */





  return (<>

    <div className="flex justify-between my-4">

      <Button onClick={() => setOpenGenModal(true)}>Cikkszám generálás</Button>

      <SelectPicker label="Bevitel" searchable={false} value={activeColumns} cleanable={false} onChange={e => setActiveColumns(e as any)} data={beviteliModok} style={{ width: 224 }} />

      <Button appearance="primary" disabled={szonyegek.length === 0} onClick={exportHandle}>
        CSV EXPORT
      </Button>



    </div>

    <Modal size={400} backdrop="static" open={openGenModal} onClose={() => setOpenGenModal(false)}>

      <Modal.Body>
        <p className="mb-2">Szőnyeg generálás, első és utolsó címkeazonosító megadásával.</p>
        <div className="flex items-center my-3 ">
          <Input type="text" placeholder="0000" onChange={(value) => FromToHandler("from", value)} /><span>-</span>
          <Input type="text" placeholder="0000" onChange={(value) => FromToHandler("to", value)} />
        </div>
        {bunchGeneratedSzonyegek.length} darab


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenGenModal(false)} appearance="subtle" size="sm">
          Mégse
        </Button>
        <Button appearance="primary" size="sm" disabled={bunchGeneratedSzonyegek.length === 0} onClick={generalas}>
          Generálás
        </Button>
      </Modal.Footer>
    </Modal>

    <div className="relative m-1 overflow-x-auto shadow-md sm:rounded-lg max-w-[80vw]">

      <div id="tableWrapper" ref={tableWrapperRef} className="overflow-auto" >
        <table className="w-full text-sm text-left text-gray-500 table-fixed ">
          <thead className="text-white uppercase bg-blue-600 ">
            <tr className="my-3 h-[3rem]">
              {
                getActiveColumns().map(col => <th scope="col" key={"column_" + col.id} id={"column_" + col.id} className="!p-[.5rem]">{col.name}</th>)
              }
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>

            {szonyegek && szonyegek.map(szonyeg =>
              <Row key={szonyeg.id} Szonyeg={szonyeg} ActiveColumns={getActiveColumns()} edit={editSzonyeg} remove={removeSzonyeg} />
            )}




          </tbody>

        </table>
      </div>


    </div>
    <IconButton className="!mt-4 " appearance="primary" icon={<AddOutlineIcon />} onClick={addSzonyeg} > Szőnyeg hozzáadás</IconButton>
  </>

  )
}