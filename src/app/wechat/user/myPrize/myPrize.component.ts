import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app-service';
import {AppProperties} from '../../../app.properties';
import {getToken, urlParse} from '../../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './myPrize.component.html',
  styleUrls: ['./myPrize.component.css']
})
export class MyPrizeComponent implements OnInit {
  public empty: boolean;
  public prizeList;
  public status;
  public imgUrl = this.appProperties.shopImgUrl;
  private token = getToken();

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.token !== undefined) {
      this.getDate();
    }

  }

  /**
   * 2019-03-05
   * @author mzy
   * 获取奖品list
   */
  getDate() {
    this.appService.postAliData(this.appProperties.prizeUrl, '', this.token).subscribe(
      data => {
        if (data.status === 1) {
          this.prizeList = data.returnObject;
          this.empty = false;
        } else {
          this.empty = true;
        }

      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * 2019-03-05
   * @author mzy
   * 获取第一张图片
   */
  turnImg(arr) {
    let img;
    if (arr.indexOf(',') === '-1') {
      img = arr;
    } else {
      const arrImg = arr.split(',');
      img = arrImg[0];
    }
    return img;
  }

  /**
   * 2019-02-16
   * @author mzy
   * 时间格式转换
   */
  toDate(date) {
    return new Date(date).getFullYear() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getDate();
  }

  /**
   * 2019-03-05
   * @author mzy
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
