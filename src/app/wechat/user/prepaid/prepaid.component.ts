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
  public token = getToken();
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
  public isFocusD;
  public isFocusE;
  public correct;
  public isWechat;

  constructor(private appProperties: AppProperties, private appService: AppService, private router: Router,
              private modalService: NzModalService) {
  }

  ngOnInit() {
    if (this.token === undefined || this.token === null || this.token === '') {
      this.token = urlParse(window.location.href)['token'];
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 365 * 10);
      document.cookie = 'token=' + urlParse(window.location.href)['token'] + ';expires=' + exp.toUTCString();
    }
    console.log(this.token);
    this.token = getToken();
    this.prepaidMoney = undefined;
    this.judgeFriend = false;
    this.judgeButton = '点击帮好友充值';
    this.isFocusA = true;
    this.isFocusB = false;
    this.errorSumit = false;
    this.correct = false;
    this.getDate();
    this.IsWeixinOrAlipay();
  }

  IsWeixinOrAlipay() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
        this.isWechat = true;
      }
    } else if (ua.match(/AlipayClient/i)) {
      if (ua.match(/AlipayClient/i)[0] === 'alipayclient') {
        this.isWechat = false;
      }
    }
  }

  getDate() {
    this.appService.postAliData(this.appProperties.tblCustomerMyInfo, {}, this.token).subscribe(
      data => {
        if (data.code === -1) {
        } else {
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
    if (this.prepaidMoney !== undefined && this.prepaidMoney !== null && this.prepaidMoney !== '') {
      this.errorNum = false;
      this.errorSumit = false;
    } else {
      this.errorNum = true;
      this.errorSumit = true;
    }
  }

  focusMoney(val) {
    if (val === 'isFocusA') {
      this.isFocusA = true;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusB') {
      this.isFocusA = false;
      this.isFocusB = true;
      this.isFocusD = false;
      this.isFocusE = false;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusD') {
      this.isFocusA = false;
      this.isFocusB = false;
      this.isFocusD = true;
      this.isFocusE = false;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusE') {
      this.isFocusA = false;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = true;
      this.errorSumit = false;
      this.errorNum = false;
      this.prepaidMoney = undefined;
    } else if (val === 'isFocusC') {
      this.isFocusA = false;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
      this.errorSumit = true;
    }
  }

  goTo(flag) {
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
      this.prepaidMoney = undefined;
      this.isFocusA = true;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
    } else if (this.judgeFriend === false) {
      this.judgeButton = '点击帮好友充值';
      this.correct = false;
      this.prepaidMoney = undefined;
      this.isFocusA = true;
      this.isFocusB = false;
      this.isFocusD = false;
      this.isFocusE = false;
    }
  }

  prepaidComfirm() {
    let user;
    console.log(this.judgeFriend === false);
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
    if (this.isFocusA === true && this.isFocusB === false && this.isFocusD === false && this.isFocusE === false) {
      this.endMoney = 200;
    } else if (this.isFocusA === false && this.isFocusB === true && this.isFocusD === false && this.isFocusE === false) {
      this.endMoney = 100;
    } else if (this.isFocusA === false && this.isFocusB === false && this.isFocusD === true && this.isFocusE === false) {
      this.endMoney = 50;
    } else if (this.isFocusA === false && this.isFocusB === false && this.isFocusD === false && this.isFocusE === true) {
      this.endMoney = 20;
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
    console.log(this.endPhone);
  }

  prepaidPay() {
    if (this.endMoney !== '' && this.endMoney !== null && this.endMoney !== undefined) {
      this.appService.postAliData(this.appProperties.shopPrepaidAddUrl, {
        price: this.endMoney,
        friendPhone: this.endPhone
      }, this.token).subscribe(
        data2 => {
          alert(data2.message);
          if (data2.status === -99) {
            return;
          }
          if (data2.returnObject.orderState !== 10001) {
            this.orderId = data2.returnObject.id;
            this.appService.getAliData(this.appProperties.shopPrepaidBuyUrl, {
              payCode: data2.returnObject.payCode,
              price: this.endMoney,
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
    } else {
      alert('充值金额不能为空！');
    }
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
            window.location.href = 'http://sms.youshuidaojia.com:9800/user?vmCode=' + urlParse(window.location.search)['vmCode'];
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
