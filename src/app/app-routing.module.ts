import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'users', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
