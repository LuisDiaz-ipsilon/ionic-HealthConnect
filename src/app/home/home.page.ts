import { Component } from '@angular/core';
import { HealthConnectService } from '../services/health-connect.service';
import { GetRecordsOptions, Record, StepRecord, StoredRecord } from '../interfaces/healthconnect-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected tiempoDormido :string = "0"
  protected hr :string = "0"
  protected peso :string = "0"
  protected pasos :string = '0'

  protected dataRes : boolean = false;
  protected dataResSteps : boolean = false;

  private recordIdActual : String = "";

  constructor(private healthConnectservice: HealthConnectService) {}

  async cargarDatos(){
    this.recordIdActual = this.editStringId(this.recordIdActual)  
    const res = await this.healthConnectservice.getSteps(this.recordIdActual.toString());
    this.pasos = (res.record.count!).toString();
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
    console.log(res.recordIds)
    this.recordIdActual = res.recordIds.toString();
    return res
  }

  async readRecordsSteps() : Promise<void>{

    const today = new Date(); // Obtener la fecha actual
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Medianoche del día actual
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Medianoche del día siguiente
    const options : GetRecordsOptions = {
      type: 'Steps',
      timeRangeFilter: {
        type: 'between',
        startTime: startOfDay,
        endTime: endOfDay
      }
    }
    
    const res = await this.healthConnectservice.readRecordsSteps(options)
    console.log(res.records[0])
  }

  private editStringId(str: String): string {
    return str.substring(1, str.length - 1);
  }

}
