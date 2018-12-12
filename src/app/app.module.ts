import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ViewHospitalComponent } from './dashboard/healthcare/Hospitals/view/view.component';
import { ViewChemistComponent } from './dashboard/healthcare/chemist/view/view.component';

import { ViewDoctorComponent } from './dashboard/healthcare/Doctors/view/view.component';
import { ViewLabComponent } from './dashboard/healthcare/lab/view/view.component';



import { ViewAdminComponent } from './dashboard/helpline/admin/view/view.component';
import { AddUpdateAdminComponent} from './dashboard/helpline/admin/add-update/add-update.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTransferService } from './services/data-transfer.service';
import { AddUpdateOtherComponent } from './dashboard/helpline/Other/add-update/add-update.component';
import { ViewOtherComponent } from './dashboard/helpline/Other/view/view.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { CityService } from './services/city-data.service';
import { AddUpdatePoliceComponent } from './dashboard/helpline/police/add-update/add-update.component';
import { ViewPoliceComponent } from './dashboard/helpline/police/view/view.component';
import { AddUpdateFireComponent } from './dashboard/helpline/fire/add-update/add-update.component';
import { ViewFireComponent } from './dashboard/helpline/fire/view/view.component';
import { AddUpdateNgoComponent } from './dashboard/helpline/ngo/add-update/add-update.component';

import { AmbulanceComponent } from './dashboard/helpline/ambulance/ambulance.component';
import { BloodbankComponent } from './dashboard/helpline/bloodbank/bloodbank.component';
import { IssuesComponent } from './dashboard/helpline/issues/issues.component';
import { EventComponent } from './dashboard/helpline/event/event.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddLocationComponent } from './dashboard/location/addLocation/addLocation.component';
import { LocationServiceComponent } from './dashboard/location/location-services/location-services.component';
import { ViewOutletComponent } from './dashboard/outlet/view/view.component';
import { ViewAmbulanceComponent } from './dashboard/helpline/ambulance/view/view.component';
import { ViewBloodBankComponent } from './dashboard/helpline/bloodbank/view/view.component';
import { ViewNgoComponent } from './dashboard/helpline/ngo/view/view.component';
import { ViewIssuesComponent } from './dashboard/helpline/issues/view/view.component';
import { ViewEventComponent } from './dashboard/helpline/event/view/view.component';
import { FormService } from './services/form.service';
import { AddUpdateDoctorsComponent } from './dashboard/healthcare/Doctors/add-update/add-update.component';
import { AddUpdateLabsComponent } from './dashboard/healthcare/lab/add-update/add-update.component';
import { AddUpdateHospitalsComponent } from './dashboard/healthcare/Hospitals/add-update/add-update.component';
import { LabComponent } from './dashboard/healthcare/lab/lab.component';
import { ChemistComponent } from './dashboard/healthcare/chemist/chemist.component';
import { AddUpdateChemistsComponent } from './dashboard/healthcare/chemist/add-update/add-update.component';
import { DoctorComponent } from './dashboard/healthcare/Doctors/doctor.component';
import { HospitalComponent } from './dashboard/healthcare/Hospitals/hospital.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { Chemist } from './dashboard/models/chemist';

import { Hospital } from './dashboard/models/hospital';
import { DoctorHome } from './dashboard/healthcare/Doctors/doctorhome/doctorhome.component';
import { Doctor } from './dashboard/models/doctor';
import { DoctorService } from './services/doctor.service';
import { HospitalHome } from './dashboard/healthcare/Hospitals/hospitalhome/hospitalhome.component';
import { HospitalService } from './services/hospital.service';
import { ChemistHome } from './dashboard/healthcare/chemist/chemisthome/chemisthome.component';
import { ChemistService } from './services/chemist.service';

import { LabService } from './services/lab.service';
import { LabHome } from './dashboard/healthcare/lab/labhome/labhome.component';
import { ViewSpecializationComponent } from './dashboard/healthcare/common/view/view.component';

