import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mcq-db/master-linux-task'),
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
