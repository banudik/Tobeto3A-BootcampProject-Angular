import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-navbar',
  standalone: true,

  imports: [LoginComponent,RouterModule,SignUpComponent,BootcampListGroupComponent,MenubarModule,CommonModule],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isLoggedIn!: boolean; 
  isAdmin!: boolean; 
  menuItems!:MenuItem[];
  userLogged!:boolean;
  constructor(private authService:AuthService,private router:Router){}

   ngOnInit(): void {
     this.getMenuItems();
     console.log(this.getUserName());
     console.log(this.getUserId())
     console.log(this.authService.getRoles())
   }

   logOut(){
    this.authService.logOut();
    this.router.navigate(['home-page'])
   }
   
   setUserLogged() :boolean{
    return this.userLogged=this.authService.loggedIn()
   }

   getUserName():string{
    return this.authService.getUserName();
   }

   getUserId():string{
    return this.authService.getCurrentUserId();
   }



   async getMenuItems(){
    const isUserLoggedIn = await this.authService.loggedIn();
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
}
