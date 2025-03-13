import { useGlobalData } from "./components/GlobalDataContext";
import SzonyegInterface from "./components/interfaces/SzonyegInterface";
import getImages from "./lib/getPhotoUrls";
import getSize from "./lib/getSize";
import { quotedString, wooStringArray } from "./lib/stringTools";

const oszlopok = {
    "col_1": "Termeknev",
    "col_2": "Leíras",
    "col_3": "Cikkszam",
    "col_4": "Ar",
    "col_5": "Akcios ar",
    "col_6": "Alak",
    "col_7": "Allapot",
    "col_8": "Anyag",
    "col_9": "Forma",
    "col_10": "Keszítes",
    "col_11": "Keszítes modja",
    "col_12": "Meret",
    "col_13": "Szarmazasi hely",
    "col_14": "Szín",
    "col_15": "Termekkepek",
    "col_16": "Termekkategoriak",
    "col_17": "Szelesseg",
    "col_18": "Hosszusag",
    "col_19": "Csomoszam",
    "col_20": "Cimkek",
    "col_21": "Négyzetméter (m²)",
    "col_22": "Inspiraciok",
    "col_23": "Badge",
    "col_24": "Badge szín"
    }

export default function CSVExport(szonyegek:SzonyegInterface[], imageFolderUrl:string) {


    let finalSzonyegArray:any[] = []

    if(!imageFolderUrl) {
        alert('Nincs érvényes kép url ')
        console.log({useGlobalData})
        return
    }

    szonyegek.forEach((szonyeg) => {
        let images = getImages(szonyeg.kepekSzama, imageFolderUrl, szonyeg.cikkszam)

        let finalSzonyeg = {
            "col_1": quotedString(szonyeg.title),
            "col_2": quotedString(szonyeg.description),
            "col_3": szonyeg.cikkszam,
            "col_4": szonyeg.price,
            "col_5": szonyeg.price / 2,
            "col_6": wooStringArray(szonyeg.alak),
            "col_7": szonyeg.allapot,
            "col_8": wooStringArray(szonyeg.anyag),
            "col_9": wooStringArray(szonyeg.alak),
            "col_10": wooStringArray(szonyeg.keszites),
            "col_11": wooStringArray(szonyeg.keszites),
            "col_12": getSize(szonyeg.width, szonyeg.height),
            "col_13": szonyeg.szarmazasiHely,
            "col_14": wooStringArray(szonyeg.szin),
            "col_15": wooStringArray(images),
            "col_16": wooStringArray(szonyeg.categories),
            "col_17": szonyeg.width,
            "col_18": szonyeg.height,
            "col_19": szonyeg.csomoszam,
            "col_20": wooStringArray(szonyeg.title),
            "col_21": szonyeg.width * szonyeg.height / 10000,
            "col_22": 'a:3:{i:0;s:5:"15002";i:1;s:5:"15077";i:2;s:5:"15079";}',
            "col_23": "",
            "col_24": ""
            }

            finalSzonyegArray = [...finalSzonyegArray,
                Object.values(finalSzonyeg).join(",")]
    })

    let oszlopokArray = Object.values(oszlopok).join(",")

    const csvString = [oszlopokArray, ...finalSzonyegArray].join("\n");


    var element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
    element.target = '_blank';


    const date = new Date()
    const dateString = date.getFullYear().toString()   + ".0" + (date.getMonth() + 1).toString() + "." +date.getDate().toString()


    element.download = szonyegek.length + 'db_export_' + dateString + '.csv'
    element.click();
 
}
