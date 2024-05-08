import { Routes } from "@angular/router";
import { BootcampstateindexComponent } from "./components/bootcampstate/Index/bootcampstateindex.component";
import { BootcampstatecreateComponent } from "./components/bootcampstate/create/bootcampstatecreate.component";
import { BootcampstateeditComponent } from "./components/bootcampstate/edit/bootcampstateedit.component";
import { BootcampstatedetailsComponent } from "./components/bootcampstate/details/bootcampstatedetails.component";
import { BootcampstatedeleteComponent } from "./components/bootcampstate/delete/bootcampstatedelete.component";
import { BootcampindexComponent } from "./components/bootcamp/index/bootcampindex.component";
import { BootcampcreateComponent } from "./components/bootcamp/create/bootcampcreate.component";
import { BootcampeditComponent } from "./components/bootcamp/edit/bootcampedit.component";
import { BootcampdetailsComponent } from "./components/bootcamp/details/bootcampdetails.component";
import { BootcampdeleteComponent } from "./components/bootcamp/delete/bootcampdelete.component";

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
        { path: "bootcampdetails/:bootcampId", component: BootcampdetailsComponent },
        { path: "bootcampedit/:bootcampId", component: BootcampeditComponent },
        { path: "bootcampdelete/:bootcampId", component: BootcampdeleteComponent },
    ];