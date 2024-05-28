import { Routes } from "@angular/router";
import { BootcampstateindexComponent } from "./components/bootcampstate/Index/bootcampstateindex.component";
import { BootcampstatecreateComponent } from "./components/bootcampstate/create/bootcampstatecreate.component";
import { BootcampstateeditComponent } from "./components/bootcampstate/edit/bootcampstateedit.component";
import { BootcampstatedetailsComponent } from "./components/bootcampstate/details/bootcampstatedetails.component";
import { BootcampstatedeleteComponent } from "./components/bootcampstate/delete/bootcampstatedelete.component";
import { BootcampindexComponent } from "./components/bootcamp/index/bootcampindex.component";
import { BootcampcreateComponent } from "./components/bootcamp/create/bootcampcreate.component";
import { BootcampeditComponent } from "./components/bootcamp/edit/bootcampedit.component";
import { BootcampdetailsComponent } from "./components/bootcamp/details/bootcampdetails.component";
import { BootcampdeleteComponent } from "./components/bootcamp/delete/bootcampdelete.component";
import { ApplicationstateindexComponent } from "./components/applicationstate/index/applicationstateindex.component";
import { ApplicationstatecreateComponent } from "./components/applicationstate/create/applicationstatecreate.component";
import { ApplicationstatedeleteComponent } from "./components/applicationstate/delete/applicationstatedelete.component";
import { ApplicationstatedetailsComponent } from "./components/applicationstate/details/applicationstatedetails.component";
import { ApplicationstateeditComponent } from "./components/applicationstate/edit/applicationstateedit.component";
import { ApplicationdetailsComponent } from "./components/application/details/applicationdetails.component";
import { ApplicationeditComponent } from "./components/application/edit/applicationedit.component";
import { ApplicationindexComponent } from "./components/application/index/applicationindex.component";
import { ApplicationdeleteComponent } from "./components/application/delete/applicationdelete.component";
import { ApplicantindexComponent } from "./components/applicant/index/applicantindex.component";
import { ApplicantdetailsComponent } from "./components/applicant/details/applicantdetails.component";
import { ApplicantblacklistComponent } from "./components/applicant/blacklist/applicantblacklist.component";
import { ApplicantdeleteComponent } from "./components/applicant/delete/applicantdelete.component";
import { InstructorindexComponent } from "./components/instructor/index/instructorindex.component";
import { InstructordeleteComponent } from "./components/instructor/delete/instructordelete.component";
import { InstructordetailsComponent } from "./components/instructor/details/instructordetails.component";
import { InstructoreditComponent } from "./components/instructor/edit/instructoredit.component";
import { InstructorcreateComponent } from "./components/instructor/create/instructorcreate.component";
import { EmployeecreateComponent } from "./components/employee/create/employeecreate.component";
import { EmployeedeleteComponent } from "./components/employee/delete/employeedelete.component";
import { EmployeedetailsComponent } from "./components/employee/details/employeedetails.component";
import { EmployeeeditComponent } from "./components/employee/edit/employeeedit.component";
import { EmployeeindexComponent } from "./components/employee/index/employeeindex.component";
import { AnnouncementcreateComponent } from "./components/announcement/create/announcementcreate.component";
import { AnnouncementdeleteComponent } from "./components/announcement/delete/announcementdelete.component";
import { AnnouncementdetailsComponent } from "./components/announcement/details/announcementdetails.component";
import { AnnouncementeditComponent } from "./components/announcement/edit/announcementedit.component";
import { AnnouncementindexComponent } from "./components/announcement/index/announcementindex.component";
import { BlacklistcreateComponent } from "./components/blacklist/create/blacklistcreate.component";
import { BlacklistdeleteComponent } from "./components/blacklist/delete/blacklistdelete.component";
import { BlacklistdetailsComponent } from "./components/blacklist/details/blacklistdetails.component";
import { BlacklisteditComponent } from "./components/blacklist/edit/blacklistedit.component";
import { BlacklistindexComponent } from "./components/blacklist/index/blacklistindex.component";
import { ChaptercreateComponent } from "./components/chapter/create/chaptercreate.component";
import { ChapterdeleteComponent } from "./components/chapter/delete/chapterdelete.component";
import { ChapterdetailsComponent } from "./components/chapter/details/chapterdetails.component";
import { ChaptereditComponent } from "./components/chapter/edit/chapteredit.component";
import { ChapterindexComponent } from "./components/chapter/index/chapterindex.component";
import { AdminmainpageComponent } from "./components/adminmain/adminmainpage.component";
import { UserdetailsComponent } from "./components/viewProfile/admin/details/userdetails.component";
import { UsereditComponent } from "./components/viewProfile/admin/edit/useredit.component";
import { InstructoradminprofiledetailsComponent } from "./components/viewProfile/instructor/details/instructoradminprofiledetails.component";
import { InstructoradminprofileeditComponent } from "./components/viewProfile/instructor/edit/instructoradminprofileedit.component";
import { CommentdeleteComponent } from "./components/comment/delete/commentdelete.component";
import { CommentdetailsComponent } from "./components/comment/details/commentdetails.component";
import { CommenteditComponent } from "./components/comment/edit/commentedit.component";
import { CommentindexComponent } from "./components/comment/index/commentindex.component";

