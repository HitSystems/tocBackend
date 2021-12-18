import { Controller, Get } from '@nestjs/common';
import { version } from '../../package.json';
@Controller('version')
export class VersionController {
    @Get('tocGame')
    getVersion() {
        return version;
    }
}