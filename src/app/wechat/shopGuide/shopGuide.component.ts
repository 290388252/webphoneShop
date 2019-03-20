import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {getToken, urlParse} from '../../utils/util';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './shopGuide.component.html',
  styleUrls: ['./shopGuide.component.css']
})
export class ShopGuideComponent implements OnInit {
  public token;
  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 跳转到首页
   */
  goTo() {
    this.router.navigate(['main'], {
      queryParams: {
        vmCode: sessionStorage.getItem('vmCode')
      }
    });
  }
}
