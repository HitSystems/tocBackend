import { Controller, Get } from '@nestjs/common';
@Controller('version')
export class VersionController {
    @Get('tocGame')
    getVersion() {
        console.log("Eooo: ", process.env.npm_package_version);
        return process.env.npm_package_version;
    }
}