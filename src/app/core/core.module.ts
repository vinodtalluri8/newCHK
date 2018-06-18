/** This file is contains the imports and declarations for the core module **/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { SharedModule } from 'diva-shared-apps/shared.module';
import { MatMenuModule } from '@angular/material/menu';
// import { NavbarMenuItemsComponent } from 'diva-shared-apps/components/navbar-menu-items/navbar-menu-items.component';
// import { NavbarTopmenuComponent } from 'diva-shared-apps/components/navbar-topmenu/navbar-topmenu.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, SharedModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class CoreModule { }
