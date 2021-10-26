"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexion = void 0;
const mongodb_1 = require("mongodb");
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const client = new mongodb_1.MongoClient(uri);
const conexion = client.connect();
exports.conexion = conexion;
//# sourceMappingURL=mongodb.js.map