
import CarpetIcon from "../../../public/carpet-2.png"
import CartpetError from "../../../public/carpet-2-error.png"
import { useGlobalData } from "../GlobalDataContext"

export default function IndexKep({ value }: { value: { kepekSzama: number, cikkszam: string }, onChange: any }) {
    const {kepekSzama, cikkszam} = value

    const url = useGlobalData().globalData.url



    let image = CarpetIcon

    if(kepekSzama >= 1 && cikkszam.length > 3 && url.length > 5) {
        image = url + "/"+cikkszam+"_1.png"
    } 

    return (
        <img
            src={image}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = CartpetError;
            }}
            loading="lazy"
            className="p-3 text-center"
        />

    )
}