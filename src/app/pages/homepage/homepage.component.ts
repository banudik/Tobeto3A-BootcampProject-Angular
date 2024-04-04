import { Component ,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootcampListGroupComponent } from '../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule,BootcampListGroupComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent  {


}
