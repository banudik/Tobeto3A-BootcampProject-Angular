import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [RouterModule]
})
export class AdminComponent implements OnInit{



// 2. pass then in constructor
constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document:Document
  ) {
  }
 
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
        this.loadScript('assets/adminAssets/assets/js/deneme.js');
    });
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
}

