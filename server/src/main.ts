import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule , {cors: true});
  const cors = {
    origin: [
      'http://localhost:4200',
      'http://localhost:5030',
      'http://localhost',
      '*',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
    ]
  };

  const whitelist = [
    'http://localhost:4200',
    'http://localhost:3000',
  ]
  app.enableCors(cors);
// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    console.log("header allowed");
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
  const port = process.env.PORT || 3001
  await app.listen(port);
  logger.log(`Server listening on port ${port}`)
}
bootstrap();
