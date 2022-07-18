import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSidenavModule,


  ],
  exports:[
    HeaderComponent,
    SidenavComponent,
    SpinnerComponent,
    SelectComponent,
    RouterModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSidenavModule


  ]
})
export class SharedModule { }
