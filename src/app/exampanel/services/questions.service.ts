import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AnswerSubmitModel } from "../model/Submitanswer.model";
import { SavedAnswerModel } from "../model/Savedanswer.model";

@Injectable({
  providedIn: "root",
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getQuestionsForTestSeries(id: any,userId:any): Observable<any> {
    //console.log("getQuestionsForTestSeries:"+id);
    return this.http.get("http://localhost:8080/questionLayout/getQuestions", {
      params: { courseId: id,userId: userId },
    });
  }

  
  postSavedAnswer(savedAnswerModel: SavedAnswerModel) {
    //console.log(savedAnswerModel);
    return this.http.post(
      "http://localhost:8080/reportDetail/saveReportQuestionWise",
      savedAnswerModel
    );
  }

  postSubmittedAnswer(submitModel: AnswerSubmitModel) {
    //console.log(submitModel);
    return this.http.post(
      "http://localhost:8080/reportOverall/saveOverallReport",
      submitModel
    );
  }
}
