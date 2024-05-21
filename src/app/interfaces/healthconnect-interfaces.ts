export type HealthConnectAvailabilityStatus = 'Available' | 'NotInstalled' | 'NotSupported' | 'Installed' | 'Unavailable';
export type RecordType = 'Height' | 'Weight' | 'Steps' | 'BloodGlucose' | 'HeartRate' | 'SleepSession' | 'BloodPressure';
type RecordBase = {
    metadata: RecordMetadata;
};
export type StoredRecord = Record & RecordBase;
export type Record = {
    type: 'Steps',
    startTime: Date,
    startZoneOffset?: string,
    endTime: Date,
    endZoneOffset?: string,
    count: number,
    weight?: Mass,
    samples?: sample[];
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'HeartRate';
    startTime: Date;
    startZoneOffset?: string;
    endTime: Date;
    endZoneOffset?: string;
    samples: sample[];
    count?: number,
    weight?: Mass,
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'HeartRateSeries';
    startTime: Date;
    startZoneOffset?: string;
    endTime: Date;
    endZoneOffset?: string;
    samples: sample[];
    count?: number,
    weight?: Mass,
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'SleepSession';
    startTime: Date,
    startZoneOffset?: string,
    endTime: Date,
    endZoneOffset?: string,
    title?: String,
    notes?: String,
    stages: Stage[],
    samples?: sample[];
    count?: number,
    weight?: Mass,
    systolic?: Pressure;
    diastolic?: Pressure;
    
} | {
    type: 'ActiveCalories';
    startTime: Date;
    startZoneOffset?: string;
    endTime: Date;
    endZoneOffset?: string;
    energy: Energy;
    count?: number,
    weight?: Mass,
    samples?: sample[],
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'BasalBodyTemperature';
    time: Date;
    startTime?: Date;
    endTime?: Date;
    zoneOffset?: string;
    temperature: Temperature;
    measurementLocation: 'unknown' | 'armpit' | 'finger' | 'forehead' | 'mouth' | 'rectum' | 'temporal_artery' | 'toe' | 'ear' | 'wrist' | 'vagina';
    count?: number,
    weight?: Mass,
    samples?: sample[];
    stages?: Stage[],
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'BasalMetabolicRate';
    time: Date;
    zoneOffset?: string;
    basalMetabolicRate: Power;
    count?: number,
    weight?: Mass,
    samples?: sample[];
    startTime?: Date;
    endTime?: Date;
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'BloodGlucose';
    time: Date;
    zoneOffset?: string;
    level: BloodGlucose;
    specimenSource: 'unknown' | 'interstitial_fluid' | 'capillary_blood' | 'plasma' | 'serum' | 'tears' | 'whole_blood';
    mealType: 'unknown' | 'breakfast' | 'lunch' | 'dinner' | 'snack';
    relationToMeal: 'unknown' | 'general' | 'fasting' | 'before_meal' | 'after_meal';
    count?: number,
    weight?: Mass,
    samples?: sample[];
    startTime?: Date;
    endTime?: Date,
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'BloodPressure';
    time: Date;
    zoneOffset?: string;
    systolic: Pressure;
    diastolic: Pressure;
    bodyPosition: 'unknown' | 'standing_up' | 'sitting_down' | 'lying_down' | 'reclining';
    measurementLocation: 'unknown' | 'left_wrist' | 'right_wrist' | 'left_upper_arm' | 'right_upper_arm';
    count?: number,
    weight?: Mass,
    samples?: sample[];
    startTime?: Date;
    endTime?: Date,
    stages?: Stage[],
    title?: String,
    notes?: String,
} | {
    type: 'Height',
    time: Date,
    zoneOffset?: string,
    height: Length,
    count?: number,
    weight?: Mass,
    samples?: sample[],
    startTime?: Date,
    endTime?: Date,
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
} | {
    type: 'Weight',
    time: Date,
    zoneOffset?: string,
    weight?: Mass,
    count?: number,
    samples?: sample[],
    startTime?: Date,
    endTime?: Date,
    stages?: Stage[],
    title?: String,
    notes?: String,
    systolic?: Pressure;
    diastolic?: Pressure;
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
export type sample = {
    time: Date;
    beatsPerMinute: number;
};
export type Stage = {
    startTime: Date,
    endTime: Date,
    stage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0
}
export type GetRecordsOptions = {
    type: RecordType;
    timeRangeFilter: TimeRangeFilter;
    dataOriginFilter?: string[];
    ascendingOrder?: boolean;
    pageSize?: number;
    pageToken?: string;
}

export type StepRecord = {
    record: {
      type: string;
      metadata: {
        id: string;
        clientRecordVersion: number;
        lastModifiedTime: string;
        dataOrigin: string;
      };
      startTime: string;
      startZoneOffset: string;
      endTime: string;
      endZoneOffset: string;
      count: number;
    };
  }