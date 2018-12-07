import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyInviteRewardsComponent} from './myInviteRewards.component';

const routes: Routes = [
  {
    path: '', component: MyInviteRewardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyInviteRewardsRoutingModule { }
