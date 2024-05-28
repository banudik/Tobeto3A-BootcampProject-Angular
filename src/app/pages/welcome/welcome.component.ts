import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private toastr:ToastrService,
    private router:Router
  ) { }

ngOnInit() {
   this.route.queryParams.subscribe(params => {
    const activationKey = params['ActivationKey'];
    if (activationKey) {
      this.authService.verifyEmailWelcomePage(activationKey).subscribe({
        next: (response) => {
          this.toastr.success('Email doğrulama başarılı', 'Başarılı');
        },
        error: (error) => {
          this.toastr.error('Email doğrulama başarısız', 'Hata');
          return console.log(error)
        }
      });
    }
  });
}




@HostListener('window:scroll', [])
onWindowScroll() {
  const video = document.getElementById('thunder') as HTMLVideoElement;
  const videoPosition = video.getBoundingClientRect().top;
  const windowPosition = window.innerHeight / 1.5;

  if (videoPosition < windowPosition) {
    video.play().then(() => {
      // Video otomatik olarak başladı
    }).catch((error) => {
      // Otomatik oynatma desteklenmiyor veya kullanıcı izni gerekiyor
      console.log('Otomatik oynatma hatası:', error);
    });
  }
}



}

