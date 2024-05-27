import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../features/services/dark-mode.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {

  ngOnInit(): void {
    window.scrollTo(0,0);
  }
  darkModeService: DarkModeService = inject(DarkModeService);
}
