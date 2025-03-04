import SzonyegInterface from "./szonyeg";

export type ColumnDaraSrc = keyof SzonyegInterface | Partial<Record<keyof SzonyegInterface, string | number | string[] | boolean >>;
export default interface ColumnInterface {
    "id": number,
    "name": string,
    dataSrc: ColumnDaraSrc,
    "component": string,
    "options"?: string[]
  }