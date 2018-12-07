import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { MyInviteRewardsRoutingModule } from './myInviteRewards-routing.module';
import {MyInviteRewardsComponent} from './myInviteRewards.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
// import {WeUiModule} from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    // WeUiModule.forRoot(),
    MyInviteRewardsRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [MyInviteRewardsComponent]
})
export class MyInviteRewardsModule { }
