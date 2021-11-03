import * as schTeclas from './teclado.mongodb';

export class TecladoClase {
    insertarTeclas(arrayTeclas) {
        return schTeclas.insertarTeclas(arrayTeclas).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
export const tecladoInstance = new TecladoClase();