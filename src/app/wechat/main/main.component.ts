import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {NzModalService} from 'ng-zorro-antd';
import {getActiveCompanyId, getActiveItemId, getCoupon, getNewUser, urlParse} from '../../utils/util';
import {CarouselConfig} from 'ngx-bootstrap/carousel';

declare var wx: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 1500, noPause: true, showIndicators: true}}
  ]
})
export class MainComponent implements OnInit {
  public indexList = [];
  public eightIndexList = [];
  public fiveIndexList = [];
  public eightDoorFlag = 0;
  private token: string;
  private wayNumber: number;
  public isVisibleOpen = false;
  public isVisibleOpenDoor = false;
  public isVisibleCoupon = false;
  public isVisibleCouponTwo = false;
  public isVisibleCouponThree = false;
  public isVisibleCouponFour = false;
  public couponButtonHidden = true;
  public clickMore = false;
  public userSuggestion: string;
  public showSuggestion;
  // public img = 'http://lenvar-resource-products.oss-cn-shenzhen.aliyuncs.com/';
  // public img = 'http://119.23.233.123:6662/ys_admin/files/';
  public img = this.appProperties.imgUrl;
  public item;
  currentModal;
  url;
  public isFourDoor = false;
  public isFiveDoor = false;
  public isEightDoor = false; // 八门
  public youshuiCompany = true;
  public otherCompany = true;
  public baoliCompany = false;
  public vmCode;
  public openDoorMsg = '点击‘是’开门，祝您购物愉快！';
  public isConfirmLoading = false;

  constructor(private router: Router,
              private modalService: NzModalService,
              private activatedRoute: ActivatedRoute,
              private appProperties: AppProperties,
              private appService: AppService) {
  }

