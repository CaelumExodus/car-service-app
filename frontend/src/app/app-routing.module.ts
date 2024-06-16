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
  AdminInvoicesComponent
} from "./Modules/Admin/Components/admin-dashboard/admin-invoices/admin-invoices.component";
import {
  AdminComplaintsComponent
} from "./Modules/Admin/Components/admin-dashboard/admin-complaints/admin-complaints.component";

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
      { path: 'parts', component: AdminPartsComponent },
      { path: 'invoices', component: AdminInvoicesComponent },
      { path: 'complaints', component: AdminComplaintsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
