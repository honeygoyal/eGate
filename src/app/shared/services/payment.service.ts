import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SubmittedOrderModel } from "../model/SubmittedOrder.model";
import { VerifiedPaymentModel } from "../model/VerifiedPayment.model";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

constructor(private http: HttpClient) {}

 postSubmittedOrder(submittedOrderModel: SubmittedOrderModel) {
    return this.http.post(
      environment.createOrder,
      submittedOrderModel
    );
  }


  postVerifiedPayment(verifiedPaymentModel: VerifiedPaymentModel) {
    return this.http.post(
      environment.verifiedPayment,
      verifiedPaymentModel
    );
  }

  getCoursesOfferedWithPayments() {
    return this.http.get(environment.getAllCoursesOffered);
  }

}
