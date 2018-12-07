import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderDetailsComponent} from './orderDetails.component';

const routes: Routes = [
  {
    path: '', component: OrderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailsRoutingModule { }
