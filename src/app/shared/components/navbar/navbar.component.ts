import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../../pages/login/login.component';
import { SignUpComponent } from '../../../pages/sign-up/sign-up.component';
import { BootcampListGroupComponent } from '../../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent,RouterModule,SignUpComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  showSearchInput: boolean = false;

  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
    if (this.showSearchInput) {
      setTimeout(() => {
        const inputElement = document.getElementById('searchInput');
        if (inputElement) {
          inputElement.focus();
        }
      });
    }
  }
}
