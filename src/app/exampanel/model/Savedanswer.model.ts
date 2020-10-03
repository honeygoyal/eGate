import { EmailValidator } from "@angular/forms";
import { Useranswer } from "./Useranswer.model";

export interface SavedAnswerModel {
  answerSubmitted: string;
  courseId: number;
  questionId: number;
  questionStatus: string;
  timeTaken: number;
  userId: number;
}
