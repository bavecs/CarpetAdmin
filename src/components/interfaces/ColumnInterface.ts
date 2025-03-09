import SzonyegInterface from "./SzonyegInterface";

export type ColumnDataSrc = keyof SzonyegInterface | Partial<Record<keyof SzonyegInterface, string | number | string[] | boolean >>;
export default interface ColumnInterface {
    "id": number,
    "name": string,
    dataSrc: ColumnDataSrc,
    "component": string,
    "options"?: string[]
  }