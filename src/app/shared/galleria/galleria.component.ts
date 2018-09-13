import { Component } from '@angular/core';
import { Galleria, DomHandler  } from 'primeng/primeng';

@Component({
    selector: 'biosys-galleria',
    templateUrl: './galleria.component.html',
    styleUrls: ['./galleria.component.css'],
    providers: [DomHandler]
})
export class GalleriaComponent extends Galleria {
}
