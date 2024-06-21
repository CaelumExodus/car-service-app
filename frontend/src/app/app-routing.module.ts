import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from "./Auth/log-in/log-in.component";
import { AuthGuard } from "./Auth/auth.guard";
import { AdminDashboardComponent } from "./Modules/Admin/Components/admin-dashboard/admin-dashboard.component";
import { RoleGuard } from "./Auth/role.guard";
import { AdminUsersComponent } from "./Modules/Admin/Components/admin-dashboard/admin-users/admin-users.component";
import {
  AdminServiceOrdersComponent
} from "./Modules/Admin/Components/admin-dashboard/admin-service-orders/admin-service-orders.component";
import {AdminPartsComponent} from "./Modules/Admin/Components/admin-dashboard/admin-parts/admin-parts.component";
import {
  AdminComplaintsComponent
} from "./Modules/Admin/Components/admin-dashboard/admin-complaints/admin-complaints.component";
import { ClientDashboardComponent } from "./Modules/Client/client-dashboard/client-dashboard.component";
import {
  ClientServiceOrdersComponent
} from "./Modules/Client/client-dashboard/client-service-orders/client-service-orders.component";
import {
  ClientComplaintsComponent
} from "./Modules/Client/client-dashboard/client-complaints/client-complaints.component";
import { ServiceDashboardComponent } from "./Modules/Service/service-dashboard/service-dashboard.component";
import {
  ServiceServiceOrdersComponent
} from "./Modules/Service/service-dashboard/service-service-orders/service-service-orders.component";
import { ServicePartsComponent } from "./Modules/Service/service-dashboard/service-parts/service-parts.component";
import { WarehouseDashboardComponent } from "./Modules/Warehouse/warehouse-dashboard/warehouse-dashboard.component";
import {
  WarehousePartsComponent
} from "./Modules/Warehouse/warehouse-dashboard/warehouse-parts/warehouse-parts.component";
import {
  AdminServicesComponent
} from "./Modules/Admin/Components/admin-dashboard/admin-services/admin-services.component";

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' },
    children: [
      { path: 'users', component: AdminUsersComponent },
      { path: 'service-orders', component: AdminServiceOrdersComponent },
      { path: 'services', component: AdminServicesComponent },
      { path: 'parts', component: AdminPartsComponent },
      { path: 'complaints', component: AdminComplaintsComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: '**', redirectTo: 'users' }
    ]
  },
  {
    path: 'client',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'client' },
    children: [
      { path: 'service-orders', component: ClientServiceOrdersComponent },
      { path: 'complaints', component: ClientComplaintsComponent },
      { path: '', redirectTo: 'service-orders', pathMatch: 'full' },
      { path: '**', redirectTo: 'service-orders', pathMatch: 'full'}
    ]
  },
  {
    path: 'service',
    component: ServiceDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'service' },
    children: [
      { path: 'service-orders', component: ServiceServiceOrdersComponent },
      { path: 'parts', component: ServicePartsComponent },
      { path: '', redirectTo: 'service-orders', pathMatch: 'full' },
      { path: '**', redirectTo: 'service-orders', pathMatch: 'full'}
    ]
  },
  {
    path: 'warehouse',
    component: WarehouseDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'warehouse' },
    children: [
      { path: 'parts', component: WarehousePartsComponent },
      { path: '', redirectTo: 'parts', pathMatch: 'full' },
      { path: '**', redirectTo: 'parts', pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
