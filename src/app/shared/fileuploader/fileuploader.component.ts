import { Component, Input } from '@angular/core';
import { FileUpload, DomHandler } from 'primeng/primeng';

@Component({
    selector: 'biosys-fileuploader',
    templateUrl: './fileuploader.component.html',
    providers: [DomHandler]
})
export class FileuploaderComponent extends FileUpload {
    @Input()
    public loading: boolean;
}
