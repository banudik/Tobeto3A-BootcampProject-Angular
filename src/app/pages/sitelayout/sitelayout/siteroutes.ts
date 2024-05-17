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

    
];