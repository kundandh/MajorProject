import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentRoutingModule } from "./component/component-routing.module";
import { ComponentModule } from "./component/component.module";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { httpInterceptorProviders } from "./_helpers/http.interceptor";
import { NgModule } from "@angular/core";


<<<<<<< HEAD

@NgModule({
  declarations: [
    AppComponent,
=======
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentRoutingModule } from './component/component-routing.module';
import { ComponentModule } from './component/component.module';
import {  HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent
>>>>>>> main
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentRoutingModule,
    ComponentModule,
    HttpClientModule,
<<<<<<< HEAD
    NgbModule,
    FormsModule,
    CommonModule
  ],
  providers: [httpInterceptorProviders],
=======
    NgbModule
  ],
  providers: [],
>>>>>>> main
  bootstrap: [AppComponent],
})
export class AppModule {}
