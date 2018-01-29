import { DEFAULT_ANGULAR_DATE_FORMAT, DEFAULT_PRIME_DATE_FORMAT, DEFAULT_MOMENT_DATE_FORMAT } from './consts';

export function pyDateFormatToAngularDateFormat(pythonDateFormat: string): string {
    let ngDateFormat = pythonDateFormat;

    if (!ngDateFormat || ngDateFormat === 'any') {
        return DEFAULT_ANGULAR_DATE_FORMAT;
    }

    ngDateFormat = ngDateFormat.replace(/fmt:/, '');
    ngDateFormat = ngDateFormat.replace(/%a/, 'EEE');
    ngDateFormat = ngDateFormat.replace(/%A/, 'EEEE');
    ngDateFormat = ngDateFormat.replace(/%d/, 'dd');
    ngDateFormat = ngDateFormat.replace(/%b/, 'MMM');
    ngDateFormat = ngDateFormat.replace(/%B/, 'MMMM');
    ngDateFormat = ngDateFormat.replace(/%m/, 'MM');
    ngDateFormat = ngDateFormat.replace(/%y/, 'yy');
    ngDateFormat = ngDateFormat.replace(/%Y/, 'yyyy');

    return ngDateFormat;
}

export function pyDateFormatToPrimeDateFormat(pythonDateFormat: string): string {
    let primeDateFormat = pythonDateFormat;

    if (!primeDateFormat || primeDateFormat === 'any') {
        return DEFAULT_PRIME_DATE_FORMAT;
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

export function pyDateFormatToMomentDateFormat(pythonDateFormat: string): string {
    let momentDateFormat = pythonDateFormat;

    if (!momentDateFormat || momentDateFormat === 'any') {
        return DEFAULT_MOMENT_DATE_FORMAT;
    }

    momentDateFormat = momentDateFormat.replace(/fmt:/, '');
    momentDateFormat = momentDateFormat.replace(/%a/, 'dd');
    momentDateFormat = momentDateFormat.replace(/%A/, 'dddd');
    momentDateFormat = momentDateFormat.replace(/%d/, 'DD');
    momentDateFormat = momentDateFormat.replace(/%b/, 'MMM');
    momentDateFormat = momentDateFormat.replace(/%B/, 'MMMM');
    momentDateFormat = momentDateFormat.replace(/%m/, 'MM');
    momentDateFormat = momentDateFormat.replace(/%y/, 'YY');
    momentDateFormat = momentDateFormat.replace(/%Y/, 'YYYY');

    return momentDateFormat;
}
