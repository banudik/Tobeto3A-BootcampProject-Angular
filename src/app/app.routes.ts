import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { adminRoutes } from './pages/admin/admin.routes';
import { SitelayoutComponent } from './pages/sitelayout/sitelayout/sitelayout.component';
import { siteRoutes } from './pages/sitelayout/sitelayout/siteroutes';
import { AdminPanelGuard } from './core/guards/admin/admin-panel.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


export const routes: Routes = [ 
    
{path:'',redirectTo:'homepage',pathMatch:'full'},

//Site
{path:'',component:SitelayoutComponent, children:siteRoutes},


//admin
{path:'adminpanel',component:AdminComponent,children:adminRoutes,canActivate: [AdminPanelGuard]},

{path: '**', component: NotFoundComponent }

];
