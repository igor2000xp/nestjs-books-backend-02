import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './core/config/configurationType';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //подключение глобального validate pipe https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );

  //разрешены запросы с любых доменов
  app.enableCors({
    origin: '*', // Разрешает запросы с любых доменов
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Разрешенные методы
    credentials: true, // Включает передачу cookies
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Description of BD for TownSend')
    .setDescription('Docs for REST API')
    .setVersion('1.0.0')
    .addTag('Created by BackTeam')
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, { useGlobalPrefix: true });

  const configService = app.get(ConfigService<ConfigurationType>);
  const port = configService.get('apiSettings.PORT', { infer: true })!;
  await app.listen(port);
}
bootstrap();
