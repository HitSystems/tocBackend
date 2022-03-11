import { Body, Controller, Post } from '@nestjs/common';
import { impresoraInstance } from 'src/impresora/impresora.class';

@Controller('test')
export class TestController {
    @Post('test')
    paraMarc(@Body() parms) {
        const resultado = parms.numero+1;
        return "HE VUELTO :D LA SUMA ES: "+ resultado;
    }
}
