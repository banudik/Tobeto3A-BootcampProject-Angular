import { Component ,HostListener,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootcampListGroupComponent } from '../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { HttpClientModule } from '@angular/common/http';
import { InstructorComponent } from "../../features/components/instructor/instructor.component";

@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [CommonModule]
})
export class HomepageComponent {
    
constructor() { }

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
