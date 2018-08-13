import { ANY_PRIME_DATE_FORMAT, ISO_PRIME_DATE_FORMAT } from './consts';

export function pyDateFormatToPrimeDateFormat(pythonDateFormat: string): string {
    let primeDateFormat = pythonDateFormat;

    if (!primeDateFormat || primeDateFormat === 'any') {
        return ANY_PRIME_DATE_FORMAT;
    } else if (primeDateFormat === 'default') {
        return ISO_PRIME_DATE_FORMAT;
    }

    primeDateFormat = primeDateFormat.replace(/fmt:/, '');
    primeDateFormat = primeDateFormat.replace(/%a/, 'D');
    primeDateFormat = primeDateFormat.replace(/%A/, 'DD');
    primeDateFormat = primeDateFormat.replace(/%d/, 'dd');
    primeDateFormat = primeDateFormat.replace(/%b/, 'M');
    primeDateFormat = primeDateFormat.replace(/%B/, 'MM');
    primeDateFormat = primeDateFormat.replace(/%m/, 'mm');
    primeDateFormat = primeDateFormat.replace(/%y/, 'y');
    primeDateFormat = primeDateFormat.replace(/%Y/, 'yy');

    return primeDateFormat;
}

export function isHiddenField(field: any) {
    return field.hasOwnProperty('constraints') && field.constraints.hasOwnProperty('enum') && field.constraints.enum.length === 1;
}

export function getDefaultValue(field: any) {
    // assume default to be first enum value otherwise an empty string
    return isHiddenField(field) ? field.constraints.enum[0] : '';
}
