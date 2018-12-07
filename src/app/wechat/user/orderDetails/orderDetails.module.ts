import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { OrderDetailsRoutingModule } from './orderDetails-routing.module';
import {OrderDetailsComponent} from './orderDetails.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import { FormsModule } from '@angular/forms';
// import {WeUiModule} from 'ngx-weui';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    // ElModule,
    // WeUiModule.forRoot(),
    FormsModule,
    OrderDetailsRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [OrderDetailsComponent]
})
export class OrderDetailsModule { }
