import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminmainpage',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './adminmainpage.component.html',
  styleUrl: './adminmainpage.component.css'
})
export class AdminmainpageComponent {

}
