"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * This class represents the lazy loaded HomeComponent.
 */
var NavbarComponent = (function () {
    function NavbarComponent(auth) {
        this.auth = auth;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = [
            {
                label: 'Home',
                icon: 'fa-home',
                routerLink: ['/']
            },
            {
                label: 'Manage',
                icon: 'fa-university',
                routerLink: ['/management/projects']
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
                command: function () { return _this.logout(); }
            }
        ];
    };
    NavbarComponent.prototype.logout = function () {
        this.auth.logout().subscribe(function () { return location.reload(); });
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'biosys-navbar',
        templateUrl: 'navbar.component.html',
        styleUrls: []
    })
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
