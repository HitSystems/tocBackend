import { CajaInterface } from "./caja.interface";
export declare function getInfoCaja(): Promise<any>;
export declare function setInfoCaja(data: CajaInterface): Promise<import("bson").Document | import("mongodb").UpdateResult>;
export declare function nuevoItemSincroCajas(unaCaja: any): Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
