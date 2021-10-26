import { conexion } from "../conexion/mongodb";
import { CajaForSincroInterface, CajaInterface } from "./caja.interface";

export async function getInfoCaja(): Promise<any> {
    
    const database = (await conexion).db('tocgame');
    const caja = database.collection('cajas');
    const resultado = await caja.findOne({_id: "CAJA"});
    return resultado;
}

export async function setInfoCaja(data: CajaInterface) {
    
    const database = (await conexion).db('tocgame');
    const caja = database.collection('cajas');
    const resultado = await caja.replaceOne({
        _id: "CAJA"
    },
    data,
    {upsert: true});
    
    return resultado;
}

export async function nuevoItemSincroCajas(unaCaja) {
    
    const database = (await conexion).db('tocgame');
    const sincroCajas = database.collection('sincro-cajas');
    const resultado = await sincroCajas.insertOne(unaCaja);
    
    return resultado;
}

// export async function contarClearOne(unaCaja) {
    
//     const database = (await conexion).db('tocgame');
//     const caja = database.collection('cajas');
//     const resultado = await caja.insertOne(unaCaja);
    
//     return resultado;
// }
