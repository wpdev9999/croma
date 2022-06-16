import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

{ path: '', pathMatch:'full', redirectTo:'login'},
{ path: 'login', canActivate:[LoginGuard], loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
{ path: 'admin', canActivate:[AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
{ path: '**', component: PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
