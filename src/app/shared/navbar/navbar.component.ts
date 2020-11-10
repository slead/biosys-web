import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

import { AuthService } from '../../../biosys-core/services/auth.service';
import { User } from '../../../biosys-core/interfaces/api.interfaces';
import { Router } from '@angular/router';
import { formatUserFullName } from '../../../biosys-core/utils/functions';
import { environment } from '../../../environments/environment';

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

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'fa fa-home',
                routerLink: ['/']
            },
            {
                label: 'Data Management',
                icon: 'fa fa-database',
                routerLink: ['/data-management/projects']
            },
            {
                label: 'View and Export',
                icon: 'fa fa-search',
                routerLink: ['/view']
            }
        ];

        this.authService.getCurrentUser().subscribe((user: User) => {
            const projectItem = {
                label: 'Projects',
                routerLink: ['/administration/projects']
            };

            if (user.is_admin) {
                this.items.splice(1, 0, {
                    label: 'Administration',
                    icon: 'fa fa-university',
                    items: [
                        {
                            label: 'Programs',
                            routerLink: ['/administration/programs']
                        },
                        projectItem
                    ]
                });
            } else if (user.is_data_engineer) {
                this.items.splice(1, 0, {
                    label: 'Administration',
                    icon: 'fa fa-university',
                    items: [
                        projectItem
                    ]
                });
            }

            const accountItems: MenuItem[] = [
                {
                    label: 'Logout',
                    icon: 'fa fa-sign-out',
                    command: () => this.logout()
                }
            ];

            if (!environment['useSSOAuth']) {
                accountItems.unshift({
                    label: 'Change Password',
                    icon: 'fa fa-key',
                    routerLink: ['/change-password']
                });
            }

            this.items.push({
                label: `Logged in as ${formatUserFullName(user)}`,
                items: accountItems
            });
        });
    }

    logout() {
        this.authService.logout();

        this.router.navigate(['/login']);
    }
}
