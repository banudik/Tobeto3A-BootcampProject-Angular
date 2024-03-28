import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [ {path:'',redirectTo:'homepage',pathMatch:'full'},
{path:'homepage',component:HomepageComponent},
{path:'login',component:LoginComponent}];
