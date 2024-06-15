import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from "./Auth/log-in/log-in.component";
import { AuthGuard } from "./Auth/auth.guard";
import { HomeComponent } from "./Components/home/home.component";

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
