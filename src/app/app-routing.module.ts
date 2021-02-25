import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultModule} from './default/default.module';
import {RoutModule} from './rout/rout.module';
import { GuardGuard } from './shared/auth/auth.guard';


const routes: Routes = [
    {
        path:'',
        loadChildren:'./default/default.module#DefaultModule',
    },
    {
        path:'crud',
        loadChildren:'./rout/rout.module#RoutModule',
        canActivate:[GuardGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
