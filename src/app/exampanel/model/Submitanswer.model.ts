import { EmailValidator } from "@angular/forms";
import { Useranswer } from "./Useranswer.model";

export interface AnswerSubmitModel {
  courseId: number;
  status: string;
  totalTime: string;
  userId: number;
}
