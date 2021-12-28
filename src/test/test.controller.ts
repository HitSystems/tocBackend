import { Body, Controller, Post } from '@nestjs/common';
import { impresoraInstance } from 'src/impresora/impresora.class';

@Controller('test')
export class TestController {
    @Post('imprimirAlgo')
    imprimirAlgo(@Body() parms) {
        impresoraInstance.imprimirTest();
    }
}
