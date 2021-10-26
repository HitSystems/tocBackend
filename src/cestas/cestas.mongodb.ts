import { conexion } from "../conexion/mongodb";
import { CestasInterface } from "./cestas.interface";

export async function getUnaCesta(): Promise<any> {
    const database = (await conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await cesta.findOne();
    return resultado;
}

export async function getCestaConcreta(idCesta: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await cesta.findOne({_id: idCesta});
    
    return resultado;
}

export async function getAllCestas(): Promise<any> {
    const database = (await conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await (await cesta.find()).toArray();
    
    return resultado;
}

export async function borrarCesta(idCesta: number) {
    const database = (await conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await cesta.deleteOne({_id: idCesta});
    
    return resultado;
}

export async function setCesta(cesta: CestasInterface) {
    const database = (await conexion).db('tocgame');
    const unaCesta = database.collection('cestas');
    const resultado = await unaCesta.replaceOne({_id: cesta._id}, {
        tiposIva: cesta.tiposIva,
        lista: cesta.lista
    }, {upsert: true});
    
    return resultado;
}
