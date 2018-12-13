import { Component , OnInit} from '@angular/core';
import {getNoneActiveCompanyId, urlParse} from './utils/util';
import {Router} from '@angular/router';
import {AppProperties} from './app.properties';
import {AppService} from './app-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public curId: number;
  public newPage = false;
  public oldPage = false;
  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }
  ngOnInit(): void {
    sessionStorage.setItem('vmCode', urlParse(window.location.search)['vmCode']);
    sessionStorage.setItem('url', window.location.search);
    if (urlParse(window.location.search)['flag'] !== undefined) {
      this.curId =  Number.parseInt(urlParse(window.location.search)['flag']);
    }
    this.appService.postData(this.appProperties.machineInfoGetCompanyIdUrl + urlParse(window.location.search)['vmCode'], '').subscribe(
      data2 => {
        console.log(data2);
        if (getNoneActiveCompanyId().includes(data2.returnObject.toString())) {
          this.newPage = false;
          this.oldPage = true;
        } else {
          this.newPage = true;
          this.oldPage = false;
        }
      },
      error2 => {
        console.log(error2);
      });
  }
  // 获取选中状态
  selected(flag) {
    this.curId = flag;
    if (flag === 1) {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/AlipayClient/i)) {
        if (ua.match(/AlipayClient/i)[0] === 'alipayclient') {
          window.location.href = `http://sms.youshuidaojia.com/aliMain?vmCode=${urlParse(window.location.search)['vmCode']}`;
        }
      } else {
        this.router.navigate(['main'], {
          queryParams: {
            vmCode: urlParse(window.location.search)['vmCode'],
          }
        });
      }
    } else if (flag === 2) {
      this.router.navigate(['shopGuide'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
      // window.location.assign('http://localhost:81/shopGuide?vmCode=' + urlParse(window.location.search)['vmCode']);
    } else if (flag === 3) {
      this.router.navigate(['user'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    } else if (flag === 4) {
      this.router.navigate(['problem'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    } else if (flag === 5) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa41aef1ebf72a4b2&redirect_uri=' +
        'http://yms.youshuidaojia.com/admin/getShopToken2&response_type=code&scope=snsapi_userinfo&state=/cMain/firstPage?vm=1-1';
    } else if (flag === 31) {
      this.router.navigate(['orderDetails'], {
        queryParams: {
          vmCode: urlParse(window.location.search)['vmCode'],
        }
      });
    }
  }
}
