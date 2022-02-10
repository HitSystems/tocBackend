"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const axios_1 = require("axios");
require('./sincro');
<<<<<<< HEAD
axios_1.default.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://63.35.219.5:3001') : ('http://63.35.219.5:3001');
=======
axios_1.default.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://localhost:3001') : ('http://34.78.247.153:3001');
>>>>>>> parent of 47ce931 (SERVIDOR)
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: {
            origin: true,
            credentials: true
        } });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map