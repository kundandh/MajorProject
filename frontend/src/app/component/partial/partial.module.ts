import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartialRoutingModule } from './partial-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';

import { TagsComponent } from './tags/tags.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { ProfileComponent } from "../profile/profile.component";
import { BlogComponent } from '../blog/blog.component';
import { PostDetailsComponent } from '../post-details/post-details.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        NotFoundComponent,
        SearchComponent,
        TagsComponent,
        BlogComponent,
        PostDetailsComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        NotFoundComponent,
        SearchComponent,
        TagsComponent,
    ],
    imports: [CommonModule, PartialRoutingModule, LoginComponent, RegisterComponent, ProfileComponent]
})
export class PartialModule {}
