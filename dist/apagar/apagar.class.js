"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apagarinstance = exports.Apagar = void 0;
const exec = require('child_process').exec;
class Apagar {
    apagarEquipo() {
        exec("sudo -s shutdown now");
    }
}
exports.Apagar = Apagar;
exports.apagarinstance = new Apagar();
//# sourceMappingURL=apagar.class.js.map