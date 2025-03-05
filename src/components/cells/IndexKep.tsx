
import CarpetIcon from "../../../public/carpet-2.png"
import CartpetError from "../../../public/carpet-2-error.png"

export default function IndexKep({ value, onChange }: { value: { kepekSzama: number, cikkszam: string }, onChange: any }) {
    const {kepekSzama, cikkszam} = value

    let image = CarpetIcon

    if(kepekSzama >= 1 && cikkszam.length > 3) {
        image = "https://kabiriszonyeghaz.hu/wp-content/uploads/2025/02/"+cikkszam+"_1.png"
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