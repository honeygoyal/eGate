import { Injectable, SkipSelf } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AnswerSubmitModel } from "../model/Submitanswer.model";
import { SavedAnswerModel } from "../model/Savedanswer.model";
import { environment } from "./../../../environments/environment";
@Injectable()
export class QuestionsService {
  constructor( private http: HttpClient) {}

  getQuestionsForTestSeries(id: any, userId: any): Observable<any> {
    return this.http.get(environment.getQuestionsForTestSeries, {
      params: { courseId: id, userId: userId },
    });
  }



  postSavedAnswer(savedAnswerModel: SavedAnswerModel) {
    return this.http.post(environment.postSavedAnswer, savedAnswerModel);
  }

  postSubmittedAnswer(submitModel: AnswerSubmitModel) {
    return this.http.post(environment.postSubmittedAnswer, submitModel);
  }
}
