import meretek from "../data/meretek.json"

type meretType = {
    "name": string,
    "woocom_format": string,
    "szelesseg": {"min": number, "max": number},
    "hosszusag": {"min": number, "max": number}
}

const futoMeretek: meretType[] = [
    {
        "name": "Futó S - Kicsi",
        "woocom_format": "Futó S - Kicsi (50-75 x 150-350 cm)",
        "szelesseg": {"min": 40, "max": 80},
        "hosszusag": {"min": 150, "max": 180}
    },
    {
        "name": "Futó M-L",
        "woocom_format": "Futó M-L – Kicsi (75-100 x 180-650 cm)",
        "szelesseg": {"min": 80, "max": 110},
        "hosszusag": {"min": 181, "max": 99999}
    },
]

const fInMatrix = (ar: meretType[], w: number, h: number) => ar.find(m =>
    w >= m.szelesseg.min && w <= m.szelesseg.max &&
    h >= m.hosszusag.min && h <= m.hosszusag.max
);


const getSize = (szelesseg: number, hosszusag: number, toExport:boolean = false):string => {
    if (szelesseg < 10 || szelesseg === undefined || hosszusag < 10 || hosszusag === undefined) return ""

    const objectKey: keyof meretType = toExport ? "woocom_format" : "name"
    let meret: meretType | undefined 

    if (szelesseg > 40 && szelesseg < 110) {
        meret = fInMatrix(futoMeretek, szelesseg, hosszusag)

        if (meret)
            return meret[objectKey] 
    } 

    meret = fInMatrix(meretek, szelesseg, hosszusag)

    return meret ? meret[objectKey] : 'Nincs megfelelő méret';

}

export default getSize