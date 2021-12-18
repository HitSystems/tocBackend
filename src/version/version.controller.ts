import { Controller, Get } from '@nestjs/common';
@Controller('version')
export class VersionController {
    @Get('tocGame')
    getVersion() {
        return process.env.npm_package_version;
    }
}