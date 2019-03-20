import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {getToken, urlParse} from '../../utils/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './myInviteRewards.component.html',
  styleUrls: ['./myInviteRewards.component.css']
})
export class MyInviteRewardsComponent implements OnInit {
  public token;
  public inviteRewardsList = [];

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
   * 获取邀请记录以及奖励
   */
  getDate() {
    this.appService.postAliData(this.appProperties.tblCustomerMyInviteRewards, {}, this.token).subscribe(
      data => {
        console.log(data);
        this.inviteRewardsList = data.returnObject;
      },
      error => {
        console.log(error);
      }
    );
  }
}
