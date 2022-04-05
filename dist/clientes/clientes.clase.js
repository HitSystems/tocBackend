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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteInstance = exports.Clientes = void 0;
const schClientes = __importStar(require("./clientes.mongodb"));
const axios_1 = __importDefault(require("axios"));
const parametros_clase_1 = require("../parametros/parametros.clase");
class Clientes {
    constructor() {
        this.clienteVip = false;
    }
    buscar(cadena) {
        return schClientes.buscar(cadena).then((res) => {
            if (res.length > 0) {
                return res;
            }
            else {
                return [];
            }
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }
    getClienteByID(idCliente) {
        return schClientes.getClieneteByID(idCliente).then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
    insertarClientes(arrayClientes) {
        return schClientes.insertarClientes(arrayClientes).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    getPuntosCliente(idClienteFinal) {
        return axios_1.default.post('clientes/getPuntosCliente', { database: parametros_clase_1.parametrosInstance.getParametros().database, idClienteFinal }).then((res) => {
            if (res.data.error == false) {
                return res.data.info;
            }
            else {
                console.log(res.data.error);
                return 0;
            }
        }).catch((err) => {
            console.log(err);
            return 0;
        });
    }
    setEstadoClienteVIP(nuevoEstado) {
        this.clienteVip = nuevoEstado;
    }
    getEstadoClienteVIP() {
        return this.clienteVip;
    }
}
exports.Clientes = Clientes;
exports.clienteInstance = new Clientes();
//# sourceMappingURL=clientes.clase.js.map