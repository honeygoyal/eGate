export const environment = {
  production: true,
  saveUserProfile: "https://dry-forest-73283.herokuapp.com/users/register",
  authenticate: "https://dry-forest-73283.herokuapp.com/users/authenticate",
  getQuestionsForTestSeries:
    "https://dry-forest-73283.herokuapp.com/questionLayout/getQuestions",
  postSavedAnswer:
    "https://dry-forest-73283.herokuapp.com/reportDetail/saveReportQuestionWise",
  postSubmittedAnswer:
    "https://dry-forest-73283.herokuapp.com/reportOverall/saveOverallReport",
  getAllCoursesOffered:
    "https://dry-forest-73283.herokuapp.com/coursesOffered/getAllCoursesOffered",
  findAllUnVerifiedUser:
    "https://dry-forest-73283.herokuapp.com/users/findAllUnVerifiedUser?userId=",
  createTest: "https://dry-forest-73283.herokuapp.com/coursesDetail/createTest",
  getCourseIdListForAdmin:
    "https://dry-forest-73283.herokuapp.com/coursesDetail/getCourseIdListForAdmin",
  questionLayoutUpload:
    "https://dry-forest-73283.herokuapp.com/questionLayout/upload?courseId=",
  userVerification:
    "https://dry-forest-73283.herokuapp.com/users/verification?userId=",
  uploadProfileData:
    "https://dry-forest-73283.herokuapp.com/users/uploadProfileData?userId=",
  getOverallReportByUserId:
    "https://dry-forest-73283.herokuapp.com/reportOverall/getOverallReportByUserId?user_id=",
  getTopRank:
    "https://dry-forest-73283.herokuapp.com/reportOverall/getTopRank?course_id=",
  getQuestionAnalysis:
    "https://dry-forest-73283.herokuapp.com/reportDetail/getQuestionAnalysis?user_id=",
  getCoursesDescriptionByExamCode:
    "https://dry-forest-73283.herokuapp.com/coursesDetail/getCoursesDescriptionByExamCode",
};
