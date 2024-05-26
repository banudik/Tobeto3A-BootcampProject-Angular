import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { EmployeeService } from '../../features/services/concretes/employee.service';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { UserService } from '../../features/services/concretes/user.service';
import { GetByIdUserResponse } from '../../features/models/responses/users/get-by-id-user-response';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [RouterModule,CommonModule]
})
export class AdminComponent implements OnInit{
  isloading:boolean = true;


// 2. pass then in constructor
constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document:Document,
    private authService:AuthService,
    private userService:UserService,
    private router:Router
  ) {
  }
  isInstuctor:boolean = false;
  isEmployee:boolean = false;
  isAdmin:boolean = false;
  userId!:string;
  currentUser!:GetByIdUserResponse;
 
// 3. call them in ngOnInit
ngOnInit() {
    // Ana JS dosyalarını yükleme
    this.loadScript('assets/adminAssets/assets/js/main.js');
    this.loadScript('assets/adminAssets/assets/js/polyfill.js');
    this.loadScript('assets/adminAssets/assets/js/moment.min.js');
    this.loadScript('assets/adminAssets/assets/js/dynamic-pie-chart.js');
    this.loadScript('assets/adminAssets/assets/js/Chart.min.js');
    this.loadScript('assets/adminAssets/assets/js/bootstrap.bundle.min.js');

    // jsVectorMap dosyasını yükledikten sonra world-merc.js dosyasını yükle
    this.loadScript2('assets/adminAssets/assets/js/jvectormap.min.js', () => {
        // jsVectorMap yüklendikten sonra world-merc.js dosyasını yükle
        this.loadScript('assets/adminAssets/assets/js/world-merc.js');
            // Fullcalendar.js ve deneme.js dosyalarını yükleme
        this.loadScript('assets/adminAssets/assets/js/fullcalendar.js');
        //this.loadScript('assets/adminAssets/assets/js/deneme.js');
    });
    this.checkRole();
    this.getUser();
}

getUser(){
  this.isloading = true;
  this.userId = this.authService.getCurrentUserId();

  this.userService.getByUserId(this.userId).subscribe(
    (response: GetByIdUserResponse) => {
      this.currentUser = response;
      this.isloading = false;
    },
    (error: any) => {
      console.error('Error fetching User:', error);
      // Hata işleme mekanizmasını buraya ekleyebilirsiniz
      setTimeout(()=>{
        this.router.navigate(['/adminpanel/'])
      },2000)
    }
  );

}

private loadScript(url: string) {
  const script = this.renderer2.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  this.renderer2.appendChild(this._document.body, script);
}

private loadScript2(url: string, callback?: () => void) {
  const script = this.renderer2.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  if (callback) {
      script.onload = callback;
  }
  this.renderer2.appendChild(this._document.body, script);
}

checkRole(){
  this.userId = this.authService.getCurrentUserId();

  if(this.authService.isAdmin()){
    this.isAdmin = true;
  }
  else if(this.authService.isInstructor()){
    this.isInstuctor = true;
  }
  else if(this.authService.isEmployee()){
    this.isEmployee = true;
  }
  else{
    console.log("you are not authorized!");
  }
}
}

