import { Component } from '@angular/core';
import { HealthConnectService } from '../services/health-connect.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected tiempoDormido :string = "0"
  protected hr :string = "0"
  protected peso :string = "0"
  protected pasos :string = "0"

  protected dataRes : boolean = false;
  protected dataResSteps : boolean = false;
  

  constructor(private healthConnectservice: HealthConnectService) {}

  async cargarDatos(){
    //console.log((await this.healthConnectservice.getSteps()).record);
    console.log(await this.healthConnectservice.getSteps());
    this.dataRes = true;
  }

  async solicitarPermiso(){
    await this.healthConnectservice.requestPermisons();
  }

  async validarPermisos(){
    await this.healthConnectservice.checkAvailability();
  }

  async checkPermissions(){
    console.log(await this.healthConnectservice.checkHealthPermissions());
  }

  async openAppSetting(){
    await this.healthConnectservice.openHealthConnectSetting();
  }

  async writeStepsTest() : Promise<{recordIds: string[]}>{
    const res = await this.healthConnectservice.writeSteps();
    this.dataResSteps = true
    return res
  }

}
