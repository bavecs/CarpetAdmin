import SzonyegInterface from "./szonyeg";

export default interface ColumnInterface {
    "id": number,
    "name": string,
    "type": string,
    "dataSrc": keyof SzonyegInterface
  }