  ngOnInit() {
    this.getInitData();
    if (urlParse(window.location.search)['token'] === undefined) {
      this.getCookies();
    } else {
      this.token = urlParse(window.location.search)['token'];
      const exp = new Date();
      exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24 * 365 * 10);
      document.cookie = 'token=' + this.token + ';expires=' + exp.toUTCString();
      // window.localStorage.setItem('token', urlParse(window.location.search)['token']);
    }
    if (getCoupon() === '0') {
      this.isVisibleCoupon = true;
    } else if (getCoupon() === '2') {
      this.isVisibleCouponTwo = true;
    }
    // // 新用户进入界面
    if (getNewUser() === '1') {
      document.cookie = 'newUser=' + 0;
      this.appService.getDataOpen(this.appProperties.nonePassWordPayUrl,
        {vmCode: urlParse(window.location.href)['vmCode']}).subscribe(
        data1 => {
          window.location.href = data1;
        },
        error1 => {
          console.log(error1);
        }
      );
    }
    this.vmCode = urlParse(window.location.search)['vmCode'];
  }

  /**
   * 2019-02-15
   * @author maiziyao
   *  数据初始化
   */
  getInitData() {
    this.appService.postData(this.appProperties.machineInfoGetCompanyIdUrl + urlParse(window.location.search)['vmCode'], '').subscribe(
      data2 => {
        if (getActiveCompanyId().includes(data2.returnObject.toString())) {
          this.youshuiCompany = false;
          this.otherCompany = true;
          this.baoliCompany = false;
        } else if (data2.returnObject === 104) {
          this.youshuiCompany = true;
          this.otherCompany = false;
          this.baoliCompany = true;
        } else {
          this.youshuiCompany = true;
          this.otherCompany = false;
          this.baoliCompany = false;
        }
      },
      error2 => {
        console.log(error2);
      });
    this.appService.getData(this.appProperties.indexListUrl, {vmCode: urlParse(window.location.search)['vmCode'], type: 1}).subscribe(
      data => {
        if (data.code === 0) {
          if (data.data.length <= 4) {
            this.isFourDoor = true;
            this.isFiveDoor = false;
            this.isEightDoor = false;
            this.indexList = data.data;
            for (let i = 0; i < 2; i++) {
              this.indexList.unshift(this.indexList.pop());
            }
          } else if (data.data.length === 5) {
            this.isFourDoor = false;
            this.isFiveDoor = true;
            this.isEightDoor = false;
            data.data.forEach((item, index) => {
              if (index > 1) {
                this.indexList.push(item);
              } else {
                this.fiveIndexList.push(item);
              }
            });
          } else if (data.data.length === 8) {
            this.isFourDoor = false;
            this.isFiveDoor = false;
            this.isEightDoor = true;
            this.indexList = data.data;
            this.eightIndexList = data.data.slice(0, 4);
          }
          console.log(this.indexList);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   *  数据初始化
   */
  showActiveItem(item, baoliCompany) {
    let flag;
    const list = getActiveItemId();
    if (baoliCompany) {
      flag = true;
    } else {
      if (item.length > 1) {
        if (list.includes(item[0].basicItemId) || list.includes(item[1].basicItemId)) {
          flag = false;
        } else {
          flag = true;
        }
      } else {
        if (list.includes(item[0].basicItemId)) {
          flag = false;
        } else {
          flag = true;
        }
      }
    }
    return flag;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 开门
   */
  openDoor(item) {
    this.item = item;
    if (item.num <= 0) {
      alert('水已经卖完无法开门');
    } else {
      this.isVisibleOpenDoor = true;
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 八门机器
   */
  eigthDoorChoose(flag) {
    this.eightDoorFlag = flag;
    if (flag === 0) {
      this.eightIndexList = this.indexList.slice(0, 4);
    } else if (flag === 1) {
      this.eightIndexList = this.indexList.slice(4, 8);
    }
  }

  // follow() {
  //   window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0NzQ4MTY0Mg==&scene=124#wechat_redirect';
  // }
  /**
   * 2019-02-15
   * @author maiziyao
   * 关闭领取优惠弹框
   */
  closeCoupon() {
    this.isVisibleCoupon = false;
    this.isVisibleCouponTwo = false;
    this.isVisibleCouponThree = false;
    document.cookie = 'coupon=' + 1;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 运维登陆
   */
  vmLogin(flag) {
    if (flag === 1) {
      // 微信授权登陆验证
      this.appService.getData(this.appProperties.adminOauth2Url, '').subscribe(
        data => {
          let newData;
          const newWlhUrl = '/vmLogin?vmCode=' + urlParse(window.location.search)['vmCode'] + '-/addMain?vmCode='
            + urlParse(window.location.search)['vmCode'];
          if (typeof(data.data) === 'string' && data.data.length > 0) {
            newData = data.data.replace(data.data.substring(data.data.indexOf('state=') + 6, data.data.length),
              newWlhUrl);
            window.location.href = newData;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else if (flag === 2) {
      document.getElementsByClassName('ant-modal-body')[4]['style'].cssText = 'padding: 0;';
      this.isVisibleCouponThree = true;
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 是否已关门
   */
  isClosed(vmCode) {
    this.appService.getDataOpen(this.appProperties.isClosedUrl, {vmCode: vmCode}, this.token).subscribe(
      data2 => {
        if (data2.data === false) {
          // alert('您的门还未关闭！优水到家提醒您,为了您账号资金安全,提水后请随手关门');
          this.isVisibleOpen = true;
        } else if (data2.data === true) {
          this.isVisibleOpen = false;
          // this.router.navigate(['detail']);
          alert('广州优水到家工程感谢你的惠顾,系统将从零钱或者银行卡中自动扣取本次购买费用。');
        }
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 新用户登陆
   */
  login() {
    this.appService.getData(this.appProperties.wechatOauth2Url, {vmCode: urlParse(window.location.href)['vmCode']}).subscribe(
      data => {
        let newData;
        const wlhUrl = '/main?vmCode=' + urlParse(window.location.href)['vmCode'];
        const newWlhUrl = '/register?vmCode=' + urlParse(window.location.href)['vmCode'];
        const state = urlParse(data.data)['state'];
        if (typeof(data.data) === 'string' && data.data.length > 0) {
          newData = data.data.replace(data.data.substring(data.data.indexOf('state=') + 6, data.data.length),
            newWlhUrl + '-' + wlhUrl + '-' + state);
          window.location.href = newData;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 确定开门
   */
  yesOpenDoor() {
    this.isConfirmLoading = true;
    this.openDoorMsg = '正在开门请稍等！';
    setTimeout(() => {
      this.isVisibleOpenDoor = false;
      this.isConfirmLoading = false;
      if (this.clickMore) {
        alert('亲,服务器还没反应过来,请勿再点击');
      } else {
        this.clickMore = true;
        if (this.token === null || this.token === undefined || this.token === 'undefined') {
          this.clickMore = false;
          sessionStorage.setItem('wayNumber', this.item.wayNumber);
          // alert('请点击确认，注册登陆');
          this.login();
        } else {
          this.appService.getDataOpen(this.appProperties.indexOpenDoor,
            {vmCode: urlParse(window.location.search)['vmCode'], way: this.item.wayNumber}, this.token).subscribe(
            data => {
              this.clickMore = false;
              if (data.code === 0) {
                const u = navigator.userAgent;
                const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
                if (isiOS) {
                  sessionStorage.setItem('flag', '1');
                  window.location.href = 'http://sms.youshuidaojia.com/goodsShow?vmCode=' + urlParse(window.location.search)['vmCode'];
                } else {
                  sessionStorage.setItem('flag', '1');
                  this.router.navigate(['goodsShow'], {
                    queryParams: {
                      vmCode: urlParse(window.location.search)['vmCode'],
                      // flag: 1,
                    }
                  });
                }
              } else if (data.code === 4) {
                const u = navigator.userAgent;
                const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
                if (isiOS) {
                  sessionStorage.setItem('flag', '2');
                  window.location.href = 'http://sms.youshuidaojia.com/goodsShow?vmCode=' + urlParse(window.location.search)['vmCode'];
                } else {
                  sessionStorage.setItem('flag', '2');
                  this.router.navigate(['goodsShow'], {
                    queryParams: {
                      vmCode: urlParse(window.location.search)['vmCode'],
                      // flag: 2,
                    }
                  });
                }
              } else if (data.code === 3) {
                alert('网络延时，请重试！');
              } else if (data.code === -1) {
                this.login();
              } else if (data.code === -87) {
                window.location.href = this.appProperties.followWechatSubscription;
              } else if (data.code === -88) {
                alert('您有未支付订单请点击我的订单支付完毕再进行购水！');
                this.router.navigate(['detail'], {
                  queryParams: {
                    vmCode: urlParse(window.location.search)['vmCode'],
                    flag: 1
                  }
                });
              } else if (data.code === -89) {
                alert('他人在买水，请稍后扫码,文明购买，请勿争抢');
              } else if (data.code === -90) {
                this.appService.getDataOpen(this.appProperties.nonePassWordPayUrl,
                  {vmCode: urlParse(window.location.href)['vmCode']}).subscribe(
                  data1 => {
                    window.location.href = data1;
                    // sessionStorage.setItem('open', '1');
                    sessionStorage.setItem('wayNumber', this.item.wayNumber);
                  },
                  error1 => {
                    console.log(error1);
                  }
                );
              } else {
                alert(data.msg);
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    }, 1000);
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 确定关门
   */
  noOpenDoor() {
    this.isVisibleOpenDoor = false;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 扫一扫
   */
  scan(e) {
    e.preventDefault();
    const u = navigator.userAgent, app = navigator.appVersion;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
      window.location.href = 'http://sms.youshuidaojia.com:9800/scan';
      this.url = sessionStorage.getItem('url');
    } else {
      this.url = window.location.href;
      this.appService.postScanFormData(this.appProperties.wechatShareInfoUrl,
        {url: this.url}).subscribe(
        data => {
          wx.config({
            debug: false,
            appId: data.data.appId,
            timestamp: data.data.timestamp,
            nonceStr: data.data.nonceStr,
            signature: data.data.signature,
            jsApiList: ['checkJsApi',
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'scanQRCode'
            ]
          });
          wx.ready(function () {
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
                window.location.href = res.resultStr;
              }
            });
          });
          wx.error(function (res) {
            console.log(res);
          });
        },
        error2 => {
          console.log(error2);
        }
      );
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 获取token
   */
  getCookies() {
    if (this.token === null || this.token === undefined || this.token === 'undefined') {
      const strCookie = document.cookie;
      const arrCookie = strCookie.split(';');
      for (let i = 0; i < arrCookie.length; i++) {
        const arr = arrCookie[i].split('=');
        if (arr[0].trim() === 'token') {
          this.token = arr[1];
        }
      }
    }
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 转换图片格式
   */
  turnImg(item) {
    let img;
    if (item.length > 1) {
      img = this.img + item[1].pic;
    } else {
      img = '';
    }
    return img;
  }

  /**
   * 2019-02-15
   * @author maiziyao
   * 转换名字
   */
  turn(item, name) {
    let variable;
    if (item.length > 1) {
      variable = item[1][name];
    } else {
      variable = '';
    }
    return variable;
  }
}
