import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { ProblemListRoutingModule } from './problemList-routing.module';
import {ProblemListComponent} from './problemList.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import { FormsModule } from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
// import {WeUiModule} from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    // ElModule,
    // WeUiModule.forRoot(),
    FileUploadModule,
    ProblemListRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [ProblemListComponent]
})
export class ProblemListModule { }
