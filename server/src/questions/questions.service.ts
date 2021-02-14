import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QUESTIONS_MODEL_NAME } from 'src/constants';
import { Question } from './interfaces/question.interface';
import * as  fs from 'fs';


@Injectable()
export class QuestionsService implements OnModuleInit {

    constructor(@InjectModel(QUESTIONS_MODEL_NAME) private questionModel: Model<Question>) { }


    async onModuleInit(): Promise<void> {

        const questionsFile: any = fs.readFileSync("assets/db/questions.json")
        const questions = await this.questionModel.find();

        if (questions.length > 0) return;

        await this.questionModel.insertMany(JSON.parse(questionsFile))
    }


    async findRandomQuestions(): Promise<Question[]> {

        const questions: Question[] = await this.questionModel.aggregate([
            { $match: {} },
            { $sample: { size: 5 } }, // $sample return random values with selected size
            {
                $project: {
                    "answers.point": 0,
                    "__v": 0,
                }
            }
        ])

        if (questions.length) {
            questions.forEach((question: Question) => {
                return question.answers.sort(() => Math.random() - 0.5)
            })
        }

        return questions
    }


    async checkAnswer(questionId: string, answerId: string): Promise<{ correct: boolean }> {
        const question: Question = await this.questionModel.findOne({ _id: questionId, "answers": { $elemMatch: { _id: answerId } } })
        if (question.answers.filter(answer => answer._id == answerId && answer.point > 0).length > 0) {
            return { correct: true }
        }
        return { correct: false }
    }

}
