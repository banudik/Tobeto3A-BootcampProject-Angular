import { NgModule } from "@angular/core";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { SignUpComponent } from "../pages/sign-up/sign-up.component";
import { FilterInstructorPipe } from "./pipes/filter-instructor-pipe.pipe";
import { FaqComponent } from "../features/components/faq/faq.component";
import { AboutUsComponent } from "../pages/about-us/about-us.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BootcampListGroupComponent } from "../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component";



@NgModule({
    declarations:[FilterBootcampPipe,FilterInstructorPipe,AboutUsComponent],
    exports:[NavbarComponent,FilterBootcampPipe,FilterInstructorPipe],
    imports:[CommonModule,NavbarComponent,FooterComponent,BootcampListGroupComponent],

})
export class SharedModule{}