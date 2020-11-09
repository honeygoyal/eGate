export const environment = {
  production: true,
  saveUserProfile:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/users/register",
  authenticate:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/users/authenticate",
  getQuestionsForTestSeries:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/questionLayout/getQuestions",
  postSavedAnswer:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/reportDetail/saveReportQuestionWise",
  postSubmittedAnswer:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/reportOverall/saveOverallReport",
  getAllCoursesOffered:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/coursesOffered/getAllCoursesOffered",
  findAllUnVerifiedUser:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/users/findAllUnVerifiedUser?userId=",
  createTest:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/coursesDetail/createTest",
  getCourseIdListForAdmin:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/coursesDetail/getCourseIdListForAdmin",
  questionLayoutUpload:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/questionLayout/upload?courseId=",
  userVerification:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/users/verification?userId=",
  uploadProfileData:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/users/uploadProfileData?userId=",
  getOverallReportByUserId:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/reportOverall/getOverallReportByUserId?user_id=",
  getTopRank:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/reportOverall/getTopRank?course_id=",
  getQuestionAnalysis:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/reportDetail/getQuestionAnalysis?user_id=",
  getCoursesDescriptionByExamCode:
    "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/coursesDetail/getCoursesDescriptionByExamCode",
  createOrder:
  "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/payment/createOrder",
  verifiedPayment:
  "https://ec2-15-206-94-151.ap-south-1.compute.amazonaws.com:8080/payment/verifiedPayment",
};
