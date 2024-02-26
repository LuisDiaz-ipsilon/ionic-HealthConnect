export type HealthConnectAvailabilityStatus = 'Available' | 'NotInstalled' | 'NotSupported' | 'Installed' | 'Unavailable';
export type RecordType = 'Height' | 'Weight' | 'Steps' | 'BloodGlucose';
type RecordBase = {
    metadata: RecordMetadata;
};
export type StoredRecord = RecordBase & Record;
export type Record = {
    type: 'ActiveCalories';
    startTime: Date;
    startZoneOffset?: string;
    endTime: Date;
    endZoneOffset?: string;
    energy: Energy;
} | {
    type: 'BasalBodyTemperature';
    time: Date;
    zoneOffset?: string;
    temperature: Temperature;
    measurementLocation: 'unknown' | 'armpit' | 'finger' | 'forehead' | 'mouth' | 'rectum' | 'temporal_artery' | 'toe' | 'ear' | 'wrist' | 'vagina';
} | {
    type: 'BasalMetabolicRate';
    time: Date;
    zoneOffset?: string;
    basalMetabolicRate: Power;
} | {
    type: 'BloodGlucose';
    time: Date;
    zoneOffset?: string;
    level: BloodGlucose;
    specimenSource: 'unknown' | 'interstitial_fluid' | 'capillary_blood' | 'plasma' | 'serum' | 'tears' | 'whole_blood';
    mealType: 'unknown' | 'breakfast' | 'lunch' | 'dinner' | 'snack';
    relationToMeal: 'unknown' | 'general' | 'fasting' | 'before_meal' | 'after_meal';
} | {
    type: 'BloodPressure';
    time: Date;
    zoneOffset?: string;
    systolic: Pressure;
    diastolic: Pressure;
    bodyPosition: 'unknown' | 'standing_up' | 'sitting_down' | 'lying_down' | 'reclining';
    measurementLocation: 'unknown' | 'left_wrist' | 'right_wrist' | 'left_upper_arm' | 'right_upper_arm';
} | {
    type: 'Height';
    time: Date;
    zoneOffset?: string;
    height: Length;
} | {
    type: 'Weight';
    time: Date;
    zoneOffset?: string;
    weight: Mass;
} | {
    type: 'Steps';
    startTime: Date;
    startZoneOffset?: string;
    endTime: Date;
    endZoneOffset?: string;
    count: number;
};
export type RecordMetadata = {
    id: string;
    clientRecordId?: string;
    clientRecordVersion: number;
    lastModifiedTime: Date;
    dataOrigin: string;
};
export type Change = {
    type: 'Upsert';
    record: Record;
} | {
    type: 'Delete';
    recordId: string;
};
export type TimeRangeFilter = {
    type: 'before' | 'after';
    time: Date;
} | {
    type: 'between';
    startTime: Date;
    endTime: Date;
};
export type Energy = {
    unit: 'calories' | 'kilocalories' | 'joules' | 'kilojoules';
    value: number;
};
export type Temperature = {
    unit: 'celsius' | 'fahrenheit';
    value: number;
};
export type Power = {
    unit: 'kilocaloriesPerDay' | 'watts';
    value: number;
};
export type Pressure = {
    unit: 'millimetersOfMercury';
    value: number;
};
export type Length = {
    unit: 'meter' | 'kilometer' | 'mile' | 'inch' | 'feet';
    value: number;
};
export type Mass = {
    unit: 'gram' | 'kilogram' | 'milligram' | 'microgram' | 'ounce' | 'pound';
    value: number;
};
export type BloodGlucose = {
    unit: 'milligramsPerDeciliter' | 'millimolesPerLiter';
    value: number;
};