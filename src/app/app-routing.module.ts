import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [/*
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'not-found' }*/
// wechat
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'register', loadChildren: './wechat/register/register.module#RegisterModule'},
  {path: 'main', loadChildren: './wechat/main/main.module#MainModule'},
  {path: 'detail', loadChildren: './wechat/detail/detail.module#DetailModule'},
  {path: 'user', loadChildren: './wechat/user/user-center.module#UserCenterModule'},
  {path: 'shopGuide', loadChildren: './wechat/shopGuide/shopGuide.module#ShopGuideModule'},
  {path: 'problem', loadChildren: './wechat/problem/problem.module#ProblemModule'},
  {path: 'problemList', loadChildren: './wechat/problemList/problemList.module#ProblemListModule'},
  {path: 'coupon', loadChildren: './wechat/user/coupon/coupon.module#CouponModule'},
  {path: 'waterCoupon', loadChildren: './wechat/user/waterCoupon/waterCoupon.module#WaterCouponModule'},
  {path: 'myPrize', loadChildren: './wechat/user/myPrize/myPrize.module#MyPrizeModule'},
  {path: 'orderDetails', loadChildren: './wechat/user/orderDetails/orderDetails.module#OrderDetailsModule'},
  {path: 'myDeclaration', loadChildren: './wechat/myDeclaration/myDeclaration.module#MyDeclarationModule'},
  {path: 'myInviteRewards', loadChildren: './wechat/myInviteRewards/myInviteRewards.module#MyInviteRewardsModule'},
  {path: 'scan', loadChildren: './wechat/scan/scan.module#ScanModule'},
  {path: 'prepaid', loadChildren: './wechat/user/prepaid/prepaid.module#PrepaidModule'},
  {path: 'protocol', loadChildren: './wechat/user/protocol/protocol.module#ProtocolModule'},
  // {path: 'bargain', loadChildren: './wechat/user/bargain/bargain.module#BargainModule'},
  // {path: 'bargainList', loadChildren: './wechat/user/bargainList/bargainList.module#BargainListModule'},
  // {path: 'bargainDetails', loadChildren: './wechat/user/bargainDetails/bargainDetails.module#BargainDetailsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
