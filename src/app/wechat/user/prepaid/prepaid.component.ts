import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';


declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './prepaid.component.html',
  styleUrls: ['./prepaid.component.css']
})
export class PrepaidComponent implements OnInit {
  public imgUrl = this.appProperties.shopImgUrl;
  public token;
  public userBalance;
  public userIntegral;
  public prepaidMoney;
  public orderId;
  public errorNum;
  public errorSumit;
  public endMoney;
  public endPhone;
  public prepaidPhone;
  public judgeFriend;
  public judgeButton;
  //
  public isFocusA;
  public isFocusB;
  public correct;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    // this.userBalance = urlParse(window.location.href)['userBalance'];
    this.token = getToken();
    this.getDate();
    this.prepaidMoney = undefined;
    this.judgeFriend = false;
    this.judgeButton = '点击帮好友充值';
    this.isFocusA = true;
    this.isFocusB = false;
    this.errorSumit = false;
    this.correct = false;
  }

  getDate() {
    this.appService.postAliData(this.appProperties.shopUserMoneyUrl, {}, this.token).subscribe(
      data => {
        console.log(data);
        if (data.status === 1) {
          this.userBalance = data.returnObject.userBalance;
          this.userIntegral = data.returnObject.integral;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // numChange(val) {
  //   if (Number(this.prepaidMoney) > 0) {
  //     this.errorSumit = false;
  //     this.errorNum = false;
  //   } else if (this.prepaidMoney === undefined || this.prepaidMoney === '' || this.prepaidMoney === null) {
  //     this.errorSumit = true;
  //     this.errorNum = false;
  //   } else {
  //     this.errorSumit = true;
  //     this.errorNum = true;
  //   }
  // }
  keyupMoney() {
    console.log(this.prepaidMoney);
    if (this.prepaidMoney !== undefined && this.prepaidMoney !== null) {

      this.errorSumit = false;
    }
  }

  focusMoney(val) {
    // console.log(this.prepaidMoney);
    // if (event !== null) {
    //   if (event !== undefined) {
    //     this.errorSumit = false;
    //   }
    // }
    if (val === 'isFocusA') {
      this.isFocusA = true;
      this.isFocusB = false;
      this.errorSumit = false;
    } else if (val === 'isFocusB') {
      this.isFocusA = false;
      this.isFocusB = true;
      this.errorSumit = false;
    } else if (val === 'isFocusC') {
      this.isFocusA = false;
      this.isFocusB = false;
      this.errorSumit = true;
    }
  }

  goTo(flag) {
    console.log(flag === 'prepaidPay');
    if (flag === 'userCenter') {
      this.router.navigate(['user'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    } else if (flag === 'protocol') {
      this.router.navigate(['protocol'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    }
  }

  prepaidFriend() {
    this.judgeFriend = !this.judgeFriend;
    if (this.judgeFriend === true) {
      this.judgeButton = '点击本账号充值';
      this.prepaidPhone = undefined;
    } else if (this.judgeFriend === false) {
      this.judgeButton = '点击帮好友充值';
      this.correct = false;

    }
  }

  prepaidComfirm() {
    let user;
    if (this.judgeFriend === false) {
      this.endPhone = null;
      user = '本账号';
    } else {
      this.endPhone = this.prepaidPhone;
      const myreg = /^1[23456789]\d{9}$/;
      if (!myreg.test(this.endPhone)) {
        this.correct = true;
        return;
      } else {
        this.correct = false;
      }
      user = '好友';
    }
    if (this.isFocusA === true && this.isFocusB === false) {
      this.endMoney = 200;
    } else if (this.isFocusA === false && this.isFocusB === true) {
      this.endMoney = 100;
    } else {
      this.endMoney = this.prepaidMoney;
      if (Number(this.prepaidMoney) < 0) {
        this.errorNum = true;
        return;
      } else {
        this.errorNum = false;
      }
    }
    this.modalService.info({
      content: '<b>您确定为' + user + '充值吗?</b>',
      cancelText: '忍痛放弃',
      okText: '确定支付',
      onOk: () => this.prepaidPay()
    });
  }

  prepaidPay() {
    console.log(this.endMoney);
    console.log(this.endPhone);
    this.appService.postAliData(this.appProperties.shopPrepaidAddUrl, {
      price: this.endMoney,
      friendPhone: this.endPhone
    }, this.token).subscribe(
      data2 => {
        console.log(data2);
        alert(data2.message);
        if (data2.status === -99) {
          return;
        }
        if (data2.returnObject.orderState !== 10001) {
          this.orderId = data2.returnObject.id;
          this.appService.getAliData(this.appProperties.shopPrepaidBuyUrl, {
            payCode: data2.returnObject.payCode,
            price: this.prepaidMoney,
            url: 'http://sms.youshuidaojia.com:9800/prepaid'
          }, this.token).subscribe(
            data4 => {
              if (data4.status === 2) {
                window.location.href = data4.returnObject;
              } else {
                if (typeof(WeixinJSBridge) === 'undefined') {
                  this.onBridgeUndefindeReady(data4);
                } else {
                  this.onBridgeReady(data4);
                }
              }
            },
            error => {
              console.log(error);
            }
          );
        } else {
          alert('支付完成！');
          this.router.navigate(['user'], {
            queryParams: {
              vmCode: urlParse(window.location.search)['vmCode'],
            }
          });
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  onBridgeUndefindeReady(data) {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', () => {
        this.test(data);
      }, false);
    } else if (document['attachEvent']) {
      document['attachEvent']('WeixinJSBridgeReady', () => {
        this.test(data);
      });
      document['attachEvent']('onWeixinJSBridgeReady', () => {
        this.test(data);
      });
    }
  }

  // 调用微信支付接口
  onBridgeReady(data) {
    this.test(data);
  }

  // 调用微信支付接口测试
  test(data) {
    wx.config({
      debug: false,
      appId: data.config.appId,
      timestamp: data.config.timestamp,
      nonceStr: data.config.nonceStr,
      signature: data.config.signature,
      jsApiList: ['checkJsApi',
        'chooseWXPay',
      ]
    });
    wx.ready(() => {
      wx.chooseWXPay({
        debug: false,
        timestamp: data.payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.payInfo.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.payInfo.package,
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.payInfo.sign, // 支付签名
        success: (res) => {
          if (res.errMsg === 'chooseWXPay:ok') {
            window.location.href = 'http://http://sms.youshuidaojia.com:9800/user';
            // this.router.navigate(['cMain/shopCar']);
            console.log('支付成功');
          } else {
            alert('支付失败');
          }
        },
        cancel: (res) => {
          this.modalService.info({
            content: '<b>您取消了支付</b>',
            cancelText: '忍痛放弃',
            okText: '继续支付',
            onOk: () => this.prepaidPay()
          });
          // 支付取消
        },
        error: (res) => {
          alert('出错了，请联系优水到家管理员');
        }
      });
    });
  }
}
