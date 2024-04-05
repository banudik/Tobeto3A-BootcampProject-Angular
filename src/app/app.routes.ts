import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BootcampListGroupComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';

export const routes: Routes = [ {path:'',redirectTo:'homepage',pathMatch:'full'},
{path:'homepage',component:HomepageComponent,children:[
    {path:"",pathMatch:"full",component:BootcampListGroupComponent}
    //{path:"bootcamps/instructor/:instructorId",component:BootcampListGroupComponent}
]},
{path:'login',component:LoginComponent},
{path:'sign-up',component:SignUpComponent},
{path:'bootcamps',component:BootcampListGroupComponent},
{path:"bootcamps/instructor/:instructorId",component:BootcampListGroupComponent}
];
