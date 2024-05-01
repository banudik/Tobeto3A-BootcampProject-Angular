import { Component } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sitelayout',
    standalone: true,
    templateUrl: './sitelayout.component.html',
    styleUrl: './sitelayout.component.css',
    imports: [SharedModule, FooterComponent,RouterModule]
})
export class SitelayoutComponent {

}
