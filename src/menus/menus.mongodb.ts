import { conexion } from "../conexion/mongodb";

// export async function getPromociones(): Promise<any> {
//     const database = (await conexion).db('tocgame');
//     const menus = database.collection('menus');
//     const resultado = await (await menus.find()).toArray();
    
//     return resultado;
// }

export async function getMenus(): Promise<any> {
    const database = (await conexion).db('tocgame');
    const menus = database.collection('menus');
    const resultado = await (await menus.find()).toArray();
    
    return resultado;
}

export async function getTecladoMain(nombreMenu: string): Promise<any> {
    const database = (await conexion).db('tocgame');
    const teclas = database.collection('teclas');
    const resultado = await (await teclas.find({nomMenu: nombreMenu})).toArray();
    
    return resultado;
}

