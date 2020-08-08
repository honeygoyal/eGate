import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AnswerSubmitModel } from "../model/Submitanswer.model";

@Injectable({
  providedIn: "root",
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getQuestionsForTestSeries(test_id: string): Observable<any> {
    console.log(test_id);
    return this.http.get("http://localhost:8080/question", {
      params: { test_id: test_id },
    });
  }

  postSubmittedAnswer(submitModel: AnswerSubmitModel) {
    console.log(submitModel);
    return this.http.post(
      "http://localhost:8080/question/submitanswer",
      submitModel
    );
  }
}
