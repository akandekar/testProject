import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultDefaultComponent} from './default-default/default-default.component';
import {GuardGuard} from '../shared/auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:DefaultDefaultComponent,
    // canActivate:[GuardGuard]
  },
  {
    path:'default',
    component:DefaultDefaultComponent,
    canActivate:[GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
