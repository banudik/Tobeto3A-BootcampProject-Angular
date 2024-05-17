import { Routes } from "@angular/router";
import { BootcampstateindexComponent } from "./components/bootcampstate/Index/bootcampstateindex.component";
import { BootcampstatecreateComponent } from "./components/bootcampstate/create/bootcampstatecreate.component";
import { BootcampstateeditComponent } from "./components/bootcampstate/edit/bootcampstateedit.component";
import { BootcampstatedetailsComponent } from "./components/bootcampstate/details/bootcampstatedetails.component";
import { BootcampstatedeleteComponent } from "./components/bootcampstate/delete/bootcampstatedelete.component";
import { BootcampindexComponent } from "./components/bootcamp/index/bootcampindex.component";
import { BootcampcreateComponent } from "./components/bootcamp/create/bootcampcreate.component";
import { BootcampDetailsComponent } from "../../features/components/bootcamps/bootcamp-details/bootcamp-details.component";

export const adminRoutes: Routes = [

    //bootcampState
        { path: "bootcampstateindex", component: BootcampstateindexComponent },
        { path: "bootcampstatecreate", component: BootcampstatecreateComponent },
        { path: "bootcampstateedit/:bootcampStateId", component: BootcampstateeditComponent },
        { path: "bootcampstatedetails/:bootcampStateId", component: BootcampstatedetailsComponent },
        { path: "bootcampstatedelete/:bootcampStateId", component: BootcampstatedeleteComponent },

    //bootcamp
        { path: "bootcampindex", component: BootcampindexComponent },
        { path: "bootcampcreate", component: BootcampcreateComponent },
        { path: "bootcampdetails/:bootcampId", component: BootcampDetailsComponent },
    ];