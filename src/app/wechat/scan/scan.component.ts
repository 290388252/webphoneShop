import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app-service';
import {AppProperties} from '../../app.properties';
import {getToken, urlParse} from '../../utils/util';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
declare var wx: any;
@Component({
  selector: 'app-user-detail',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  constructor(private appProperties: AppProperties,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit() {
    this.scan();
  }
  /**
   * 2019-02-16
   * @author maiziyao
   * 扫一扫
   */
  scan() {
    this.appService.postScanFormData(this.appProperties.wechatShareInfoUrl,
      {url: window.location.href}).subscribe(
      data => {
        wx.config({
          debug: false,
          appId: data.data.appId,
          timestamp: data.data.timestamp,
          nonceStr: data.data.nonceStr,
          signature: data.data.signature,
          jsApiList: ['checkJsApi',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'scanQRCode'
          ]
        });
        wx.ready(function () {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              console.log(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
              window.location.href = res.resultStr;
            }
          });
        });
        wx.error(function (res) {
          console.log(res);
        });
      },
      error2 => {
        console.log(error2);
      }
    );
  }
}
