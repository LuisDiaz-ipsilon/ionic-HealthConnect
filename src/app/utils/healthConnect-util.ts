import { HealthConnect, Record } from 'capacitor-health-connect-local'
import { StoredRecord, RecordType, HealthConnectAvailabilityStatus } from '../interfaces/healthconnect-interfaces';

const recordTypeSteps: RecordType = "Steps";
const readPermissions: RecordType[] = ["Weight", "Steps"];
const writePermissions: RecordType[] = ["Weight", "Steps"];


export const requestPermissions = async (): Promise<{ grantedPermissions: string[]; hasAllPermissions: boolean; }> => {
    //const PERMISSIONS = ["Height", "Weight", "Steps", "BloodGlucose"]
    try {
        return await HealthConnect.requestHealthPermissions({
            read: readPermissions,
            write: writePermissions
        })
    } catch (error) {

        console.log('[HealthConnect util] Error getting Authorization:', error);
        throw error
    }
}

export const getSteps = async (): Promise<{ record: StoredRecord; }> => {
    try {

        const options = {
            type: recordTypeSteps,
            recordId: '1'
        };

        return await HealthConnect.readRecord(options);
    } catch (error) {

        console.log('[HealthConnect util] Error getting data:', error);
        throw error
    }
}

export const writeSteps = async (): Promise<{ recordIds: string[] }> => {
    try {

        const twoHours = 2 * 60 * 60 * 1000; // Convertir dos horas a milisegundos

        const currentTime = new Date();
        const startTime = new Date(currentTime.getTime() - twoHours);
        const endTime = new Date();

        const re1: Record = {
            type: 'Steps',
            startTime: startTime,
            startZoneOffset: '-06:00',
            endTime: endTime,
            endZoneOffset: '-06:00',
            count: 123,
        }

        const records: Record[] = [re1];

        return await HealthConnect.insertRecords({ records: records });

    } catch (error) {
        console.log('[HealthConnect util] Error write data:', error);
        throw error
    }
}

export const checkAvailability = async (): Promise<{ availability: HealthConnectAvailabilityStatus; }> => {
    try {
        return await HealthConnect.checkAvailability();
    } catch (error) {
        console.log('[HealthConnect util] Error check Availability', error);
        throw error
    }
}

export const checkHealthPermissions = async (): Promise<{ grantedPermissions: string[]; hasAllPermissions: boolean; }> => {
    try {
        const options = {
            read: readPermissions,
            write: writePermissions
        }

        return await HealthConnect.checkHealthPermissions(options);

    } catch (error) {
        console.log('[HealthConnect util] Check Permissions error:', error);
        throw error
    }
}

export const openHealthConnectSetting = async (): Promise<void> => {
    try {
        return await HealthConnect.openHealthConnectSetting();
    } catch (error) {
        console.log('[openHealthConnectSetting util] error to open settings:', error);
    }
}
