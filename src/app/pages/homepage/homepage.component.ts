import { Component ,OnInit} from '@angular/core';
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
    imports: [RouterModule]
})
export class HomepageComponent  {


}
