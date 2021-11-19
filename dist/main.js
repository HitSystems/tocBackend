"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const axios_1 = require("axios");
require('./sincro/sincro.service');
axios_1.default.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://localhost:3001') : ('http://54.74.52.150:3001');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: {
            origin: true,
            credentials: true
        } });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map