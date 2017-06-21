import { Component, Input } from '@angular/core';
import { FileUpload } from 'primeng/primeng';

@Component({
  selector: 'biosys-fileuploader',
  templateUrl: './fileuploader.component.html'
})
export class FileuploaderComponent extends FileUpload {
    @Input()
    public loading: boolean;

    @Input()
    public cancellable: boolean = true;
}