import { AddUpdateDegreeComponent } from './dashboard/healthcare/degree/add-update/add-update.component';
import { ViewDegreeComponent } from './dashboard/healthcare/degree/view/view.component';
import { AddUpdateSpecializationComponent } from './dashboard/healthcare/common/add/add-update.component';
import { AddUpdateHospitalGroupComponent } from './dashboard/healthcare/Hospitals/hospitalgroup/add-update/add-update.component';
import { ViewHospitalGroupComponent } from './dashboard/healthcare/Hospitals/hospitalgroup/view/view.component';
import { AddHospitalDepartment } from './dashboard/healthcare/Hospitals/department/add-update/department';
import { ViewHospitalDepartment } from './dashboard/healthcare/Hospitals/department/view/view.component';
import { ViewHospitalFacility } from './dashboard/healthcare/Hospitals/facilities/view/view.component';
import { AddHospitalFacility } from './dashboard/healthcare/Hospitals/facilities/add-update/facilities';
import { AddLabService } from './dashboard/healthcare/lab/test/add-update/test';
import { ViewLabService } from './dashboard/healthcare/lab/test/view/view.component';
import { ViewLabTiming } from './dashboard/healthcare/lab/timings/view/view.component';
import { AddLabTiming } from './dashboard/healthcare/lab/timings/add-update/add-update.component';
import { ViewDoctorEducation } from './dashboard/healthcare/Doctors/eduspl/view/view.component';
import { AddDoctorEducation } from './dashboard/healthcare/Doctors/eduspl/add-update/eduspl';
import { AddDoctorSpecialization } from './dashboard/healthcare/Doctors/specialization/add-update/add-update.component';
import { ViewDoctorSpecialization } from './dashboard/healthcare/Doctors/specialization/view/view.component';
import { AddDoctorTiming } from './dashboard/healthcare/Doctors/timing/add-update/timing';
import { ViewDoctorTiming } from './dashboard/healthcare/Doctors/timing/view/view.component';
import { AddHospitalImages } from './dashboard/healthcare/Hospitals/images/add-update/images';
import { ViewHospitalImages } from './dashboard/healthcare/Hospitals/images/view/view.component';
import { ViewVehicle } from './dashboard/transport/vehicle/view/view.component';
import { AddUpdateVehicleComponent } from './dashboard/transport/vehicle/add-update/add-update.component';
import { ViewLink } from './dashboard/transport/link/view/view.component';
import { AddUpdateLinkComponent } from './dashboard/transport/link/add-update/add-update.component';

import { ViewCompany } from './dashboard/transport/company/view/view.component';
import { AddUpdateCompanyComponent } from './dashboard/transport/company/add-update/add-update.component';
import { ViewStop } from './dashboard/transport/stop/view/view.component';
import { AddUpdateStopComponent } from './dashboard/transport/stop/add-update/add-update.component';
import { AddUpdateRouteComponent } from './dashboard/transport/route/add-update/add-update.component';
import { ViewRoute } from './dashboard/transport/route/view/view.component';
import { ViewModerateCompany } from './dashboard/transport/company/viewmoderate/viewmoderate';
import { ViewModerateLink } from './dashboard/transport/link/viewmoderate/viewmoderate';
import { ViewModerateVehicle } from './dashboard/transport/vehicle/viewmoderate/viewmoderate';
import { ViewModerateStop } from './dashboard/transport/stop/viewmoderate/viewmoderate';
import { ViewModerateRoute } from './dashboard/transport/route/viewmoderate/viewmoderate';
import { AddUpdateVehicleConfigurationComponent } from './dashboard/transport/vehicle/configuration/add-update/add-update.component';
import { ViewVehicleConfiguration } from './dashboard/transport/vehicle/configuration/view/view.component';
import { ViewModerateVehicleConfiguration } from './dashboard/transport/vehicle/configuration/viewmoderate/viewmoderate';
import { AddUpdateHomeImageComponent } from './dashboard/transport/homeimage/add-update/add-update.component';
import { ViewHomeImage } from './dashboard/transport/homeimage/view/view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import { FailureDialog } from './dashboard/failuredialog/failuredialog';
import { SuccessDialog } from './dashboard/successdialog/successdialog';



