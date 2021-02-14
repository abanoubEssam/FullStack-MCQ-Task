import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QUESTIONS_MODEL_NAME } from 'src/constants';
import { QuestionsSchema } from './schemas/question.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: QUESTIONS_MODEL_NAME, schema: QuestionsSchema }])],
  providers: [QuestionsService],
  controllers: [QuestionsController]
})
export class QuestionsModule { }
