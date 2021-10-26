export interface TicketsInterface {
    _id: number,
    timestamp: number,
    total: number,
    lista: {
        _id: number,
        nombre: string,
        promocion: {
            _id: string,
            esPromo: boolean
        },
        subtotal: number,
        unidades: number
    }[],
    tipoPago: string,
    idTrabajador: number,
    tiposIva: {
        base1: number,
        base2: number,
        base3: number,
        valorIva1: number,
        valorIva2: number,
        valorIva3: number,
        importe1: number,
        importe2: number,
        importe3: number
    },
    enviado?: boolean,
    enTransito?: boolean,
    cliente?: string,
    infoClienteVip?: {
        esVip: boolean,
        nif: string,
        nombre: string,
        cp: string,
        direccion: string,
        ciudad: string
    },
    cantidadTkrs?: number
}
