import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from "./Auth/log-in/log-in.component";
import { AuthGuard } from "./Auth/auth.guard";
import { AdminDashboardComponent } from "./Modules/Admin/Components/admin-dashboard/admin-dashboard.component";
import { RoleGuard } from "./Auth/role.guard";
import { AdminUsersComponent } from "./Modules/Admin/Components/admin-dashboard/admin-users/admin-users.component";

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
