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
import { DarkModeService } from '../../../features/services/concretes/dark-mode.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule,CommonModule,ProfileComponent,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush,
})

export class NavbarComponent implements OnInit{
  isLoggedIn: boolean = false;
  isAdmin: boolean = false; 
  menuItems!:MenuItem[];
  userLogged!:boolean;
  showLogoutModal = false;
  userId!:string;
  showMenu:boolean = false;
  
  constructor(private authService:AuthService,private router:Router,private cdRef:ChangeDetectorRef){}

  
   ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cdRef.detectChanges(); // Değişiklik algılansın ve template güncellensin
      // this.router.navigate(['homepage']);
    });

    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      this.cdRef.detectChanges(); // Değişiklik algılansın ve template güncellensin
      // this.router.navigate(['homepage']);
    });
  
     this.getMenuItems();
     //console.log(this.getUserName());
     //console.log(this.getUserId())
     console.log(this.authService.getRoles())
     this.getUserId();
     this.cdRef.detectChanges();
     this.menuClick();
     
   }
   

   logOut() {
    this.authService.logOut();
    this.showLogoutModal = false;
    this.cdRef.detectChanges(); // Değişikliklerin algılanması ve güncellenmesi
    this.router.navigate(['homepage']);
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

   getMenuItems(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.isAdmin = this.authService.isAdmin();
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
      this.cdRef.detectChanges(); // Değişiklik algılansın ve template güncellensin
    });

  }
   

  darkModeService: DarkModeService = inject(DarkModeService);

  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }
  
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  menuClick(): void {
    const menu: HTMLElement | null = document.querySelector('#menu-icon');
    const navbar: HTMLElement | null = document.querySelector('.navbar');
  
    if (menu && navbar) {
      menu.addEventListener('click', (): void => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
      });
    }
  }
  
}

