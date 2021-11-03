import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';

axios.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://localhost:3001') : ('http://54.74.52.150:3001');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: true,
    credentials: true
  }});
  // app.enableCors();
  await app.listen(3000);
}
bootstrap();
