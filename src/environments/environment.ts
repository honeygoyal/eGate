// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  saveUserProfile:
    "https://egatetutor.com/users/register",
  authenticate:
    "https://egatetutor.com/users/authenticate",
  getQuestionsForTestSeries:
    "https://egatetutor.com/questionLayout/getQuestions",
  postSavedAnswer:
    "https://egatetutor.com/reportDetail/saveReportQuestionWise",
  postSubmittedAnswer:
    "https://egatetutor.com/reportOverall/saveOverallReport",
  getAllCoursesOffered:
    "https://egatetutor.com/coursesOffered/getAllCoursesOffered",
  findAllUnVerifiedUser:
    "https://egatetutor.com/users/findAllUnVerifiedUser?userId=",
  createTest:
    "https://egatetutor.com/coursesDetail/createTest",
  getCourseIdListForAdmin:
    "https://egatetutor.com/coursesDetail/getCourseIdListForAdmin",
  questionLayoutUpload:
    "https://egatetutor.com/questionLayout/upload?courseId=",
  userVerification:
    "https://egatetutor.com/users/verification?userId=",
  uploadProfileData:
    "https://egatetutor.com/users/uploadProfileData?userId=",
  getOverallReportByUserId:
    "https://egatetutor.com/reportOverall/getOverallReportByUserId?user_id=",
  getTopRank:
    "https://egatetutor.com/reportOverall/getTopRank?course_id=",
  getQuestionAnalysis:
    "https://egatetutor.com/reportDetail/getQuestionAnalysis?user_id=",
  getCoursesDescriptionByExamCode:
    "https://egatetutor.com/coursesDetail/getCoursesDescriptionByExamCode",
  createOrder:
    "https://egatetutor.com/payment/createOrder",
  verifiedPayment:
    "https://egatetutor.com/payment/verifiedPayment",
  getAllBooks:"https://egatetutor.com/books/getAllBooks",
  getAllBanners:"https://egatetutor.com/banner/getAllBanner",
  
  createDownloadAdmin:"https://egatetutor.com/download/uploadMaterial?label1=",
  getDownloadData:"https://egatetutor.com/download/getDownloadByExamAndTopicAndBranch?exam=",
  forgotpassword:"https://egatetutor.com/users/forgotPassword?emailId=",
  
  getQuestionBankByExamCode:"https://egatetutor.com/coursesDetailForQB/getCoursesDescriptionQBByExamCode",
  getQuestionBank:"https://egatetutor.com/questionBank/getQuestions"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
