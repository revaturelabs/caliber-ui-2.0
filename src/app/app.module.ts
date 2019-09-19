import {BrowserModule} from '@angular/platform-browser';

import {NgModule} from '@angular/core';
import {UserModule} from './User/user/user.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ErrorComponent} from './error-handling/error/error.component';
import {AppRoutingModule} from './app-routing.module';
import {CreateModalComponent} from './Assess-Batch/Modals/create-modal/create-modal.component';
import {FormModalComponent} from './Assess-Batch/Components/toolbar/form-modal/form-modal.component';
import {AssessBatchService} from "./services/assess-batch.service";
import {QaService} from "./quality-audit/services/qa.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    CreateModalComponent,
    FormModalComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AssessBatchService,
    QaService
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    FormModalComponent
  ]
})
export class AppModule { }
