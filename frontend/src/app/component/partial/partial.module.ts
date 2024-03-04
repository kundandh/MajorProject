import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartialRoutingModule } from './partial-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, PartialRoutingModule],
  exports: [NavbarComponent],
})
export class PartialModule {}
