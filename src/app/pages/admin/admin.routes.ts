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
import { ApplicationstateindexComponent } from "./components/applicationstate/index/applicationstateindex.component";
import { ApplicationstatecreateComponent } from "./components/applicationstate/create/applicationstatecreate.component";
import { ApplicationstatedeleteComponent } from "./components/applicationstate/delete/applicationstatedelete.component";
import { ApplicationstatedetailsComponent } from "./components/applicationstate/details/applicationstatedetails.component";
import { ApplicationstateeditComponent } from "./components/applicationstate/edit/applicationstateedit.component";
import { ApplicationdetailsComponent } from "./components/application/details/applicationdetails.component";
import { ApplicationeditComponent } from "./components/application/edit/applicationedit.component";
import { ApplicationindexComponent } from "./components/application/index/applicationindex.component";
import { ApplicationdeleteComponent } from "./components/application/delete/applicationdelete.component";

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

    //ApplicationState
        { path: "applicationstateindex", component: ApplicationstateindexComponent },
        { path: "applicationstatecreate", component: ApplicationstatecreateComponent },
        { path: "applicationstatedetails/:applicationStateId", component: ApplicationstatedetailsComponent },
        { path: "applicationstateedit/:applicationStateId", component: ApplicationstateeditComponent },
        { path: "applicationstatedelete/:applicationStateId", component: ApplicationstatedeleteComponent },

    //Application
        { path: "applicationindex", component: ApplicationindexComponent },
        { path: "applicationdetails/:applicationId", component: ApplicationdetailsComponent },
        { path: "applicationedit/:applicationId", component: ApplicationeditComponent },
        { path: "applicationdelete/:applicationId", component: ApplicationdeleteComponent },
    ];