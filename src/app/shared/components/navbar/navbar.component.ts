import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../../../pages/login/login.component';
import { SignUpComponent } from '../../../pages/sign-up/sign-up.component';
import { BootcampListGroupComponent } from '../../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../pages/profile/profile.component';
import { DarkModeService } from '../../../features/services/dark-mode.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule,CommonModule,ProfileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush,
})

export class NavbarComponent implements OnInit{
  isLoggedIn!: boolean;
  isAdmin!: boolean; 
  menuItems!:MenuItem[];
  userLogged!:boolean;
  showLogoutModal = false;
  userId!:string;
  
  constructor(private authService:AuthService,private router:Router,private cdRef:ChangeDetectorRef){}

   ngOnInit(): void {
     this.getMenuItems();
     //console.log(this.getUserName());
     //console.log(this.getUserId())
     console.log(this.authService.getRoles())
     this.getUserId();
     this.cdRef.detectChanges();
   }

   logOut(){
    this.authService.logOut();
    this.router.navigate(['homepage'])
   }
   
   setUserLogged() :boolean{
    return this.userLogged=this.authService.loggedIn()
   }

   getUserName():string{
    return this.authService.getUserName();
   }

   getUserId():string{
    this.userId = this.authService.getCurrentUserId();
    return this.authService.getCurrentUserId();
   }



   getMenuItems(){
    const isUserLoggedIn = this.authService.loggedIn();
    if(isUserLoggedIn){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
    if(this.authService.isAdmin()){

        this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
   }
   

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

  darkModeService: DarkModeService = inject(DarkModeService);

  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }
}
