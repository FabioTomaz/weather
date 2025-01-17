import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { BarPlotComponent } from './bar-plot/bar-plot.component';
import { FormComponent } from './form/form.component';
import { CityService } from './api/city.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CustomHttpInterceptor } from "./api/http-interceptor";
import { DialogComponent } from './form/dialog/dialog.component';
import { MatDialogModule } from "@angular/material";
import { NameTakenValidatorDirective } from "./form/name-taken-validator";
import { MatButtonLoadingDirective } from './form/loading/mat-button-loading.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    BarPlotComponent,
    FormComponent,
    DialogComponent,
    NameTakenValidatorDirective,
    MatButtonLoadingDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    CityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
