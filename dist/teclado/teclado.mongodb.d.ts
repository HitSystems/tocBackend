import { InsertManyResult } from "mongodb";
export declare function insertarTeclas(arrayTeclas: any): Promise<InsertManyResult<import("bson").Document>>;
export declare function borrarArticulos(): Promise<boolean>;
