import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fadeInAnimation } from '../../../core/_animations';
import { DataPerusahaanModel } from '../../../core/model/_settingDataPerusahaan.model';
import { SettingDataPerusahaanService } from '../../../core/shared/_settingDataperusahaan.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  animations: [fadeInAnimation]
})
export class SettingComponent implements OnInit, AfterViewInit {

  private dataPerusahaanModel: DataPerusahaanModel = new DataPerusahaanModel;
  private base64textString: String = '';

  showmodal = false;

  constructor(private settingDataPerusahaanService: SettingDataPerusahaanService) {

  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
  }

  save() {
    console.log(this.dataPerusahaanModel);
    this.settingDataPerusahaanService.save('api/profil_perusahaan', this.dataPerusahaanModel).subscribe(
      (res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
  }
  changeFile(e) {
    var files = e.target.files;
    if (files.length > 0) {
      this.getBase64(files[0], (data) => {
        // console.log(data.target.result);
        this.base64textString = data.target.result;
        this.dataPerusahaanModel.logo = this.base64textString;
      });
      // console.log(this.base64textString)
    }
  }


  getBase64(file, onLoadCallback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;

  }
}
