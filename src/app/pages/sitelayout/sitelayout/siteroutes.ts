import { Routes } from "@angular/router";
import { BootcampDetailsComponent } from "../../../features/components/bootcamps/bootcamp-details/bootcamp-details.component";
import { BootcampListGroupComponent } from "../../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component";
import { FaqComponent } from "../../../features/components/faq/faq.component";
import { HomepageComponent } from "../../homepage/homepage.component";
import { LoginComponent } from "../../login/login.component";
import { ProfileComponent } from "../../profile/profile.component";
import { SignUpComponent } from "../../sign-up/sign-up.component";
import { ContactUsComponent } from "../../contact-us/contact-us.component";
import { ResetPasswordComponent } from "../../reset-password/reset-password.component";
import { AboutUsComponent } from "../../about-us/about-us.component";
import { PrivacyPolicyComponent } from "../../privacy-policy/privacy-policy.component";
import { ChapterComponent } from "../../chapter/chapter.component";
import { TermsOfUseComponent } from "../../terms-of-use/terms-of-use.component";
import { WelcomeComponent } from "../../welcome/welcome.component";
import { CourseComponent } from "../../profile/components/course/course.component";
import { ProfilesettingsComponent } from "../../profile/components/profile-settings/profilesettings.component";


export const siteRoutes: Routes = [
    {path:'homepage',component:HomepageComponent},
    {path:'login',component:LoginComponent},
    {path:'sign-up',component:SignUpComponent},
    {path:'bootcamps',component:BootcampListGroupComponent},
    {path:"bootcamps/instructor/:instructorId",component:BootcampListGroupComponent},
    {path:"bootcampdetail/:bootcampId",component:BootcampDetailsComponent},
    {path:"myprofile/:userId",component:ProfileComponent},
    {path:'faq',component:FaqComponent},
    {path:'contact-us',component:ContactUsComponent},
    {path: 'reset-password', component: ResetPasswordComponent },
    {path:'about-us',component:AboutUsComponent},
    {path:'privacy-policy',component:PrivacyPolicyComponent},
    {path:'chapter/:bootcampId/:sort',component:ChapterComponent},
    {path:'terms-of-use',component:TermsOfUseComponent},
    {path:'welcome',component:WelcomeComponent},
    {path:'course/:applicantId',component:CourseComponent},
    {path:'myprofileedit/:applicantId',component:ProfilesettingsComponent},
];