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
          this.headImgUrl = data.returnObject.headImgUrl;
          this.integral = data.returnObject.integral;
          this.userBalance = data.returnObject.userBalance;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
// 新用户登陆
  login() {
    this.appService.getData(this.appProperties.wechatOauth2Url, {vmCode: urlParse(window.location.href)['vmCode']}).subscribe(
      data => {
        console.log(data);
        let newData;
        // const wlhUrl = 'http://youshui.natapp1.cc/main';
        // const wlhUrl = window.location.href;
        // const newWlhUrl = window.location.href.replace('main', 'register');
        // const newWlhUrl = wlhUrl.replace(wlhUrl.substring(wlhUrl.indexOf('main'), wlhUrl.length), 'register');
        const wlhUrl = '/main?vmCode=' + urlParse(window.location.href)['vmCode'];
        const newWlhUrl = '/register?vmCode=' + urlParse(window.location.href)['vmCode'];
        const state = urlParse(data.data)['state'];
        if (typeof(data.data) === 'string' && data.data.length > 0) {
          newData = data.data.replace(data.data.substring(data.data.indexOf('state=') + 6, data.data.length),
            newWlhUrl + '-' + wlhUrl + '-' + state);
          console.log(newData);
          window.location.href = newData;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // 支付宝登陆
  noTokenOath() {
    this.appService.getData(this.appProperties.aliGetUserIdUrl + '?vmCode=' + urlParse(window.location.search)['vmCode'], '').subscribe(
      data2 => {
        console.log(data2);
        window.location.href = data2.returnObject;
      },
      error2 => {
        console.log(error2);
      }
    );
  }
  detail(flag) {
    if (flag === 1) {
      window.location.href = 'http://sms.youshuidaojia.com:9800/prepaid?vmCode=' + urlParse(window.location.href)['vmCode'];
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
      // this.router.navigate(['cMain/shopCar']);
    } else if (flag === 7) {
      this.router.navigate(['myDeclaration']);
    } else if (flag === 8) {
      this.router.navigate(['myInviteRewards']);
    }
  }
}
