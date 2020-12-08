// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  saveUserProfile: "http://localhost:8080/users/register",
  authenticate: "http://localhost:8080/users/authenticate",
  getQuestionsForTestSeries:
    "http://localhost:8080/questionLayout/getQuestions",
  postSavedAnswer: "http://localhost:8080/reportDetail/saveReportQuestionWise",
  postSubmittedAnswer: "http://localhost:8080/reportOverall/saveOverallReport",
  getAllCoursesOffered:
    "http://localhost:8080/coursesOffered/getAllCoursesOffered",
  findAllUnVerifiedUser:
    "http://localhost:8080/users/findAllUnVerifiedUser?userId=",
  createTest: "http://localhost:8080/coursesDetail/createTest",
  getCourseIdListForAdmin:
    "http://localhost:8080/coursesDetail/getCourseIdListForAdmin",
  questionLayoutUpload: "http://localhost:8080/questionLayout/upload?courseId=",
  userVerification: "http://localhost:8080/users/verification?userId=",
  uploadProfileData: "http://localhost:8080/users/uploadProfileData?userId=",
  getOverallReportByUserId:
    "http://localhost:8080/reportOverall/getOverallReportByUserId?user_id=",
  getTopRank: "http://localhost:8080/reportOverall/getTopRank?course_id=",
  getQuestionAnalysis:
    "http://localhost:8080/reportDetail/getQuestionAnalysis?user_id=",
  getCoursesDescriptionByExamCode:
    "http://localhost:8080/coursesDetail/getCoursesDescriptionByExamCode",
  createOrder:
  "http://localhost:8080/payment/createOrder",
  verifiedPayment:
  "http://localhost:8080/payment/verifiedPayment",
  getAllBooks:"http://localhost:8080/books/getAllBooks",
  getAllBanners:"http://localhost:8080/banner/getAllBanner",
  createDownloadAdmin:"http://localhost:8080/download/uploadMaterial?label1=",
  getDownloadData:"http://localhost:8080/download/getDownloadByExamAndTopicAndBranch?exam=",
  forgotpassword:"http://localhost:8080/users/forgotPassword?emailId=",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
