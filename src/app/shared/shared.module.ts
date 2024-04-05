import { NgModule } from "@angular/core";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { SignUpComponent } from "../pages/sign-up/sign-up.component";
import { FilterByInstructorPipe } from "./pipes/filter-by-instructor-pipe.pipe";


@NgModule({
    declarations:[FilterBootcampPipe,FilterByInstructorPipe],
    exports:[NavbarComponent,FilterBootcampPipe,FilterByInstructorPipe],
    imports:[MenubarModule,CommonModule,NavbarComponent,SignUpComponent]

})
export class SharedModule{}