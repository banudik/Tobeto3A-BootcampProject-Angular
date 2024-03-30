import { NgModule } from "@angular/core";
import { FilterModelPipe } from "./pipes/filter-model-pipe.pipe";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";


@NgModule({
    declarations:[FilterModelPipe,NavbarComponent],
    exports:[NavbarComponent,FilterModelPipe],
    imports:[MenubarModule,CommonModule]

})
export class SharedModule{}