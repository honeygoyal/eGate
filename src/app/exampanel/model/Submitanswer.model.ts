import { EmailValidator } from "@angular/forms";
import { Useranswer } from "./Useranswer.model";

export interface AnswerSubmitModel {
  email: string;
  test_id: String;
  time_left: string;
  answerModel: Useranswer[];
}
