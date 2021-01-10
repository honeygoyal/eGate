import { Injectable } from '@angular/core';
import { Department } from '../component/admin-panel/department.model';
import { Exam } from '../component/admin-panel/exam.model';
import { Subsection } from '../component/admin-panel/subsection.model';


@Injectable({
  providedIn: 'root'
})
export class SelectServiceService {

  getExam() {
    return [new Exam(1, "GATE"), new Exam(2, "iPATE"), new Exam(3, "ESE"), new Exam(4, "IIT-JAM"), new Exam(5, "ISRO"), new Exam(6, "TIFR"), new Exam(7, "JEST"),new Exam(8,"BARC")];
  }

  getSubsection() {
    return [
      new Subsection(1, 1, "Previous GATE Papers with Solutions"),
      new Subsection(2, 1, "Engineering Mathematics"),
      new Subsection(3, 1, "Quantitative Aptitude"),
      new Subsection(4, 2,  "Previous iPATE Papers with Solutions"),
      new Subsection(5, 2, "Cognitive Abilities"),
      new Subsection(6, 2, "Professional Abilities"),
      new Subsection(7, 2, "Technical Abilities"),
      new Subsection(8, 3, "Previous ESE Papers (prelims) with solutions"),
      new Subsection(9, 3, "Previous ESE Papers (Mains) with solutions"),
      new Subsection(10, 3, "General Studies and Engineering Aptitude"),
      new Subsection(11, 4, "Previous IIT-JAM Papers with Solutions"),
      new Subsection(12, 5, "Previous ISRO Papers with Solutions"),
      new Subsection(13,6,"Previous TIFR Papers with Solutions"),
      new Subsection(14, 7, "Previous JEST Papers with Solutions"),
      new Subsection(15, 8, "Previous BARC Papers with Solutions"),
    ];
  }

  getbranch() {
    return [
      new Department(1,1,"Computer Science & Information Technology"),
new Department(2,1,"Civil Engineering"),
new Department(3,1,"Environmental Science & Engineering"),
new Department(4,1,"Chemical Engineering"),
new Department(5,1,"Mechanical Engineering"),
new Department(6,1,"Metallurgical Engineering"),
new Department(7,1,"Production & Industrial Engineering"),
new Department(8,1,"Mathematics"),
new Department(9,1,"Statistics"),
new Department(10,1,"Physics"),
new Department(11,1,"Electronics & Communication Engineering"),
new Department(12,1,"Electrical Engineering"),
new Department(13,1,"Instrumentation Engineering"),
new Department(14,1,"Aerospace Engineering"),
new Department(15,2,"All"),
new Department(16,3,"All"),
new Department(17,4,"Computer Science & Information Technology"),
new Department(18,4,"Civil Engineering"),
new Department(19,4,"Chemical Engineering"),
new Department(20,4,"Mechanical Engineering"),
new Department(21,4,"Metallurgical Engineering"),
new Department(22,4,"Production & Industrial Engineering"),
new Department(23,4,"Electronics & Communication Engineering"),
new Department(24,4,"Electrical Engineering"),
new Department(25,4,"Instrumentation Engineering"),
new Department(26,4,"Aerospace Engineering"),
new Department(27,5,"All"),
new Department(28,6,"All"),
new Department(29,7,"All"),
new Department(30,8,"Mechanical Engineering"),
new Department(31,8,"Civil Engineering"),
new Department(32,8,"Electrical Engineering"),
new Department(33,8,"Electronics & Telecommunication Engineering"),
new Department(34,9,"Mechanical Engineering"),
new Department(35,9,"Civil Engineering"),
new Department(36,9,"Electrical Engineering"),
new Department(37,9,"Electronics & Telecommunication Engineering"),

new Department(38,10,"All"),
new Department(39,11,"Mathematics"),
new Department(40,11,"Physics"),
new Department(41,11,"Mathematical Statistics"),

new Department(42,12,"Mechanical Engineering"),
new Department(43,12,"Mechanical Engineering (RAC)"),
new Department(44,12,"Computer Science and Engineering"),
new Department(45,12,"Electronics and Communication Engineering"),
new Department(46,12,"Civil Engineering"),
new Department(47,12,"Electrical Engineering"),

new Department(48,13,"Mathematics"),
new Department(49,13,"Physics"),
new Department(50,13,"Computer Science & Information Technology"),

new Department(51,14,"Physics"),
new Department(52,14,"Theoretical Computer Science"),

new Department(53,15,"Mechanical Engineering"),
new Department(54,15,"Computer Science and Engineering"),
new Department(55,15,"Electronics and Communication Engineering"),
new Department(56,15,"Civil Engineering"),
new Department(57,15,"Electrical Engineering"),
new Department(58,15,"Chemical Engineering"),
new Department(59,15,"Metallurgical Engineering"),
new Department(60,1,"Engineering Sciences"),
    ];
  }
}
