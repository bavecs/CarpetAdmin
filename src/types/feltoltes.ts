import SzonyegInterface from "../components/interfaces/SzonyegInterface"

export default interface FeloltesInterface {
    year: number,
    month: number,
    kepeklink: string,
    uploadDate: Date | null,
    szonyegek: Array<SzonyegInterface>
}