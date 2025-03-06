import meretek from "../data/meretek.json"

const getSize = (szelesseg: number, hosszusag: number):string => {
    if (szelesseg < 10 || szelesseg === undefined || hosszusag < 10 || hosszusag === undefined) return ""

    const meret = meretek.find(m =>
        szelesseg >= m.szelesseg.min && szelesseg <= m.szelesseg.max &&
        hosszusag >= m.hosszusag.min && hosszusag <= m.hosszusag.max
    );
    return meret ? meret.name : 'Nincs megfelelő méret';

}

export default getSize