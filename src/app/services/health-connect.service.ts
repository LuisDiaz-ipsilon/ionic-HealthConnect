import { Injectable } from '@angular/core';
import { checkAvailability, checkHealthPermissions, getSteps, openHealthConnectSetting, requestPermissions, writeSteps } from '../utils/healthConnect-util';
import { StoredRecord } from '../interfaces/healthconnect-interfaces';

@Injectable({
  providedIn: 'root'
})
export class HealthConnectService {

  constructor() { }


  async requestPermisons(): Promise<void> {
    const res = await requestPermissions();
    console.log("Permisos Android HealthConnect: " + res.grantedPermissions);
  }

  async getSteps(): Promise<{ record: StoredRecord; }> {
    return await getSteps();
  }

  async writeSteps(): Promise<{recordIds: string[]}> {
    return await writeSteps();
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
