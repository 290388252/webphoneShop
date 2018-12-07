import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  public empty: boolean;
  public overDue: boolean;
  public effective: boolean;
  public used: boolean;
  // public couponGet: boolean;
  public overDueList = [];
  public effectiveList = [];
  public usedList = [];
  public status;
  public openId;
  private token = getToken();

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    // if (this.token === null || this.token === undefined || this.token === 'undefined') {
    //   if (urlParse(window.location.search)['coupon'] === 1 || urlParse(window.location.search)['coupon'] === '1') {
    //     this.token = getToken();
    //   } else {
    //     this.appService.getData(this.appProperties.adminGetShopTokenUrl, null).subscribe(
    //       data => {
    //         if (data.status === 1) {
    //           window.location.href = data.returnObject.url;
    //         } else if (data.status === 2) {
    //           this.token = data.returnObject.token;
    //           this.coupon(2);
    //         }
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    //   }
    // }
    this.coupon(2);
    this.effective = true;
    this.effective ? this.empty = false : this.empty = true;
    if (this.token !== undefined) {
      this.coupon(2);
    }
  }

  choose(flag) {
    if (flag === 3) {
      // 过期
      this.overDue = true;
      this.effective = false;
      this.used = false;
      this.coupon(4);
    } else if (flag === 2) {
      // 已使用
      this.overDue = false;
      this.effective = false;
      this.used = true;
      this.coupon(3);
    } else if (flag === 1) {
      // 未使用
      this.overDue = false;
      this.effective = true;
      this.used = false;
      this.coupon(2);
    }
  }

  coupon(state) {
    this.appService.postAliData(this.appProperties.couponAvailable, {state: state}, this.token).subscribe(
      data => {
        this.status = data.status;
        // if (data.returnObject !== null) {
        //   this.openId = data.returnObject.openId;
        // }
        if (state === 4) {
          if (this.status === 1) {
            this.overDueList = data.returnObject;
          }
        } else if (state === 2) {
          if (this.status === 1) {
            this.effectiveList = data.returnObject;
          }
        } else if (state === 3) {
          if (this.status === 1) {
            this.usedList = data.returnObject;
          }
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  text(item) {
    return item.money === 0 ? '固定减扣券' : '满' + item.money + '元使用';
  }

  textTwo(item) {
    return item.money === 0 ? '可直接使用券' : item.money + '元套餐抵扣券';
  }

  ok() {
  }

  turnToBind(item, useWhere) {
    let isShow;
    if (item === 1) {
      // 特殊商品
      if (useWhere === 1) {
        //  机器商品
        isShow = false;
        return isShow;
      } else {
        isShow = true;
        return isShow;
      }
    } else if (item === 0) {
      // 全品类
      isShow = false;
      return isShow;
    }
  }

  toDate(date) {
    return new Date(date).getFullYear() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getDate();
  }
  goTo() {
    this.router.navigate(['user'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }
}
