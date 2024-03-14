// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  saveUserProfile:
    "http://127.0.0.1:8080/users/register",
  authenticate:
    "http://127.0.0.1:8080/users/authenticate",
  getQuestionsForTestSeries:
    "http://127.0.0.1:8080/questionLayout/getQuestions",
  postSavedAnswer:
    "http://127.0.0.1:8080/reportDetail/saveReportQuestionWise",
  postSubmittedAnswer:
    "http://127.0.0.1:8080/reportOverall/saveOverallReport",
  getAllCoursesOffered:
    "http://127.0.0.1:8080/coursesOffered/getAllCoursesOffered",
  findAllUnVerifiedUser:
    "http://127.0.0.1:8080/users/findAllUnVerifiedUser?userId=",
  createTest:
    "http://127.0.0.1:8080/coursesDetail/createTest",
  getCourseIdListForAdmin:
    "http://127.0.0.1:8080/coursesDetail/getCourseIdListForAdmin",
  questionLayoutUpload:
    "http://127.0.0.1:8080/questionLayout/upload?courseId=",
  userVerification:
    "http://127.0.0.1:8080/users/verification?userId=",
  uploadProfileData:
    "http://127.0.0.1:8080/users/uploadProfileData?userId=",
  getOverallReportByUserId:
    "http://127.0.0.1:8080/reportOverall/getOverallReportByUserId?user_id=",
  getTopRank:
    "http://127.0.0.1:8080/reportOverall/getTopRank?course_id=",
  getQuestionAnalysis:
    "http://127.0.0.1:8080/reportDetail/getQuestionAnalysis?user_id=",
  getCoursesDescriptionByExamCode:
    "http://127.0.0.1:8080/coursesDetail/getCoursesDescriptionByExamCode",
  createOrder:
    "http://127.0.0.1:8080/payment/createOrder",
  verifiedPayment:
    "http://127.0.0.1:8080/payment/verifiedPayment",
  getAllBooks:"http://127.0.0.1:8080/books/getAllBooks",
  getAllBanners:"http://127.0.0.1:8080/banner/getAllBanner",
  
  createDownloadAdmin:"http://127.0.0.1:8080/download/uploadMaterial?label1=",
  getDownloadData:"http://127.0.0.1:8080/download/getDownloadByExamAndTopicAndBranch?exam=",
  forgotpassword:"http://127.0.0.1:8080/users/forgotPassword?emailId=",
  
  getQuestionBankByExamCode:"http://127.0.0.1:8080/coursesDetailForQB/getCoursesDescriptionQBByExamCode",
  getQuestionBank:"http://127.0.0.1:8080/questionBank/getQuestions",
  createQuestionBank:"http://127.0.0.1:8080/coursesDetailForQB/createTestQB",
  
  getCourseIdListQBForAdmin:"http://127.0.0.1:8080/coursesDetailForQB/getCourseIdListQBForAdmin",
  
  questionBankUpload:"http://127.0.0.1:8080/questionBank/upload?courseId=",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
