import { Controller, Get, Param } from '@nestjs/common';
import { Question } from './interfaces/question.interface';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {

    constructor(
        private readonly _questionsService: QuestionsService
    ) { }

    @Get('/')
    async findQuestions(): Promise<Question[]> {
        return await this._questionsService.findRandomQuestions();
    }

    // check answer correctness
    @Get('/:questionId/answers/:answerId')
    async checkAnswerCorrectness(
        @Param('questionId') questionId: string,
        @Param('answerId') answerId: string,
    ): Promise<{ correct: boolean }> {
        return await this._questionsService.checkAnswer(questionId, answerId);
    }
}
