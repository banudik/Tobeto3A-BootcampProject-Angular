import { NgModule } from "@angular/core";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { SignUpComponent } from "../pages/sign-up/sign-up.component";
import { FilterInstructorPipe } from "./pipes/filter-instructor-pipe.pipe";
import { FaqComponent } from "../features/components/faq/faq.component";



@NgModule({
    declarations:[FilterBootcampPipe,FilterInstructorPipe,FaqComponent],
    exports:[NavbarComponent,FilterBootcampPipe,FilterInstructorPipe],
    imports:[CommonModule,NavbarComponent,SignUpComponent],

})
export class SharedModule{}