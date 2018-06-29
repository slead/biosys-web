import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../biosys-core/services/auth.service';
import { MenuItem } from 'primeng/primeng';
import { User } from '../../../biosys-core/interfaces/api.interfaces';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'biosys-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: []
})
export class NavbarComponent implements OnInit {
    public items: MenuItem[];

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'fa-home',
                routerLink: ['/']
            },

            {
                label: 'Data',
                icon: 'fa-database',
                routerLink: ['/data/projects']
            },
            {
                label: 'View',
                icon: 'fa-search',
                routerLink: ['/view']
            },
            {
                label: 'Logout',
                icon: 'fa-sign-out',
                command: () => this.logout()
            }
        ];

        this.authService.getCurrentUser().subscribe((user: User) => {
            if (user.is_superuser) {
                this.items.splice(1, 0, {
                    label: 'Manage',
                    icon: 'fa-university',
                    items: [
                        {
                            label: 'Programs',
                            routerLink: ['/management/programs']
                        },
                        {
                            label: 'Projects',
                            routerLink: ['/management/projects']
                        }
                    ]
                });
            }
        });
    }

    logout() {
        this.authService.logout();
    }
}
