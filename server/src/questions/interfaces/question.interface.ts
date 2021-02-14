import { Document } from "mongoose";

export interface Question extends Document {
    readonly _id: string;
    readonly questionTitle: string;
    readonly answers: Answer[]
}


export interface Answer {
    readonly _id: string;
    readonly answerTitle: string;
    readonly point: number;
}