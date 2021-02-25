import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { RoutRoutingModule } from './rout-routing.module';
import { OperationComponent } from './operation/operation.component';
import { OperationDefaultComponent } from './operation-default/operation-default.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {  
//   MatButtonModule,  
//   MatMenuModule,  
//   MatToolbarModule,  
//   MatIconModule,  
//   MatCardModule,  
//   MatFormFieldModule,  
//   MatInputModule,  
//   MatDatepickerModule,  
//   MatDatepicker,  
//   MatNativeDateModule,  
//   MatRadioModule,  
//   MatSelectModule,  
//   MatOptionModule,  
//   MatSlideToggleModule,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher  
// } from '@angular/material';  


@NgModule({
  declarations: [OperationComponent, OperationDefaultComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RoutRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class RoutModule { }
