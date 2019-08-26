import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocationsRoutingService } from './locations-routing.service';
import { LocationspageComponent } from '../locationspage/locationspage.component';
import { AddlocationmodalComponent } from '../locationspage/addlocationmodal/addlocationmodal.component';
import { EditlocationmodalComponent } from '../locationspage/editlocationmodal/editlocationmodal.component';
import { LocationrowComponent } from '../locationspage/locationrow/locationrow.component';
import { FormsModule } from '@angular/forms';
import { DisableLocationModalComponent } from '../locationspage/disable-location-modal/disable-location-modal.component';

@NgModule({
  declarations: [
    LocationspageComponent,
    AddlocationmodalComponent,
    EditlocationmodalComponent,
    DisableLocationModalComponent,
    LocationrowComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LocationsRoutingService,
    FormsModule
  ]
})
export class LocationsModule { }
