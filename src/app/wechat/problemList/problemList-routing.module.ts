import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProblemListComponent} from './problemList.component';

const routes: Routes = [
  {
    path: '', component: ProblemListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemListRoutingModule { }
