import { NgModule } from "@angular/core";
import { FilterModelPipe } from "./pipes/filter-bootcamp-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { SignUpComponent } from "../pages/sign-up/sign-up.component";


@NgModule({
    declarations:[FilterModelPipe],
    exports:[NavbarComponent,FilterModelPipe],
    imports:[MenubarModule,CommonModule,NavbarComponent,SignUpComponent]

})
export class SharedModule{}