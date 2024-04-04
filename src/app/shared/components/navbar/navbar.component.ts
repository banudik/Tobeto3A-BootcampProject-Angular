import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../../pages/login/login.component';
import { SignUpComponent } from '../../../pages/sign-up/sign-up.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent,RouterModule,SignUpComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
