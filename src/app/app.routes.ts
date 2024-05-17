import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BootcampListGroupComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { BootcampDetailsComponent } from './features/components/bootcamps/bootcamp-details/bootcamp-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FaqComponent } from './features/components/faq/faq.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BootcampstateindexComponent } from './pages/admin/components/bootcampstate/Index/bootcampstateindex.component';
import { adminRoutes } from './pages/admin/admin.routes';
import { SitelayoutComponent } from './pages/sitelayout/sitelayout/sitelayout.component';
import { siteRoutes } from './pages/sitelayout/sitelayout/siteroutes';
import { AdminPanelGuard } from './core/guards/admin/admin-panel.guard';


export const routes: Routes = [ {path:'',redirectTo:'homepage',pathMatch:'full'},

//Site
{path:'',component:SitelayoutComponent, children:siteRoutes},


//admin
{path:'adminpanel',component:AdminComponent,children:adminRoutes,canActivate: [AdminPanelGuard]},

];
