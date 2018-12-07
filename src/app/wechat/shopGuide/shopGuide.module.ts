import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ElModule } from 'element-angular';
import { ShopGuideRoutingModule } from './shopGuide-routing.module';
import {ShopGuideComponent} from './shopGuide.component';
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
    ShopGuideRoutingModule
  ],
  providers: [AppService, AppProperties],
  declarations: [ShopGuideComponent]
})
export class ShopGuideModule { }
