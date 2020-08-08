import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TestseriesService {
  constructor(private http: HttpClient) {}

  getTestSeries(content: string, email: string): Observable<any> {
    return this.http.get("http://localhost:8080/tests/getTest", {
      params: { service: content, email: email },
    });
  }
}
