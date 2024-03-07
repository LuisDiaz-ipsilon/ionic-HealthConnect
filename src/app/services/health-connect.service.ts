import { Injectable } from '@angular/core';
import { checkAvailability, checkHealthPermissions, getSteps, openHealthConnectSetting, requestPermissions, writeSteps, writeWeight, readRecords, writeHeartRate, writeSleepSession } from '../utils/healthConnect-util';
import { StoredRecord, GetRecordsOptions, Record } from '../interfaces/healthconnect-interfaces';

@Injectable({
  providedIn: 'root'
})
export class HealthConnectService {

  constructor() { }


  async requestPermisons(): Promise<void> {
    const res = await requestPermissions();
    console.log("Permisos Android HealthConnect: " + res.grantedPermissions);
  }

  async getSteps(recordId: string): Promise<{ record: StoredRecord }> {
    return await getSteps(recordId);
  }

  async writeSteps(): Promise<{recordIds: string[]}> {
    return await writeSteps();
  }

  async writeWeight(): Promise<{recordIds: string[]}> {
    return await writeWeight();
  }

  async writeHeartRate(): Promise<{recordIds: string[]}> {
    return await writeHeartRate();
  }

  async writeSleepSession(): Promise<{recordIds: string[]}> {
    return await writeSleepSession();
  }

  async readRecords(options : GetRecordsOptions): Promise<{records: StoredRecord[], pageToken?: string}> {
    return await readRecords(options);
  }

  async checkAvailability(): Promise<void> {
    try {
      const res = await checkAvailability(); 
      console.log("Available check: " + res.availability);
    } catch (error) {
      console.log('[HealthConnect util] Error check Availability', error);
      throw error;
    }
  }

  async checkHealthPermissions(): Promise<{ grantedPermissions: string[]; hasAllPermissions: boolean; }> {
    return await checkHealthPermissions();
  }

  async openHealthConnectSetting(): Promise<void>{
    return await openHealthConnectSetting();
  }
}
