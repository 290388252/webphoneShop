import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {getToken, urlParse} from '../../utils/util';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-user-detail',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  public token = getToken();
  public vmCode;
  public mPic: any;
  public messageAdd = '商品图片';
  public uploaderAdd: FileUploader;
  public imgShow;
  public suggestionImg = this.appProperties.suggestionImgUrl;
  public userSuggestion;
  public suggestionType;
  public newImg = true;
  public isSpinning;
  public loading;
  public disable;
  public phone;

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
    this.uploaderAdd = new FileUploader({
      url: appProperties.getImgUrl() + '/tblCustomerComplain/uploadImage',
      // url: 'http://192.168.0.107:6662/ys_admin/tblCustomerComplain/uploadImage',
      method: 'POST',
      itemAlias: 'uploadedfile',
      autoUpload: true,
      removeAfterUpload: true
    });
  }

  ngOnInit() {
    this.suggestionType = '';
    this.userSuggestion = undefined;
    this.newImg = true;
    this.isSpinning = false;
    this.disable = false;
    this.vmCode = urlParse(window.location.search)['vmCode'];
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 投诉图片上传
   */
  uploadAdd(event: any) {
    const self = this;
    this.isSpinning = true;
    this.loading = true;
    this.uploaderAdd.onSuccessItem = function (response, status, headers) {
      this.disable = true;
      document.getElementById('faultImg').style.backgroundImage = 'url(' + '../../../assets/icon/uploadImgAnew.png' + ')';
      if (status !== null || status !== undefined) {
        self.isSpinning = false;
        self.loading = false;
        self.disable = false;
        self.messageAdd = event.target.value;
        self.mPic = status.replace(/"/g, '');
        self.imgShow = true;
      } else {
        alert('上传出错，请重新上传');
        self.disable = false;
        self.isSpinning = false;
      }
    };
    this.uploaderAdd.uploadAll();
  }

  /**
   * 2019-02-16
   * @author maiziyao
   * 选择故障类型
   */
  submitSuggestion() {
    this.disable = true;
    if (this.suggestionType === undefined || this.suggestionType === null || this.suggestionType === '') {
      alert('请选择故障申报类型');
      this.disable = false;
      return;
    }
    if (this.suggestionType === '8') {
      if (this.phone === undefined || this.phone === '' || this.phone === null) {
        alert('请输入手机号');
        this.disable = false;
        return;
      }
      const myreg = /^1[23456789]\d{9}$/;
      if (!myreg.test(this.phone)) {
        alert('请输入正确的手机号');
        this.disable = false;
        return;
      }
    }
    this.appService.postDataOpen(this.appProperties.machineSuggestionUrl, {
      'vmCode': this.vmCode,
      'type': this.suggestionType,
      'picName': this.mPic,
      'phone': this.phone,
      'content': this.userSuggestion
    }, this.token).subscribe(
      data => {
        if (data.status === 1) {
          alert('提交成功');
          this.disable = false;
          // this.router.navigate(['myDeclaration']);
          this.router.navigate(['myDeclaration'], {
            queryParams: {
              vmCode: sessionStorage.getItem('vmCode')
            }
          });
        } else {
          alert(data.message);
          return;
        }
      },
      error2 => {
        console.log(error2);
      });
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 跳转页面
   */
  goTo(val) {
    if (val === '1') {
      this.router.navigate(['main'], {
        queryParams: {
          vmCode: sessionStorage.getItem('vmCode')
        }
      });
    } else if (val === '2') {
      this.router.navigate(['problemList'], {
        queryParams: {
          vmCode: sessionStorage.getItem('vmCode')
        }
      });
    }
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 监听故障类型变化
   */
  typeChange() {
    this.phone = undefined;
  }
}
