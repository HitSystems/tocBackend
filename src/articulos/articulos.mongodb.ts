import { InsertManyResult } from "mongodb";
import { conexion } from "../conexion/mongodb";

export async function getInfoArticulo(idArticulo: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const articulos = database.collection('articulos');
    const resultado = await articulos.findOne({_id: idArticulo});
    
    return resultado;
}

export async function insertarArticulos(arrayArticulos, esTarifaEspecial = false) {
    const apuntoColeccion = (esTarifaEspecial == true) ? ('articulosTarifaEspecial') : ('articulos');
    if (await borrarArticulos(esTarifaEspecial)) {
        const database = (await conexion).db('tocgame');
        const articulos = database.collection(apuntoColeccion);
        const resultado = await articulos.insertMany(arrayArticulos);
        
        return resultado;
    } else {
        const res: InsertManyResult<any> = {
            acknowledged: false,
            insertedCount: 0,
            insertedIds: null
        } 
        return res;
    }
}

export async function borrarArticulos(esTarifaEspecial: boolean) {
    try {
        const apuntoColeccion = (esTarifaEspecial == true) ? ('articulosTarifaEspecial') : ('articulos');
        const database = (await conexion).db('tocgame');
        const articulos = database.collection(apuntoColeccion);
        const resultado = await articulos.drop();
        return resultado;
    } catch(err) {
        if (err.codeName == 'NamespaceNotFound') {
            return true;
        } else {
            return false;
        }
    }
}

export async function getInfoArticuloTarifaEspecial(idArticulo: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const articulos = database.collection('articulosTarifaEspecial');
    const resultado = await articulos.findOne({_id: idArticulo});
    return resultado;
}

export async function getSuplementosArticulo(idArticulo: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const articulos = database.collection('articulos');
    const resultado = await articulos.findOne({_id: idArticulo, suplementos: { $exists: true, $ne: [] }});
    return resultado;
}

export async function getInfoSuplemento(idArticulo: number, idSuplemento: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const articulos = database.collection('articulos');
    const resultado = await articulos.findOne({_id: idArticulo, suplementos: { $elemMatch: { id: {$eq: idSuplemento} }}});
    return resultado;
}
