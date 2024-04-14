import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from 'primeng/api';
import { BootcampListGroupComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { InstructorComponent } from "./features/components/instructor/instructor.component";
import { CloudinaryModule } from '@cloudinary/ng';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen'

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, NavbarComponent, HomepageComponent, LoginComponent, SignUpComponent, SharedModule, BootcampListGroupComponent, InstructorComponent,CloudinaryModule]
})
export class AppComponent /** implements OnInit**/ {
  title = 'BootcampProject-FrontEnd';
  /**img: CloudinaryImage;
  ngOnInit() {
    const cld = new Cloudinary({cloud: {cloudName: 'day7jhbzi'}});**/
}
