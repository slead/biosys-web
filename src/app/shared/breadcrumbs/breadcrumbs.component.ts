import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'biosys-breadcrumbs',
    templateUrl: 'breadcrumbs.component.html',
    styleUrls: []
})
export class BreadcrumbsComponent implements OnInit {
    @Input() public items: MenuItem[] = [];

    ngOnInit() {
    }
}
