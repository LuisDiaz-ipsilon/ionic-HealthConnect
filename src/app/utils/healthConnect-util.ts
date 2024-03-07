import { HealthConnect, Mass, Record } from 'capacitor-health-connect-local';
import { StoredRecord, RecordType, HealthConnectAvailabilityStatus, GetRecordsOptions, sample} from '../interfaces/healthconnect-interfaces';

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

export const getSteps = async (recordId: string): Promise<{ record: StoredRecord }> => {
    try {
        const options = {
            type: recordTypeSteps,
            recordId: recordId
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

        const record: Record = {
            type: 'Steps',
            startTime: startTime,
            startZoneOffset: '-06:00',
            endTime: endTime,
            endZoneOffset: '-06:00',
            count: 510,
        }

        const records: Record[] = [record];
        return await HealthConnect.insertRecords({ records: records });
    } catch (error) {
        console.log('[HealthConnect util] Error write data steps:', error);
        throw error
    }
}

export const writeWeight = async (): Promise<{ recordIds: string[] }> => {
    try {
        const currentTime = new Date();

        const mass : Mass = {
            unit: 'kilogram',
            value: 71,
        }

        const record : Record = {
            type: 'Weight',
            time: currentTime,
            zoneOffset: '-06:00',
            weight: mass,
        }

        const records : Record[] = [record];
        return await HealthConnect.insertRecords({ records: records });
    } catch (error) {
        console.log('[HealthConnect util] Error write data weitght:', error);
        throw error
    }
}

export const writeHeartRate = async (): Promise<{ recordIds: string[] }> => {
    try {
        const currentTime = new Date();

        const samplesList : sample[] = [
            {
                time: currentTime,
                beatsPerMinute: 128
            }
        ]

        const record : Record = {
            type: 'HeartRate',
            startTime: currentTime,
            startZoneOffset: '-06:00',
            endTime: currentTime,
            endZoneOffset: '-06:00',
            samples: samplesList,
        }

        const records : Record[] = [record];
        return await HealthConnect.insertRecords({ records: records });
    } catch (error) {
        console.log('[HealthConnect util] Error write data HertRate:', error);
        throw error
    }
}

export const writeSleepSession = async (): Promise<{ recordIds: string[] }> => {
    try {
        const currentTime = new Date();
        const sixHoursAgo = new Date(currentTime.getTime() - 6 * 60 * 60 * 1000);
        const fiveHoursAgo = new Date(currentTime.getTime() - 5 * 60 * 60 * 1000);
        const fourHoursAgo = new Date(currentTime.getTime() - 4 * 60 * 60 * 1000);
        const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);
        const twoHoursAgo = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000);
        const oneHoursAgo = new Date(currentTime.getTime() - 1 * 60 * 60 * 1000);

        const recordSleepREM : Record = {
            type : 'SleepSession',
            startTime: sixHoursAgo,
            startZoneOffset: '-06:00',
            endTime: fiveHoursAgo,
            endZoneOffset: '-06:00',
            stages: [
                {
                    startTime: sixHoursAgo,
                    endTime: fiveHoursAgo,
                    stage: 6 //STAGE_TYPE_REM
                }
            ]
        }
        const reccordSleeping : Record = {
            type : 'SleepSession',
            startTime: fourHoursAgo,
            startZoneOffset: '-06:00',
            endTime: threeHoursAgo,
            endZoneOffset: '-06:00',
            stages: [
                {
                    startTime: fourHoursAgo,
                    endTime: threeHoursAgo,
                    stage: 2 //STAGE_TYPE_SLEEPING
                }
            ]
        }
        const reccordSleepDeep : Record = {
            type : 'SleepSession',
            startTime: twoHoursAgo,
            startZoneOffset: '-06:00',
            endTime: currentTime,
            endZoneOffset: '-06:00',
            stages: [
                {
                    startTime: twoHoursAgo,
                    endTime: currentTime,
                    stage: 5 //STAGE_TYPE_REM
                }
            ]
        }

        const records : Record[] = [recordSleepREM, reccordSleeping, reccordSleepDeep];
        return await HealthConnect.insertRecords({ records: records });
    } catch (error) {
        console.log('[HealthConnect util] Error write data SleepSession:', error);
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

export const readRecords = async (options: GetRecordsOptions): Promise<{records: StoredRecord[], pageToken?: string}> => {
    try {
        // Construir el objeto options para HealthConnect.readRecords
        const readRecordsOptions = {
            type: options.type,
            timeRangeFilter: options.timeRangeFilter
        };
        console.log('Test msg')
        console.log(JSON.stringify(await HealthConnect.readRecords(readRecordsOptions)))
        return await HealthConnect.readRecords(readRecordsOptions);
    } catch (error) {
        console.log('[HealthConnect util] Error getting records steps:', error);
        throw error;
    }
}
