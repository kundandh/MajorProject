import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartialRoutingModule } from './partial-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';

import { TagsComponent } from './tags/tags.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    SearchComponent,
    TagsComponent,
  ],
  imports: [CommonModule, PartialRoutingModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    SearchComponent,
    TagsComponent,
  ],
})
export class PartialModule {}
