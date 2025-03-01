import SzonyegInterface from "../components/interfaces/szonyeg"

export default interface FeloltesInterface {
    year: number,
    month: number,
    kepeklink: string,
    uploadDate: Date | null,
    szonyegek: Array<SzonyegInterface>
}