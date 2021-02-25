import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { DefaultRoutingModule } from './default-routing.module';
import { DefaultDefaultComponent } from './default-default/default-default.component';


@NgModule({
  declarations: [DefaultDefaultComponent],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DefaultModule { }