export const adminRoutes: Routes = [

    //adminhomepage
    { path: "adminhome", component: AdminmainpageComponent },
    { path: "", component: AdminmainpageComponent },

    //AdminProfile
    { path: "editadminprofile/:userId", component: UsereditComponent },
    { path: "viewadminprofile/:userId", component: UserdetailsComponent },

    //InstructorProfile
    { path: "editinstructorprofile/:instructorId", component: InstructoradminprofileeditComponent },
    { path: "viewinstructorprofile/:instructorId", component: InstructoradminprofiledetailsComponent },

    //EmployeeProfile
    { path: "editemployeeprofile/:employeeId", component: BootcampstateeditComponent },
    { path: "viewemployeeprofile/:employeeId", component: BootcampstatedetailsComponent },

    //bootcampState
    { path: "bootcampstateindex", component: BootcampstateindexComponent },
    { path: "bootcampstatecreate", component: BootcampstatecreateComponent },
    { path: "bootcampstateedit/:bootcampStateId", component: BootcampstateeditComponent },
    { path: "bootcampstatedetails/:bootcampStateId", component: BootcampstatedetailsComponent },
    { path: "bootcampstatedelete/:bootcampStateId", component: BootcampstatedeleteComponent },

    //bootcamp
    { path: "bootcampindex", component: BootcampindexComponent },
    { path: "bootcampcreate", component: BootcampcreateComponent },
    { path: "bootcampdetails/:bootcampId", component: BootcampdetailsComponent },
    { path: "bootcampedit/:bootcampId", component: BootcampeditComponent },
    { path: "bootcampdelete/:bootcampId", component: BootcampdeleteComponent },

    //ApplicationState
    { path: "applicationstateindex", component: ApplicationstateindexComponent },
    { path: "applicationstatecreate", component: ApplicationstatecreateComponent },
    { path: "applicationstatedetails/:applicationStateId", component: ApplicationstatedetailsComponent },
    { path: "applicationstateedit/:applicationStateId", component: ApplicationstateeditComponent },
    { path: "applicationstatedelete/:applicationStateId", component: ApplicationstatedeleteComponent },

    //Application
    { path: "applicationindex", component: ApplicationindexComponent },
    { path: "applicationdetails/:applicationId", component: ApplicationdetailsComponent },
    { path: "applicationedit/:applicationId", component: ApplicationeditComponent },
    { path: "applicationdelete/:applicationId", component: ApplicationdeleteComponent },

    //Applicant
    { path: "applicantindex", component: ApplicantindexComponent },
    { path: "applicantdetails/:applicantId", component: ApplicantdetailsComponent },
    { path: "applicantblacklist/:applicantId", component: ApplicantblacklistComponent },
    { path: "applicantdelete/:applicantId", component: ApplicantdeleteComponent },

    //Instructor
    { path: "instructorindex", component: InstructorindexComponent },
    { path: "instructorcreate", component: InstructorcreateComponent },
    { path: "instructordetails/:instructorId", component: InstructordetailsComponent },
    { path: "instructoredit/:instructorId", component: InstructoreditComponent },
    { path: "instructordelete/:instructorId", component: InstructordeleteComponent },

    //Employee
    { path: "employeeindex", component: EmployeeindexComponent },
    { path: "employeecreate", component: EmployeecreateComponent },
    { path: "employeedetails/:employeeId", component: EmployeedetailsComponent },
    { path: "employeeedit/:employeeId", component: EmployeeeditComponent },
    { path: "employeedelete/:employeeId", component: EmployeedeleteComponent },

    //Announcement
    { path: "announcementindex", component: AnnouncementindexComponent },
    { path: "announcementcreate", component: AnnouncementcreateComponent },
    { path: "announcementdetails/:announcementId", component: AnnouncementdetailsComponent },
    { path: "announcementedit/:announcementId", component: AnnouncementeditComponent },
    { path: "announcementdelete/:announcementId", component: AnnouncementdeleteComponent },

    //Blacklist
    { path: "blacklistindex", component: BlacklistindexComponent },
    { path: "blacklistcreate", component: BlacklistcreateComponent },
    { path: "blacklistdetails/:blacklistId", component: BlacklistdetailsComponent },
    { path: "blacklistedit/:blacklistId", component: BlacklisteditComponent },
    { path: "blacklistdelete/:blacklistId", component: BlacklistdeleteComponent },

    //Chapter
    { path: "chapterindex", component: ChapterindexComponent },
    { path: "chaptercreate", component: ChaptercreateComponent },
    { path: "chapterdetails/:chapterId", component: ChapterdetailsComponent },
    { path: "chapteredit/:chapterId", component: ChaptereditComponent },
    { path: "chapterdelete/:chapterId", component: ChapterdeleteComponent },

    //Comment
    { path: "commentindex", component: CommentindexComponent },
    { path: "commentdetails/:commentId", component: CommentdetailsComponent },
    { path: "commentedit/:commentId", component: CommenteditComponent },
    { path: "commentdelete/:commentId", component: CommentdeleteComponent },
];