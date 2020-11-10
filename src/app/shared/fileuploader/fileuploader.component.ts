import { Component, Input } from '@angular/core';
import {DomHandler} from 'primeng/dom';
import {FileUpload} from 'primeng/fileupload';

@Component({
    selector: 'biosys-fileuploader',
    templateUrl: './fileuploader.component.html',
    providers: [DomHandler]
})
export class FileuploaderComponent extends FileUpload {
    @Input()
    public loading: boolean;
}
