import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { MyPrizeRoutingModule } from './myPrize-routing.module';
import {MyPrizeComponent} from './myPrize.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
// import {WeUiModule} from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    // WeUiModule.forRoot(),
    MyPrizeRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MyPrizeComponent]
})
export class MyPrizeModule { }
