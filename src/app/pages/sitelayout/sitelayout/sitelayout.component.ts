import { Component, inject } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../../features/services/concretes/dark-mode.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-sitelayout',
    standalone: true,
    templateUrl: './sitelayout.component.html',
    styleUrl: './sitelayout.component.css',
    imports: [SharedModule, FooterComponent,RouterModule,CommonModule,NavbarComponent]
})
export class SitelayoutComponent {

    darkModeService:DarkModeService = inject(DarkModeService);
}
