import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class AppProperties {
  // public
  public appUrl: string;
  public adminUrl: string;
  public imgUrl: string;
  public shopImgUrl: string;
  public isClosedUrl: string;
  public adminOauth2Url: string;
  public machineInfoGetCompanyIdUrl: string;
  public machineSuggestionUrl: string;
  // WeChat
  public indexListUrl: string;
  public indexOpenDoor: string;
  public wechatOauth2Url: string;
  public aliGetUserIdUrl: string;
  public smsSendUrl: string;
  public followWechatSubscription: string;
  public wechatRegisterUrl: string;
  public findAllUserOrderUrl: string;
  public orderUnifiedOrderUrl: string;
  public nonePassWordPayUrl: string;
  public findMachineHistoryUrl: string;
  public couponAvailable: string;
  public shoppingWaterCouponUrl: string;
  public applyRefundUrl: string;
  public IfApplayRefundUrl: string;
  public suggestionImgUrl: string;
  public wechatShareInfoUrl: string;
  public prizeUrl: string;

  public shopUserMoneyUrl: string;
  public tblCustomerMyInfo: string;
  public tblCustomerMyInviteRewards: string;
  public tblCustomerMyDeclaration: string;
  public tblCustomerComplainReplyIsReplyUrl: string;
  public tblCustomerComplainReplyAddUrl: string;
  public tblCustomerComplainReplyDetails: string;
  public shopPrepaidAddUrl: string;
  public shopPrepaidBuyUrl: string;
  public alipayWapPayUrl: string;

  constructor() {
    // Public
    this.appUrl = 'http://120.79.74.231:6662/ys_sms';
    // this.appUrl = 'http://192.168.0.108:6662/ys_sms';
    this.adminUrl = 'http://119.23.233.123:6662/ys_admin';
    // this.adminUrl = 'http://192.168.0.108:6662/ys_admin';
    // this.appUrl = 'http://47.106.92.82:6662/ys_sms';
    this.imgUrl = this.adminUrl + '/files/';
    this.isClosedUrl = this.appUrl + '/wechat/isClosed';
    this.adminOauth2Url = this.appUrl + '/admin/oauth2';
    this.machineInfoGetCompanyIdUrl = this.appUrl + '/machineInfo/getCompanyId?vmCode=';
    this.machineSuggestionUrl = this.adminUrl + '/tblCustomerComplain/add';
    this.shopImgUrl = this.adminUrl + '/shoppingGoodsImg/';
    // WeChat
    this.indexListUrl = this.appUrl + '/index/listWay';
    this.indexOpenDoor = this.appUrl + '/index/openDoor';
    this.wechatOauth2Url = this.appUrl + '/wechat/oauth2';
    this.aliGetUserIdUrl = this.appUrl + '/aliUser/getAuthorizationUrl';
    this.smsSendUrl = this.appUrl + '/sms/send';
    this.wechatRegisterUrl = this.appUrl + '/wechat/register';
    this.followWechatSubscription = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0NzQ4MTY0Mg==&scene=124#wechat_redirect';
    // this.findAllUserOrderUrl = this.appUrl + '/order/myOrderList';
    this.findAllUserOrderUrl = this.appUrl + '/alipayRecord/getCustomerOrder';
    this.orderUnifiedOrderUrl = this.appUrl + '/order/unifiedOrder';
    this.nonePassWordPayUrl = this.appUrl + '/wechat/entrustweb';
    this.findMachineHistoryUrl = this.appUrl + '/order/findMachineHistory';
    // this.couponAvailable = this.appUrl + '/tblCustomer/myCoupon'; ??
    this.couponAvailable = this.adminUrl + '/frontCoupon/myList';
    this.couponAvailable = this.adminUrl + '/frontCoupon/myList';
    // this.shoppingWaterCouponUrl = this.appUrl + '/tblCustomer/myCarryWaterVouchers';  ??
    this.shoppingWaterCouponUrl = this.adminUrl + '/carryWaterVouchersCustomer/myCarryWaterVouchers';
    this.applyRefundUrl = this.appUrl + '/refundApplication/do';
    this.IfApplayRefundUrl = this.appUrl + '/refundApplication/get';
    this.shopUserMoneyUrl = this.appUrl + '/member/findBean';
    // this.tblCustomerMyInfo  = this.appUrl + '/tblCustomer/myInfo'; ??
    this.tblCustomerMyInfo = this.adminUrl + '/tblCustomerWx/getBean';
    // this.tblCustomerMyInviteRewards  = this.appUrl + '/tblCustomer/myInviteRewards'; ??
    this.tblCustomerMyInviteRewards  = this.adminUrl + '/tblCustomerWx/myInviteRewards';
    // this.tblCustomerMyDeclaration  = this.appUrl + '/tblCustomer/myDeclaration'; ??
    this.tblCustomerMyDeclaration  = this.adminUrl + '/tblCustomerComplain/myDeclaration';
    // this.tblCustomerComplainReplyIsReplyUrl  = this.appUrl + '/tblCustomerComplainReply/isReply'; ??
    this.tblCustomerComplainReplyIsReplyUrl  = this.adminUrl + '/complainReply/isReply';
    // this.tblCustomerComplainReplyAddUrl  = this.appUrl + '/tblCustomerComplainReply/add'; ??
    this.tblCustomerComplainReplyAddUrl  = this.adminUrl + '/complainReply/add';
    // this.tblCustomerComplainReplyDetails = this.appUrl + '/tblCustomerComplainReply/replyDetails'; ??
    this.tblCustomerComplainReplyDetails = this.adminUrl + '/complainReply/replyDetails';

    this.suggestionImgUrl = this.adminUrl + '/complainImg/';
    this.wechatShareInfoUrl = this.appUrl + '/wechat/shareInfo';
    // this.prizeUrl = this.appUrl + '/game/getCusPrize'; ??
    this.prizeUrl = this.adminUrl + '/game/getCusPrize';
    this.shopPrepaidAddUrl = this.appUrl + '/tblCustomer/addOrder';
    this.shopPrepaidBuyUrl = this.appUrl + '/order/payBalance';
    this.alipayWapPayUrl = this.appUrl + '/alipay/wapPay?payRecordId=';

  }
  getImgUrl(): string {
    return this.adminUrl;
  }
}
