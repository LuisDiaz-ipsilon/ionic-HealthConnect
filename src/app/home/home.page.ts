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
    //this.pasos = (res.record.count!).toString();
    //this.dataRes = true;
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

  async writeStepsTest() : Promise<void>{
    const res = await this.healthConnectservice.writeSteps();
    console.log(res.recordIds)
    this.recordIdActual = res.recordIds.toString();
  }

  async writeWeight(): Promise<void> {
    const res = await this.healthConnectservice.writeWeight();
    console.log(res.recordIds);
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
    if (res && res.records && res.records.length > 0) {
      let totalSteps = 0;
  
      res.records.forEach(record => {
          totalSteps += record.count!;
      });
      this.pasos = totalSteps.toString(); //La suma de pasos desde la ultima media noche hasta medianoche del dia siguiente
      this.dataRes = true;
    } else {
        console.log("No se encontraron registros de pasos.");
    }
  }

  private editStringId(str: String): string {
    return str.substring(1, str.length - 1);
  }

}