const appRoutes: Routes = [
  { path: 'chemist', component: ViewChemistComponent},
  { path: 'chemisthome/:id', component: ChemistHome},
  { path: 'lab', component: ViewLabComponent},
  { path: 'labhome/:id', component: LabHome},
  { path: 'doctors', redirectTo: '/Doctors' },
  { path: 'doctor/:id', redirectTo: '/doctorhome/:id' },
  { path: 'Doctors', component: ViewDoctorComponent},
  { path: 'doctorhome/:id', component: DoctorHome },
  { path: 'doctors', redirectTo: '/Doctors' },
  { path: 'doctor/:id', redirectTo: '/doctorhome/:id' },
  { path: 'hospitalhome/:id', component: HospitalHome },
  { path: 'Hospitals', component: ViewHospitalComponent},
  { path: 'degree', component:ViewDegreeComponent},
  { path: 'degreeform', component:AddUpdateDegreeComponent},
  { path: 'degreeform/:id', component:AddUpdateDegreeComponent},
  { path: 'common', component:ViewSpecializationComponent},
  { path: 'specializationform', component:AddUpdateSpecializationComponent},
  { path: 'specializationform/:id', component:AddUpdateSpecializationComponent},
  
  
  { path: 'adddoctoreducation/:id', component: AddDoctorEducation},
  { path: 'adddoctoreducation/:id/:id2', component: AddDoctorEducation},
  { path: 'adddoctoreducation', component: AddDoctorEducation},
  { path: 'viewdoctoreducation/:id', component: ViewDoctorEducation},
  { path: 'adddoctorspecialization/:id', component: AddDoctorSpecialization},
  { path: 'adddoctorspecialization/:id/:id2', component: AddDoctorSpecialization},
  { path: 'adddoctorspecialization', component: AddDoctorSpecialization},
  { path: 'viewdoctorspecialization/:id', component: ViewDoctorSpecialization},

  
  { path: 'addhospitaldepartment/:id', component: AddHospitalDepartment},
  { path: 'addhospitaldepartment/:id/:id2', component: AddHospitalDepartment},
  { path: 'viewhospitaldepartment/:id', component: ViewHospitalDepartment},
  { path: 'addhospitalgroup', component:AddUpdateHospitalGroupComponent},
  { path: 'addhospitalgroup/:id', component:AddUpdateHospitalGroupComponent},
  {path: 'viewhospitalgroups', component: ViewHospitalGroupComponent},
  {path: 'viewhospitalfacility/:id', component: ViewHospitalFacility},
  {path: 'addhospitalfacility/:id', component: AddHospitalFacility},
  {path: 'addhospitalfacility/:id/:id2', component: AddHospitalFacility},
  {path: 'addlabservice/:id', component: AddLabService},
  {path: 'addlabservice/:id/:id2', component: AddLabService},
  {path: 'viewlabservice/:id', component: ViewLabService},
  {path: 'viewlabservice/:id/:id2', component: ViewLabService},
  {path: 'viewlabtiming/:id', component: ViewLabTiming},
  {path: 'addlabtiming/:id', component: AddLabTiming},
  {path: 'addlabtiming/:id/:id2', component: AddLabTiming},
  {path: 'viewdoctortiming/:id', component: ViewDoctorTiming},
  {path: 'adddoctortiming/:id', component: AddDoctorTiming},
  {path: 'adddoctortiming/:id/:id2', component: AddDoctorTiming},
  {path: 'addhospitalimages/:id', component: AddHospitalImages},
  {path: 'viewhospitalimages/:id', component: ViewHospitalImages},
  {path: 'addhospitalimages/:id/:id2', component: AddHospitalImages},
  

  { path: 'admin', component: ViewAdminComponent},
  { path: 'ambulance', component: ViewAmbulanceComponent},
  { path: 'bloodbank', component: ViewBloodBankComponent},
  { path: 'event', component: ViewEventComponent},
  { path: 'fire', component: ViewFireComponent},
  { path: 'issues', component: ViewIssuesComponent},
  { path: 'ngo', component: ViewNgoComponent},
  { path: 'other', component: ViewOtherComponent},
  { path: 'police', component: ViewPoliceComponent},
  { path: 'adminform', component: AddUpdateAdminComponent},
  { path: 'fireform', component: AddUpdateFireComponent},
  { path: 'doctorform', component: AddUpdateDoctorsComponent},
  { path: 'doctorform/:id', component: AddUpdateDoctorsComponent},
  { path: 'hospitalform', component: AddUpdateHospitalsComponent},
  { path: 'hospitalform/:id', component: AddUpdateHospitalsComponent},
  { path: 'labform', component: AddUpdateLabsComponent},
  { path: 'labform/:id', component: AddUpdateLabsComponent},
  { path: 'addvehicle', component: AddUpdateVehicleComponent},
  { path: 'addvehicle/:id', component: AddUpdateVehicleComponent},
  { path: 'viewvehicle', component:ViewVehicle},
  { path: 'addlink', component: AddUpdateLinkComponent},
  { path: 'addlink/:id', component: AddUpdateLinkComponent},
  { path: 'viewlink', component:ViewLink},
  { path: 'addcompany', component: AddUpdateCompanyComponent},
  { path: 'addcompany/:id', component: AddUpdateCompanyComponent},
  { path: 'viewcompany', component:ViewCompany},
  { path: 'addstop', component: AddUpdateStopComponent},
  { path: 'addstop/:id', component: AddUpdateStopComponent},
  { path: 'viewstop', component:ViewStop},
  { path: 'addroute', component: AddUpdateRouteComponent},
  { path: 'addroute/:id', component: AddUpdateRouteComponent},
  { path: 'viewroute', component:ViewRoute},
  { path: 'moderatecompany', component:ViewModerateCompany},
  { path: 'moderatelink', component:ViewModerateLink},
  { path: 'moderatevehicle', component:ViewModerateVehicle},
  { path: 'moderatestop', component:ViewModerateStop},
  { path: 'moderateroute', component:ViewModerateRoute},
  { path: 'addvehicleconfiguration/:id', component:AddUpdateVehicleConfigurationComponent},
  { path: 'addvehicleconfiguration/:id/:id2', component:AddUpdateVehicleConfigurationComponent},
  { path: 'vehicleconfiguration/:id', component:ViewVehicleConfiguration},
  { path: 'moderatevehicleconfiguration/:id', component:ViewModerateVehicleConfiguration},
  { path: 'addhomeimage', component:AddUpdateHomeImageComponent},
  { path: 'viewhomeimage', component:ViewHomeImage},
  
  

  { path: 'chemistform', component: AddUpdateChemistsComponent},
  { path: 'chemistform/:id', component: AddUpdateChemistsComponent},
  { path: 'policeform', component: AddUpdatePoliceComponent},
  { path: 'ambulanceform', component: AmbulanceComponent},
  { path: 'bloodbankform', component: BloodbankComponent},
  { path: 'ngoform', component: AddUpdateNgoComponent},
  { path: 'issuesform', component: IssuesComponent},
  { path: 'eventformeventform', component: EventComponent},
  { path: 'otherform', component: AddUpdateOtherComponent},
  { path: 'locationform', component: AddLocationComponent},
  { path: 'outlet', component: ViewOutletComponent}
];

