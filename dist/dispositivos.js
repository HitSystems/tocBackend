"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispositivos = void 0;
const parametros_clase_1 = require("./parametros/parametros.clase");
const escpos = require('escpos');
const exec = require('child_process').exec;
const os = require('os');
escpos.USB = require('escpos-usb');
escpos.Serial = require('escpos-serialport');
escpos.Screen = require('escpos-screen');
class Dispositivos {
    async getDevice() {
        const parametros = await parametros_clase_1.parametrosInstance.getEspecialParametros();
        try {
            if (parametros.tipoImpresora == 'USB') {
                const device = new escpos.USB(parametros.impresoraUsbInfo.vid.toUpperCase(), parametros.impresoraUsbInfo.pid.toUpperCase());
                return device;
            }
            else if (parametros.tipoImpresora == 'SERIE') {
                const device = new escpos.Serial('/dev/ttyS0', {
                    baudRate: 115200,
                    stopBit: 2
                });
                return device;
            }
            else {
                console.log("Parametros de impresora no configurados");
                return null;
            }
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
exports.Dispositivos = Dispositivos;
//# sourceMappingURL=dispositivos.js.map