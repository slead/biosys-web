import { FormGroup, ValidatorFn } from '@angular/forms';

export function fieldMatchValidator(fieldName1: string, fieldName2: string): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
        if (formGroup.value[fieldName1] !== formGroup.value[fieldName2]) {
            return {'fieldMatch': true};
        } else {
            return null;
        }
    };
}
