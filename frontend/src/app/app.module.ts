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
import { AdminServiceOrdersComponent } from './Modules/Admin/Components/admin-dashboard/admin-service-orders/admin-service-orders.component';
import { AdminPartsComponent } from './Modules/Admin/Components/admin-dashboard/admin-parts/admin-parts.component';
import { AdminInvoicesComponent } from './Modules/Admin/Components/admin-dashboard/admin-invoices/admin-invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    TableWrapperComponent,
    AdminServiceOrdersComponent,
    AdminPartsComponent,
    AdminInvoicesComponent
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
