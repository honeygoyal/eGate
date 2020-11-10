export interface VerifiedPaymentModel {
  examId: [string];
  orderId: string;
  paymentId: string;
  signature:string;
  userId: number;
}