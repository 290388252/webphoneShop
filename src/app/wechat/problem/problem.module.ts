import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { ProblemRoutingModule } from './problem-routing.module';
import {ProblemComponent} from './problem.component';
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
    ProblemRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [ProblemComponent]
})
export class ProblemModule { }
