import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {getToken, urlParse} from '../../utils/util';
import {Router} from '@angular/router';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-user-detail',
  templateUrl: './myDeclaration.component.html',
  styleUrls: ['./myDeclaration.component.css']
})
export class MyDeclarationComponent implements OnInit, OnDestroy {
  public token;
  public cursor = 2;
  public declarationList = [];
  public imgUrl;
  public timer;
  public detailList = [];
  public complainIdsList = [];
  public isVisible = false;
  public openMsg = '';

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
    this.imgUrl = this.appProperties.adminUrl + '/complainImg/';
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    console.log('注销故障申报时停止定时刷新！');
  }

  ngOnInit() {
    this.token = getToken();
    this.getData(this.cursor);
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 查看历史故障申报（全部、未回复、已回复）
   */
  getData(state) {
    let val;
    if (state === 2) {
      val = '';
    } else {
      val = state;
    }
    clearInterval(this.timer);
    this.appService.postAliData(this.appProperties.tblCustomerMyDeclaration, {
      state: val
    }, this.token).subscribe(
      data => {
        this.declarationList = data.returnObject;
        this.detailList = [];
        this.complainIdsList = [];
        this.declarationList.forEach(item => {
          this.complainIdsList.push(item.id);
          this.detailList.push(item.listReply);
          console.log('123');
          console.log(this.detailList);
          item.contentText = '';
        });
        this.timer = setInterval(() => {
          this.appService.postFormData(this.appProperties.tblCustomerComplainReplyDetails, {
            complainIds: this.complainIdsList
          }, this.token).subscribe(
            data1 => {
              this.detailList = data1.returnObject;
            },
            error1 => {
              console.log(error1);
            });
        }, 360000);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 转换角色
   */
  turnText(src) {
    return toNumber(src) === 1 ? '优水客服:' : '我:';
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 关闭提醒弹框
   */
  cancel() {
    this.isVisible = false;
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 联系客服
   */
  sure() {
    this.isVisible = false;
    window.location.href = 'tel://4008858203';
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 判断用户是否提问三次
   */
  ask(num) {
    if (this.declarationList[num].contentText !== '') {
      /*判断用户是否提问三次*/
      this.appService.postFormData(this.appProperties.tblCustomerComplainReplyIsReplyUrl, {
        complainId: this.declarationList[num].id
      }, this.token).subscribe(
        data => {
          if (data.status === 1) {
            /*继续提问*/
            this.appService.postAliData(this.appProperties.tblCustomerComplainReplyAddUrl, {
              complainId: this.declarationList[num].id,
              content: this.declarationList[num].contentText,
              /*createName: this.declarationList[num].nickName,*/
            }, this.token).subscribe(
              data2 => {
                if (data2.status === 1) {
                  alert(data2.message);
                  this.getData(this.cursor);
                } else {
                  alert(data2.message);
                }
              },
              error2 => {
                console.log(error2);
              }
            );
          } else {
            this.openMsg = data.message;
            this.isVisible = true;
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      alert('继续提问的话需要文本框输入大于1的字符！');
    }
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 选择故障申报状态
   */
  selectBtn(flag) {
    this.cursor = flag;
    this.getData(this.cursor);
  }
}
