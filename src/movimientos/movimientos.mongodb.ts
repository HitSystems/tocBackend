import { conexion } from "../conexion/mongodb";

export async function getMovimientosIntervalo(inicioTime: number, finalTime: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const movimientos = database.collection('movimientos');
    const resultado = await (await movimientos.find({_id: {$lte: finalTime, $gte: inicioTime}})).toArray();
    
    return resultado;
}

export async function nuevaSalida(data) {
    const database = (await conexion).db('tocgame');
    const movimientos = database.collection('movimientos');
    const resultado = await movimientos.insertOne(data);
    
    return resultado;
}

/* Los códigos de barras son siempre para SALIDAS */
export async function getUltimoCodigoBarras(): Promise<any> {
    const database = (await conexion).db('tocgame');
    const codigoBarras = database.collection('codigo-barras');
    const resultado = await codigoBarras.findOne({_id: 'CUENTA'});
    return resultado;
}

export async function resetContadorCodigoBarras() {
    const database = (await conexion).db('tocgame');
    const codigoBarras = database.collection('codigo-barras');
    const resultado = await codigoBarras.updateOne({_id: 'CUENTA'}, {$set: { "ultimo": 0 }}, { upsert: true });
    return resultado;
}

export async function actualizarCodigoBarras() {
    const database = (await conexion).db('tocgame');
    const codigoBarras = database.collection('codigo-barras');
    const resultado = await codigoBarras.updateOne({_id: 'CUENTA'}, { $inc: { ultimo: 1 } }, { upsert: true });
    return resultado;
}

// export async function getMovimiento(tipo: string): Promise<any> {
//     const database = (await conexion).db('tocgame');
//     const movimientos = database.collection('movimientos');
//     const resultado = await (await movimientos.find({_id: {$lte: finalTime, $gte: inicioTime}})).toArray();
    
//     return resultado;
// }
