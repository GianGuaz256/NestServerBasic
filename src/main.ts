import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Started server in mode: ${config.node_env}`)

  app.setGlobalPrefix('api');

  //Enable Cors
  if (config.node_env === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: '*',
      methods: 'GET, HEAD, PATCH, POST, DELETE, OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });
  }
  
  app.use(helmet())
  
  await app.listen(config.server_port);
}
bootstrap();