@NgModule({
exports: [
  RouterModule,
   // CDK
   A11yModule,
   BidiModule,
   ObserversModule,
   OverlayModule,
   PlatformModule,
   PortalModule,
   ScrollDispatchModule,
   CdkStepperModule,
   CdkTableModule,
   
   // Material
   MatAutocompleteModule,
   MatButtonModule,
   MatButtonToggleModule,
   MatCardModule,
   MatCheckboxModule,
   MatChipsModule,
   MatDatepickerModule,
   MatDialogModule,
   MatExpansionModule,
   MatGridListModule,
   MatIconModule,
   MatInputModule,
   MatListModule,
   MatMenuModule,
   MatProgressBarModule,
   MatProgressSpinnerModule,
   MatRadioModule,
   MatRippleModule,
   MatSelectModule,
   MatSidenavModule,
   MatSlideToggleModule,
   MatSliderModule,
   MatSnackBarModule,
   MatStepperModule,
   MatTableModule,
   MatTabsModule,
   MatToolbarModule,
   MatTooltipModule,
   MatNativeDateModule,
]
})

export class MaterialModule{}


@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    ViewAdminComponent,
    AddUpdateAdminComponent,
    AddUpdateOtherComponent,
    ViewOtherComponent,
    DropdownDirective,
    AddUpdatePoliceComponent,
    ViewPoliceComponent,
    AddUpdateDoctorsComponent,
    AddUpdateHospitalGroupComponent,
    ViewHospitalGroupComponent,
    AddHospitalDepartment,
    ViewHospitalDepartment,
    ViewHospitalFacility,
    AddHospitalFacility,
    AddDoctorEducation,
    ViewDoctorEducation,
    AddDoctorSpecialization,
    ViewDoctorSpecialization,
  
    
    AddUpdateHospitalsComponent,
    AddUpdateLabsComponent,
    AddUpdateChemistsComponent,
    AddUpdateFireComponent,
    ViewFireComponent,
    ViewNgoComponent,
    AddUpdateNgoComponent,
    ViewAmbulanceComponent,
    AmbulanceComponent,
    ViewBloodBankComponent,
    BloodbankComponent,
    ViewIssuesComponent,
    IssuesComponent,
    ViewEventComponent,
    EventComponent,
    SidebarComponent,
    SuccessDialog,
    FailureDialog,
    LabComponent,
    ChemistComponent,
    DoctorHome,
    ChemistHome,
    LabHome,
    HospitalHome,
    ViewVehicle,
    AddUpdateVehicleComponent,
    ViewLink,
    AddUpdateLinkComponent,
    AddUpdateCompanyComponent,
    ViewCompany,
    AddUpdateStopComponent,
    ViewStop,
    AddUpdateRouteComponent,
    ViewRoute,
    ViewModerateCompany,
    ViewModerateLink,
    ViewModerateVehicle,
    ViewModerateStop,
    ViewModerateRoute,
    AddUpdateVehicleConfigurationComponent,
    ViewVehicleConfiguration,
    ViewModerateVehicleConfiguration,
    AddUpdateHomeImageComponent,
    ViewHomeImage,
  
    AddHospitalImages,
    ViewHospitalImages,
    AddLabService,
    ViewLabService,
    AddDoctorTiming,
    ViewDoctorTiming,

    DoctorComponent,
    HospitalComponent,
    AddLocationComponent,
    LocationServiceComponent,
    ViewOutletComponent,
    ViewChemistComponent,
    ViewDoctorComponent,
    ViewHospitalComponent,
    ViewDegreeComponent,
    
    ViewSpecializationComponent,
    AddUpdateDegreeComponent,
    AddUpdateSpecializationComponent,
    ViewLabComponent,
    ViewLabTiming,
    AddLabTiming,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularMultiSelectModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes),
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule
  ],
  providers: [DataTransferService, CityService, FormService,DoctorService,HospitalService,ChemistService,LabService],
  bootstrap: [AppComponent],
  entryComponents:[SuccessDialog,FailureDialog],
})
export class AppModule { }
