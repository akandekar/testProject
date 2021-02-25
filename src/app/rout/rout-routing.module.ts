import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OperationComponent} from './operation/operation.component';
import {OperationDefaultComponent} from './operation-default/operation-default.component';
import { GuardGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:OperationDefaultComponent,
    canActivate:[GuardGuard]
  },
  {
    path:'operation',
    component:OperationComponent,
    canActivate:[GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutRoutingModule { }
