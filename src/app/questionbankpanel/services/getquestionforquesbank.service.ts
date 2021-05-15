import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class GetquestionforquesbankService {

  constructor(private http: HttpClient) { }

  getQuestionsForQuestionBank(id: any, userId: any): Observable<any> {
    console.log(id);
    console.log(userId);
    return this.http.get(environment.getQuestionBank, {
      params: { courseId: id, userId: userId },
    });
  }
}
