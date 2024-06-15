import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './Auth/log-in/log-in.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminDashboardComponent } from './Modules/Admin/Components/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './Modules/Admin/Components/admin-dashboard/admin-users/admin-users.component';
import { TableWrapperComponent } from './Modules/Shared/Components/table-wrapper/table-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    TableWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
