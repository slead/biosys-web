import { Component } from '@angular/core';
import {DomHandler} from 'primeng/dom';
import {Galleria} from 'primeng/galleria';

@Component({
    selector: 'biosys-galleria',
    templateUrl: './galleria.component.html',
    styleUrls: ['./galleria.component.css'],
    providers: [DomHandler]
})
export class GalleriaComponent extends Galleria {
}
