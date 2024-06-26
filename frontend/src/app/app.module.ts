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
import { AdminComplaintsComponent } from './Modules/Admin/Components/admin-dashboard/admin-complaints/admin-complaints.component';
import { AdminEditUserModalComponent } from './Modules/Admin/Components/admin-dashboard/admin-users/admin-edit-user-modal/admin-edit-user-modal.component';
import { ClientDashboardComponent } from './Modules/Client/client-dashboard/client-dashboard.component';
import { ClientServiceOrdersComponent } from './Modules/Client/client-dashboard/client-service-orders/client-service-orders.component';
import { ClientComplaintsComponent } from './Modules/Client/client-dashboard/client-complaints/client-complaints.component';
import { ClientAddServiceOrderModalComponent } from './Modules/Client/client-dashboard/client-service-orders/client-add-service-order-modal/client-add-service-order-modal.component';
import { ServiceDashboardComponent } from './Modules/Service/service-dashboard/service-dashboard.component';
import { ServiceServiceOrdersComponent } from './Modules/Service/service-dashboard/service-service-orders/service-service-orders.component';
import { ServicePartsComponent } from './Modules/Service/service-dashboard/service-parts/service-parts.component';
import { WarehouseDashboardComponent } from './Modules/Warehouse/warehouse-dashboard/warehouse-dashboard.component';
import { WarehousePartsComponent } from './Modules/Warehouse/warehouse-dashboard/warehouse-parts/warehouse-parts.component';
import { WarehouseAddPartModalComponent } from './Modules/Warehouse/warehouse-dashboard/warehouse-parts/warehouse-add-part-modal/warehouse-add-part-modal.component';
import { AdminServicesComponent } from "./Modules/Admin/Components/admin-dashboard/admin-services/admin-services.component";
import { ClientCreateComplaintModalComponent } from './Modules/Client/client-dashboard/client-service-orders/client-create-complain-modal/client-create-complaint-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    TableWrapperComponent,
    AdminServiceOrdersComponent,
    AdminPartsComponent,
    AdminComplaintsComponent,
    AdminEditUserModalComponent,
    ClientDashboardComponent,
    ClientServiceOrdersComponent,
    ClientComplaintsComponent,
    ClientAddServiceOrderModalComponent,
    ServiceDashboardComponent,
    ServiceServiceOrdersComponent,
    ServicePartsComponent,
    WarehouseDashboardComponent,
    WarehousePartsComponent,
    WarehouseAddPartModalComponent,
    AdminServicesComponent,
    ClientCreateComplaintModalComponent
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
