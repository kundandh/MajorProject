import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentRoutingModule } from "./component/component-routing.module";
import { ComponentModule } from "./component/component.module";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { httpInterceptorProviders } from "./_helpers/http.interceptor";
import { NgModule } from "@angular/core";
import { AdminTempModule } from "./admin/admin.module";
import { AdminTempRoutingModule } from "./admin/admin-routing.module";
import { ModalModule } from "ngx-bootstrap/modal";
import {NgxStripeModule} from "ngx-stripe";


@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentRoutingModule,
    ComponentModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    // AdminModule,
    // AdminRoutingModule
    AdminTempModule,
    AdminTempRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
