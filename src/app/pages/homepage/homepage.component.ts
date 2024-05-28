import { DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InstructorComponent } from "../../features/components/instructor/instructor.component";
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';


@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [CommonModule,RouterModule]
})
export class HomepageComponent implements OnInit{
    
constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document:Document
) { }
ngOnInit() {
  window.scrollTo(0,0);
    // Ana JS dosyalarını yükleme
    this.loadScript('assets/homepageAssets/js/jquery.min.js');
    this.loadScript('assets/homepageAssets/js/bootstrap.min.js');
    this.loadScript('assets/homepageAssets/js/magnific-popup.min.js');
    this.loadScript('assets/homepageAssets/js/nice-select.min.js');
    this.loadScript('assets/homepageAssets/js/jquery.mixitup.min.js');
    this.loadScript('assets/homepageAssets/js/appear.min.js');
    this.loadScript('assets/homepageAssets/js/sticky-sidebar.min.js');
    this.loadScript('assets/homepageAssets/js/odometer.min.js');
    this.loadScript('assets/homepageAssets/js/owl.carousel.min.js');
    this.loadScript('assets/homepageAssets/js/meanmenu.min.js');
    this.loadScript('assets/homepageAssets/js/wow.min.js');
    this.loadScript('assets/homepageAssets/js/main.js');

}
private loadScript(url: string) {
    const script = this.renderer2.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    this.renderer2.appendChild(this._document.body, script);
  }

}
