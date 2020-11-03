import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TestseriesService {
  constructor(private http: HttpClient) {}

  getTestSeries(content: string, email: string): Observable<any> {
    return this.http.get(environment.getCoursesDescriptionByExamCode, {
      params: { exam_code: content, email: email },
    });
  }
}
