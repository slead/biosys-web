import { Pipe, PipeTransform } from '@angular/core';

const IMAGE_FILE_TYPE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff'];
const VIDEO_FILE_TYPE_EXTENSIONS = ['avi', 'mp4', 'mov', 'mpeg', 'mpg'];
const OTHER_FILE_TYPE_EXTENSIONS = ['aac', 'apk', 'dmg', 'dng', 'doc', 'docx', 'eps', 'epub', 'exe', 'fff', 'gis',
    'gpx', 'kml', 'kmz', 'mp3', 'ogg', 'osm', 'otf', 'pdf', 'ps', 'psd', 'rar', 'raw', 'rrp',
    'sql', 'tar', 'ttf', 'wav', 'wma', 'woff', 'xls', 'xlsx', 'xml', 'zip'];

const FILE_SIZE_UNITS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

@Pipe({
    name: 'isImageFile'
})
export class IsImageFilePipe implements PipeTransform {
    public transform(value: string): boolean {
        const fileType = value.substring(value.lastIndexOf('.') + 1);

        return IMAGE_FILE_TYPE_EXTENSIONS.indexOf(fileType) > -1;
    }
}

@Pipe({
    name: 'isVideoFile'
})
export class IsVideoFilePipe implements PipeTransform {
    public transform(value: string): boolean {
        const fileType = value.substring(value.lastIndexOf('.') + 1);

        return VIDEO_FILE_TYPE_EXTENSIONS.indexOf(fileType) > -1;
    }
}

@Pipe({
    name: 'fileIconUrl'
})
export class FileIconUrlPipe implements PipeTransform {
    public transform(value: string): string {
        const fileType = value.substring(value.lastIndexOf('.') + 1);
        const availableIconFileExtensions = IMAGE_FILE_TYPE_EXTENSIONS.concat(VIDEO_FILE_TYPE_EXTENSIONS).
            concat(OTHER_FILE_TYPE_EXTENSIONS);

        if (availableIconFileExtensions.indexOf(fileType) > -1) {
            return `assets/img/fileicons/icons8-${fileType}.png`;
        } else {
            return `assets/img/fileicons/icons8-unknown.png`;
        }
    }
}

@Pipe({
    name: 'fileName'
})
export class FileNamePipe implements PipeTransform {
    public transform(value: string): string {
        return value.substring(value.lastIndexOf('/') + 1);
    }
}

@Pipe({
    name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
    transform(bytes: number = 0, precision: number = 2): string {
        if (isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes )) {
            return '?';
        }

        let unit = 0;

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }

        return bytes.toFixed(+precision) + ' ' + FILE_SIZE_UNITS[ unit ];
    }
}
