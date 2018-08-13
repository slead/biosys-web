import { Pipe, PipeTransform } from '@angular/core';
import { isHiddenField, getDefaultValue } from '../utils/functions';

@Pipe({name: 'isHiddenField'})
export class IsHiddenFieldPipe implements PipeTransform {
    transform(value: any): boolean {
        return isHiddenField(value);
    }
}

@Pipe({name: 'defaultValue'})
export class DefaultValuePipe implements PipeTransform {
    transform(value: any): string {
        return getDefaultValue(value);
    }
}

@Pipe({name: 'fieldLabel'})
export class FieldLabelPipe implements PipeTransform {
    transform(value: any): string {
        return value.title ? value.title : value.name;
    }
}

