import { conexion } from "../conexion/mongodb";
import { ParametrosInterface } from "./parametros.interface";

export async function getParametros() {
    const database = (await conexion).db('tocgame');
    const parametros = database.collection('parametros');
    const resultado = await parametros.findOne({_id: "PARAMETROS"});
    
    return resultado;
}

export async function setParametros(params: ParametrosInterface) {
    const database = (await conexion).db('tocgame');
    const parametros = database.collection('parametros');
    const resultado = await parametros.updateOne({_id: "PARAMETROS"}, params);
    
    return resultado;
}

export async function setUltimoTicket(idTicket: number) {
    const database = (await conexion).db('tocgame');
    const parametros = database.collection('parametros');
    const resultado = await parametros.updateOne({_id: "PARAMETROS"}, {$set: {"ultimoTicket": idTicket}}, {upsert: true});
    
    return resultado;
}