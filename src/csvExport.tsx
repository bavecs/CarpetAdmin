import SzonyegInterface from "./components/interfaces/szonyeg";
import getImages from "./lib/getPhotoUrls";
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

    szonyegek.forEach((szonyeg) => {
        let images = getImages(szonyeg.kepekSzama, imageFolderUrl, szonyeg.cikkszam)

        let finalSzonyeg = {
            "col_1": quotedString(szonyeg.title),
            "col_2": quotedString(szonyeg.description),
            "col_3": szonyeg.cikkszam,
            "col_4": szonyeg.price,
            "col_5": szonyeg.discountPrice,
            "col_6": szonyeg.alak,
            "col_7": szonyeg.allapot,
            "col_8": szonyeg.anyag,
            "col_9": szonyeg.alak,
            "col_10": szonyeg.keszites,
            "col_11": szonyeg.keszites,
            "col_12": "Meret",
            "col_13": szonyeg.szarmazasiHely,
            "col_14": wooStringArray(szonyeg.szin),
            "col_15": wooStringArray(images),
            "col_16": szonyeg.categories,
            "col_17": szonyeg.width,
            "col_18": szonyeg.height,
            "col_19": szonyeg.csomoszam,
            "col_20": "Cimkek",
            "col_21": "Négyzetméter (m²)",
            "col_22": "Inspiraciok",
            "col_23": "Badge ",
            "col_24": "Badge szín"
            }

            finalSzonyegArray = [...finalSzonyegArray,
                Object.values(finalSzonyeg).join(",")]
    })

    let oszlopokArray = Object.values(oszlopok).join(",")

    const csvString = [oszlopokArray, ...finalSzonyegArray].join("\n");


      var element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
    element.target = '_blank';
    element.download = 'export.csv';
    element.click();
 

    console.log(csvString)

}
