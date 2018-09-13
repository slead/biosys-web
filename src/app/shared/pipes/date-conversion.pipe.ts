import { Pipe, PipeTransform } from '@angular/core';
import { pyDateFormatToPrimeDateFormat } from '../utils/functions';

@Pipe({name: 'pyDateFormatToPrimeDateFormat'})
export class PyToPrimeDateFormatConversionPipe implements PipeTransform {
    transform(value: string): string {
        return pyDateFormatToPrimeDateFormat(value);
    }
}
