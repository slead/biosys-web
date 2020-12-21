import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DataView } from 'primeng/dataview';

import { Media } from '../../../biosys-core/interfaces/api.interfaces';

@Component({
    selector: 'biosys-media-manager',
    templateUrl: './media-manager.component.html',
    styleUrls: ['./media-manager.component.css']
})
export class MediaManagerComponent {
    @Input()
    public mediaList: Media[];

    @Input()
    public isLoading = false;

    @Output()
    public uploadMedia: EventEmitter<File[]> = new EventEmitter<File[]>();

    @Output()
    public deleteMedia: EventEmitter<Media> = new EventEmitter<Media>();

    public showUploadMediaDialog = false;
    public showPreviewDialog = false;
    public previewDialogSource: string;

    @ViewChild(DataView)
    private dateView: DataView;

    constructor() {
    }

    public onUploadMedia(event: any) {
        this.uploadMedia.emit(event.files);
        this.showUploadMediaDialog = false;
    }

    public onThumbnailClicked(url: string): boolean {
        this.previewDialogSource = url;
        this.showPreviewDialog = true;
        return false;
    }

    public onDeleteClicked(media: Media) {
        this.deleteMedia.emit(media);
    }

    public refresh() {
        this.dateView.cd.detectChanges();
    }
}
