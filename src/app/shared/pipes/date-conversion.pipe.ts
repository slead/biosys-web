import { Pipe, PipeTransform } from '@angular/core';
import { pyDateFormatToAngularDateFormat, pyDateFormatToPrimeDateFormat } from '../utils/functions';

@Pipe({name: 'pyDateFormatToAngularDateFormat'})
export class PyToAngularDateFormatConversionPipe implements PipeTransform {
    transform(value: string): string {
        return pyDateFormatToAngularDateFormat(value);
    }
}

@Pipe({name: 'pyDateFormatToPrimeDateFormat'})
export class PyToPrimeDateFormatConversionPipe implements PipeTransform {
    transform(value: string): string {
        return pyDateFormatToPrimeDateFormat(value);
    }
}
