import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShopGuideComponent} from './shopGuide.component';

const routes: Routes = [
  {
    path: '', component: ShopGuideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopGuideRoutingModule { }
