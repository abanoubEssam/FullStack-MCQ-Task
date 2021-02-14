import { Schema } from 'mongoose';


const AnswersSchema: Schema = new Schema({
    answerTitle: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        defailt: 0
    }
})

export const QuestionsSchema: Schema = new Schema(
    {
        questionTitle: {
            type: String,
            required: true
        },
        answers: {
            type: [AnswersSchema]
        }
    }
);


