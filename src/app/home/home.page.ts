import { Component } from '@angular/core';
import { HealthConnectService } from '../services/health-connect.service';
import { GetRecordsOptions, Record, StepRecord, StoredRecord } from '../interfaces/healthconnect-interfaces';
import { RecordType } from 'capacitor-health-connect-local';

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
  protected startTime: string = 'sin fecha'
  protected endTime: string = 'sin fecha'
  protected totalSleep: number = 0;
  protected sleep: number = 0;
  protected sleepREM: number = 0;
  protected sleepDeep: number = 0;

  protected dataRes : boolean = false;
  protected dataResSteps : boolean = false;

  private recordIdActual : String = "";

  constructor(private healthConnectservice: HealthConnectService) {}

  async cargarDatos(){
    this.recordIdActual = this.editStringId(this.recordIdActual)  
    const res = await this.healthConnectservice.getSteps(this.recordIdActual.toString());

  }

  async solicitarPermiso(){
    await this.healthConnectservice.requestPermisons();
  }

  async validarPermisos(){
    await this.healthConnectservice.checkAvailability();
  }

  async checkPermissions(){
    console.log('Revision de permisos'+JSON.stringify(await this.healthConnectservice.checkHealthPermissions()));
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

  async writeHeartRate(): Promise<void> {
    const res = await this.healthConnectservice.writeHeartRate();
    console.log(res.recordIds);
  }

  async writeSleepSession(): Promise<void> {
    const res = await this.healthConnectservice.writeSleepSession();
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
    
    const res = await this.healthConnectservice.readRecords(options)
    if (res && res.records && res.records.length > 0) {
      let totalSteps = 0;
  
      res.records.forEach(record => {
          totalSteps += record.count!;
      });

      const ultimoRegistro : StoredRecord = res.records[res.records.length - 1];
      this.startTime = ultimoRegistro.startTime!.toString();
      this.endTime = ultimoRegistro.endTime!.toString();

      this.pasos = totalSteps.toString(); //La suma de pasos desde la ultima media noche hasta medianoche del dia siguiente
      this.dataRes = true;
    } else {
        console.log("No se encontraron registros de pasos.");
    }
  }

  async readRecordsWeight(): Promise<void> {
    const current = new Date();
    const startTime6months = new Date(current);
    startTime6months.setMonth(startTime6months.getMonth() - 6);
    const options : GetRecordsOptions = {
      type: 'Weight',
      timeRangeFilter: {
        type: 'between',
        startTime: startTime6months, //se obtendra todos los datos de pesos desde los ultimos 6 meses
        endTime: current
      }
    }

    const res = await this.healthConnectservice.readRecords(options)
    if (res && res.records && res.records.length > 0) {
      const ultimoRegistro : StoredRecord = res.records[res.records.length - 1];
      
      if (ultimoRegistro.weight!.value && ultimoRegistro.weight!.value !== undefined) {
        const ultimoPeso = ultimoRegistro.weight!.value;

        this.peso = (ultimoPeso/1000).toString();
        this.dataRes = true;
        console.log("Último peso registrado:", ultimoPeso);
      } else {
          console.log("No se encontró información de peso en el último registro.");
      }
    } else {
        console.log("No hay registros de peso.");
    }
  }

  async readRecordsHeartRate(): Promise<void> {
    const current = new Date();
    const startTime6months = new Date(current);
    startTime6months.setMonth(startTime6months.getMonth() - 6);
    const options : GetRecordsOptions = {
      type: 'HeartRateSeries' as RecordType, //Suprime el warning de que HeartRateSeries no es parte de RecordType, pero este se debe a que asi esta declarado en RecordsTypeNameMap.kt por Android.
      timeRangeFilter: {
        type: 'between',
        startTime: startTime6months, //se obtendra todos los datos de pesos desde los ultimos 6 meses
        endTime: current
      }
    }

    const res = await this.healthConnectservice.readRecords(options)

    if (res && res.records && res.records.length > 0) {
      const ultimoRegistro = res.records[res.records.length - 1];
      
      this.hr = ultimoRegistro.samples![0].beatsPerMinute.toString();
      this.dataRes = true;
    } else {
        console.log("No hay registros de HeartRate.");
    }
  }

  async readRecordsSleepSession(): Promise<void> {
    const current = new Date();
    const diaAnterior = new Date();
    diaAnterior.setHours(19, 0, 0, 0);
    diaAnterior.setDate(current.getDate() - 1); //Asi obtenermos el dia anterior a las 7 PM 
    
    const options : GetRecordsOptions = {
      type: 'SleepSession',
      timeRangeFilter: {
        type: 'between',
        startTime: diaAnterior, //se obtendra todos los datos de sleep desde el dia anterior a las 7PM
        endTime: current
      }
    }

    const res = await this.healthConnectservice.readRecords(options)
    console.log(JSON.stringify(res));

    this.sleep=0;
    this.sleepDeep=0;
    this.sleepREM=0;

    res.records.forEach(record => {
      if (record.type === 'SleepSession' && record.stages) {
          record.stages.forEach(stage => {
              const startTime = new Date(stage.startTime);
              const endTime = new Date(stage.endTime);
              const duration = (endTime.getTime() - startTime.getTime()) / 60000; // Convertir milisegundos a minutos

              switch (stage.stage) {
                  case 2:
                      this.sleep += duration;
                      break;
                  case 5:
                      this.sleepDeep += duration;
                      break;
                  case 6:
                      this.sleepREM += duration;
                      break;
              }
          });
      }
    });

    this.totalSleep = this.sleep + this.sleepDeep + this.sleepREM;
    this.dataRes = true;

  }


  private editStringId(str: String): string {
    return str.substring(1, str.length - 1);
  }

}
