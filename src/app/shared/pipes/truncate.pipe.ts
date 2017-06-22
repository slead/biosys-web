import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
    transform(value: string, length: string): string {
        if (value === undefined) {
            return '';
        }

        let lengthNum = Number(length);

        if (value.length > lengthNum) {
            return value.substr(0, lengthNum - 1).trim() + '<a title="' + value + '">&hellip;</a>';
        } else {
            return value;
        }
    }
}
