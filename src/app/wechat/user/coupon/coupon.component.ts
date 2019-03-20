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
    this.coupon(2);
    this.effective = true;
    this.effective ? this.empty = false : this.empty = true;
    if (this.token !== undefined) {
      this.coupon(2);
    }
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 选择优惠券状态
   */
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
  /**
   * 2019-02-16
   * @author maiziyao
   * 根据优惠券状态获取优惠券list
   */
  coupon(state) {
    this.appService.getAliData(this.appProperties.couponAvailable, {state: state}, this.token).subscribe(
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
  /**
   * 2019-02-16
   * @author maiziyao
   * 转换优惠方式
   */
  text(item) {
    return item.money === 0 ? '固定减扣券' : '满' + item.money + '元使用';
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 转换优惠方式
   */
  textTwo(item) {
    return item.money === 0 ? '可直接使用券' : item.money + '元套餐抵扣券';
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 判断优惠券仅限特殊商品使用还是全品类商品都可以使用
   */
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
  /**
   * 2019-02-16
   * @author maiziyao
   * 时间格式转换
   */
  toDate(date) {
    return new Date(date).getFullYear() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getDate();
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 页面跳转
   */
  goTo() {
    this.router.navigate(['user'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }
}
