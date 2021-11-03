import { InsertManyResult } from "mongodb";
import { conexion } from "../conexion/mongodb";

export async function getInfoArticulo(idArticulo: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const articulos = database.collection('articulos');
    const resultado = await articulos.findOne({_id: idArticulo});
    
    return resultado;
}

export async function insertarArticulos(arrayArticulos) {
    if (await borrarArticulos()) {
        const database = (await conexion).db('tocgame');
        const articulos = database.collection('articulos');
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

export async function borrarArticulos() {
    try {
        const database = (await conexion).db('tocgame');
        const articulos = database.collection('articulos');
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
    const articulos = database.collection('ArticulosTarifaEspecial');
    const resultado = await articulos.findOne({_id: idArticulo});
    
    return resultado;
}
