import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

{ path: '', redirectTo:'auth/login', pathMatch:'full'},
{ path: 'auth', canActivate:[LoginGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'admin', canActivate:[AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
{ path: '**', component: PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
