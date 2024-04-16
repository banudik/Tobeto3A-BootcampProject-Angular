import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error/error.interceptor';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true, 
      },
      {
        provide: HTTP_INTERCEPTORS,
        useValue: AuthInterceptor,
        multi: true, // Birden fazla interceptor zincirlenmesine izin ver
      }
        ],
    imports: [RouterOutlet, HttpClientModule, NavbarComponent, HomepageComponent, LoginComponent, SignUpComponent, SharedModule, BootcampListGroupComponent, InstructorComponent,CloudinaryModule,FooterComponent],

})
export class AppComponent /** implements OnInit**/ {
  title = 'BootcampProject-FrontEnd';
  /**img: CloudinaryImage;
  ngOnInit() {
    const cld = new Cloudinary({cloud: {cloudName: 'day7jhbzi'}});**/
    
}