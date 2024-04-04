import { NgModule } from "@angular/core";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { SignUpComponent } from "../pages/sign-up/sign-up.component";
import { FilterByInstructorPipe } from "./pipes/filter-by-instructor-pipe.pipe";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { FilterInstructorPipe } from "./pipes/filter-instructor-pipe.pipe";


@NgModule({
    declarations:[FilterBootcampPipe,FilterInstructorPipe],
    exports:[NavbarComponent,FilterBootcampPipe,FilterInstructorPipe],
    imports:[MenubarModule,CommonModule,NavbarComponent,SignUpComponent]

})
export class SharedModule{}