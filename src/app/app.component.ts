import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from 'primeng/api';
import { BootcampListGroupComponent } from './features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { InstructorComponent } from "./features/components/instructor/instructor.component";
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error/error.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './features/components/faq/faq.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { CourseComponent } from './pages/profile/components/course/course.component';
import { AuthService } from './features/services/concretes/auth.service';




@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HttpClientModule, NavbarComponent, HomepageComponent, LoginComponent, SignUpComponent, SharedModule, BootcampListGroupComponent, InstructorComponent, CloudinaryModule, FooterComponent, ProfileComponent,PrivacyPolicyComponent,LoadingSpinnerComponent,ContactUsComponent,FaqComponent,TermsOfUseComponent,CourseComponent],

})
export class AppComponent implements OnInit {
  title = 'BootcampProject-FrontEnd';
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      console.log('User is logged in:', isLoggedIn);
    });
  }
}