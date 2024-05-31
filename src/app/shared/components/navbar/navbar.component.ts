import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../pages/profile/profile.component';
import { DarkModeService } from '../../../features/services/concretes/dark-mode.service';
import { LocalStorageService } from '../../../features/services/concretes/local-storage.service';

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
  token: string | null = null;
  showLogoutModal = false;
  userId!:string;
  showMenu:boolean = false;


  constructor(private authService:AuthService,private router:Router,private cdRef:ChangeDetectorRef,private storageService:LocalStorageService)
  {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

   ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => 
    {
      this.isLoggedIn = isLoggedIn;
      this.cdRef.detectChanges(); // Değişiklik algılansın ve template güncellensin
    });

    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      this.cdRef.detectChanges(); // Değişiklik algılansın ve template güncellensin
    });
  
     this.getMenuItems();
     console.log(this.authService.getRoles())
     this.getUserId();
     this.cdRef.detectChanges();
     this.menuClick();
     this.checkLoginStatus();
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
        this.cdRef.detectChanges();
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.cdRef.detectChanges();
      } // Değişiklik algılansın ve template güncellensin
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
  
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.loggedIn();
    this.token = this.storageService.getToken();
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.authService.getCurrentUserId();
    this.cdRef.detectChanges(); // ChangeDetectorRef kullanarak değişiklikleri tespit et
  }
}

