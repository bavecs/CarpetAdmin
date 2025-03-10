import { useEffect, useState } from "react";
import { InlineEdit, InputGroup, InputPicker } from "rsuite";
import { useGlobalData } from "./GlobalDataContext";

const years = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'].map(
    item => ({ label: item, value: item })
);
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
    item => ({ label: item, value: item })
);

export default function KepekHelye() {
    const d = new Date();

    const {globalData, setGlobalData} = useGlobalData()

    const [urlPre] = useState("https://kabiriszonyeghaz.hu/wp-content/uploads")
    const [month, setMonth] = useState(months[d.getMonth()].value)
    const [year, setYear] = useState(d.getFullYear().toString())


    function getUrl() {
        return urlPre + "/" + year + "/" + month
    }

    useEffect(() => {
        setGlobalData({...globalData, url: getUrl()})
    }, [month, year])


    return <>
        <InputGroup inside className="items-center">
            <InputGroup.Addon>
                Képek mappája:
            </InputGroup.Addon>
            {globalData.url}/
            <InlineEdit showControls={false} style={{ fontWeight: "bold", cursor: "pointer" }} onChange={setYear} value={year}>
                <InputPicker data={years} style={{ fontWeight: "bold" }} cleanable={false} />
            </InlineEdit>
            /
            <InlineEdit showControls={false} style={{ fontWeight: "bold", cursor: "pointer" }} onChange={setMonth} value={month}>
                <InputPicker data={months} style={{ fontWeight: "bold" }} cleanable={false} />
            </InlineEdit>
        </InputGroup>

    </>
}