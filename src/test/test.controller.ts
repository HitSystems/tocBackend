import { Body, Controller, Post } from '@nestjs/common';
import { impresoraInstance } from 'src/impresora/impresora.class';
import { v4 as uuidv4 } from 'uuid';

@Controller('test')
export class TestController {
    @Post('test')
    imprimirAlgo(@Body() parms) {
        return uuidv4();
    }
}
