export let DATASET_TYPE_MAP: any = {
    generic: 'Generic Record',
    observation: 'Observation',
    species_observation: 'Species Observation'
};

export let DEFAULT_GROWL_LIFE: number = 7000;

export let DEFAULT_ANGULAR_DATE_FORMAT: string = 'dd/MM/yyyy';

export let DEFAULT_PRIME_DATE_FORMAT: string = 'dd/mm/yy';

export let DEFAULT_MOMENT_DATE_FORMAT: string = 'DD/MM/YYYY';

export let AMBIGUOUS_DATE_PATTERN: RegExp = /^(\d{1,2})[-,\/](\d{1,2})[-,\/](\d{4})$/;
