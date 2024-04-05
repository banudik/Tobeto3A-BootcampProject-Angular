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

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, NavbarComponent, HomepageComponent, LoginComponent, SignUpComponent, SharedModule, BootcampListGroupComponent, InstructorComponent]
})
export class AppComponent {
  title = 'BootcampProject-FrontEnd';
}
