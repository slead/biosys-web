import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'biosys-fileuploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FileUploaderComponent extends FileUpload {
    @Input()
    public loading: boolean;
}
