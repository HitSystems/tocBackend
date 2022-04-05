"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametrosInstance = exports.ParametrosClase = void 0;
const schParametros = __importStar(require("./parametros.mongodb"));
const schTickets = __importStar(require("../tickets/tickets.mongodb"));
const TIPO_USB = 'USB';
const TIPO_SERIE = 'SERIE';
const TIPO_CLEARONE = 'CLEARONE';
const TIPO_3G = '3G';
const TIPO_ENTRADA = 'ENTRADA';
const TIPO_SALIDA = 'SALIDA';
const parametrosVacios = {
    _id: '',
    licencia: 0,
    codigoTienda: 0,
    database: '',
    nombreEmpresa: '',
    nombreTienda: '',
    tipoImpresora: TIPO_USB,
    tipoDatafono: TIPO_CLEARONE,
    impresoraCafeteria: 'NO',
    clearOneCliente: 0,
    clearOneTienda: 0,
    clearOneTpv: 0,
    botonesConPrecios: 'No',
    prohibirBuscarArticulos: 'No',
    ultimoTicket: -1,
    idCurrentTrabajador: -1,
    impresoraUsbInfo: { vid: '', pid: '' },
    token: undefined
};
class ParametrosClase {
    constructor() {
        schParametros.getParametros().then((infoParams) => {
            if (infoParams != null) {
                schTickets.getUltimoTicket().then((ultimoIDTicket) => {
                    infoParams.ultimoTicket = ultimoIDTicket;
                    this.parametros = infoParams;
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                this.parametros = parametrosVacios;
            }
        }).catch((err) => {
            console.log(err);
            this.parametros = parametrosVacios;
        });
    }
    getParametros() {
        return this.parametros;
    }
    getEspecialParametros() {
        return schParametros.getParametros().then((infoParams) => {
            return infoParams;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
    setParametros(params) {
        this.parametros = params;
        return schParametros.setParametros(this.parametros).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    todoInstalado() {
        const params = this.getParametros();
        if (params._id === '' || params.licencia === 0 || params.codigoTienda === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    checkParametrosOK(params) {
        if (params.licencia > 0 && params.codigoTienda > 0 && params.database.length > 0 && params.nombreEmpresa.length > 0 && params.nombreTienda.length > 0 && params.tipoImpresora.length > 0 && params.tipoDatafono.length > 0) {
            return true;
        }
    }
    actualizarParametros() {
        schParametros.getParametros().then((infoParams) => {
            if (infoParams != null) {
                this.parametros = infoParams;
            }
            else {
                this.parametros = parametrosVacios;
            }
        }).catch((err) => {
            console.log(err);
            this.parametros = parametrosVacios;
        });
    }
    setUltimoTicket(idTicket) {
        return schParametros.setUltimoTicket(idTicket).then((res) => {
            if (res.acknowledged) {
                return true;
            }
            else {
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    setVidAndPid(vid, pid) {
        return schParametros.setVidAndPid(vid, pid).then((res) => {
            if (res.acknowledged) {
                return true;
            }
            else {
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    setIpPaytef(ip) {
        return schParametros.setIpPaytef(ip).then((res) => {
            if (res.acknowledged) {
                return true;
            }
            else {
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
exports.ParametrosClase = ParametrosClase;
const parametrosInstance = new ParametrosClase();
exports.parametrosInstance = parametrosInstance;
//# sourceMappingURL=parametros.clase.js.map