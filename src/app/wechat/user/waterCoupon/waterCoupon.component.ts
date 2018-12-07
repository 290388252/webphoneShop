import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './waterCoupon.component.html',
  styleUrls: ['./waterCoupon.component.css']
})
export class WaterCouponComponent implements OnInit {
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
    this.coupon(1);
    this.effective = true;
    this.effective ? this.empty = false : this.empty = true;
    if (this.token !== undefined) {
      this.coupon(1);
    }
  }

  choose(flag) {
    if (flag === 3) {
      // 过期
      this.overDue = true;
      this.effective = false;
      this.used = false;
      this.coupon(3);
    } else if (flag === 2) {
      // 已使用
      this.overDue = false;
      this.effective = false;
      this.used = true;
      this.coupon(2);
    } else if (flag === 1) {
      // 未使用
      this.overDue = false;
      this.effective = true;
      this.used = false;
      this.coupon(1);
    }
  }

  coupon(state) {
    this.appService.postAliData(this.appProperties.shoppingWaterCouponUrl, {state: state}, this.token).subscribe(
      data => {
        this.status = data.status;
        // if (data.returnObject !== null) {
        //   this.openId = data.returnObject.openId;
        // }
        if (state === 3) {
          if (this.status === 1) {
            this.overDueList = data.returnObject;
          }
        } else if (state === 1) {
          if (this.status === 1) {
            this.effectiveList = data.returnObject;
          }
        } else if (state === 2) {
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

  toDate(date) {
    return new Date(date).getFullYear() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getDate();
  }
  openInstructions(id) {
    if (this.effectiveList !== null) {
      for (let i = 0; i <= this.effectiveList.length; i++) {
        if (id === i) {
          this.effectiveList[i]['isShow'] = !this.effectiveList[i]['isShow'];
        }
      }
    }
  }
  goTo() {
    this.router.navigate(['user'], {
      queryParams: {
        vmCode: urlParse(window.location.search)['vmCode'],
      }
    });
  }
}
