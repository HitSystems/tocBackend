import { parametrosInstance } from "./parametros/parametros.clase";

const escpos = require('escpos');
const exec = require('child_process').exec;
const os = require('os');
escpos.USB = require('escpos-usb');
escpos.Serial = require('escpos-serialport');
escpos.Screen = require('escpos-screen');

export class Dispositivos {
    async getDevice() {
        const parametros = await parametrosInstance.getEspecialParametros();
        try {
            if (parametros.tipoImpresora == 'USB') {
                const device: number = new escpos.USB(parametros.impresoraUsbInfo.vid.toUpperCase(), parametros.impresoraUsbInfo.pid.toUpperCase());
                return device;
            } else if (parametros.tipoImpresora == 'SERIE') {
                const device = new escpos.Serial('/dev/ttyS0', {
                    baudRate: 115200,
                    stopBit: 2
                });
                return device;
            } else {
                console.log("Parametros de impresora no configurados");
                return null;
            }
        } catch(err) {
            console.log(err);
            return null;
        }        
    }
}
