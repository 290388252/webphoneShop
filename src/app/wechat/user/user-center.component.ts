import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {getToken, urlParse} from '../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit {
  public token;
  public userMoney;
  public nickName;
  public headImgUrl;
  public integral;
  public userBalance;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = getToken();
    this.getDate();
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 判断wechat登陆还是支付宝，获取个人信息
   */
  getDate() {
    this.appService.postAliData(this.appProperties.tblCustomerMyInfo, {}, this.token).subscribe(
      data => {
        if (data.code === -1) {
          const ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/AlipayClient/i)) {
            if (ua.match(/AlipayClient/i)[0] === 'alipayclient') {
              this.noTokenOath();
            }
          } else {
            this.login();
          }
        } else {
          this.nickName = data.returnObject.nickname;
          this.headImgUrl = data.returnObject.headimgurl;
          console.log(this.headImgUrl);
          this.integral = data.returnObject.integral;
          this.userBalance = data.returnObject.userBalance;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-16
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
   * 2019-02-16
   * @author maiziyao
   * 支付宝登陆
   */
  noTokenOath() {
    this.appService.getData(this.appProperties.aliGetUserIdUrl + '?vmCode=' + urlParse(window.location.search)['vmCode'], '').subscribe(
      data2 => {
        window.location.href = data2.returnObject;
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 跳转页面（查看更多订单、余额、我的订单、我的存水、我的优惠券、我的提货券、我的购物车、我的地址、附近售货机、我的故障申报、砍价免费拿）
   */
  detail(flag) {
    if (flag === 1) {
      this.appService.postAliData(this.appProperties.tblCustomerMyInfo, {}, this.token).subscribe(
        data => {
          if (data.status === -66) {
            alert(data.message);
            return;
          } else {
            this.router.navigate(['prepaid'], {
              queryParams: {
                vmCode: urlParse(window.location.search)['vmCode']
              }
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    } else if (flag === 2) {
      this.router.navigate(['orderDetails'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    } else if (flag === 3) {
      this.router.navigate(['cMain/mySaveWater']);
    } else if (flag === 4) {
      this.router.navigate(['coupon'], {
        queryParams: {
          coupon: 1,
          vmCode: urlParse(window.location.search)['vmCode']
        }
      });
    } else if (flag === 5) {
      this.router.navigate(['waterCoupon'], {
        queryParams: {
          coupon: 1,
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    } else if (flag === 6) {
      window.location.href = 'tel://4008858203';
    } else if (flag === 7) {
      this.router.navigate(['myDeclaration']);
    } else if (flag === 8) {
      window.location.href = 'http://sms.youshuidaojia.com/shareGzh?token=' + this.token;
    } else if (flag === 9) {
      this.router.navigate(['myPrize'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    }
  }
}
