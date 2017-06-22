"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../shared/index");
var L = require("leaflet");
/**
 * This class represents the lazy loaded HomeComponent.
 */
var HomeComponent = (function () {
    function HomeComponent(apiService) {
        this.apiService = apiService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // need to get user before projects so use Promise 'then' syntax
        this.apiService.whoAmI()
            .toPromise()
            .then(function (user) { return _this.user = user; }, function (error) { return console.log('error.msg', error.msg); })
            .then(function () { return _this.apiService.getProjects()
            .subscribe(function (projects) {
            _this.projects = projects;
            _this.loadProjectMarkers();
        }, function (error) { return console.log('error.msg', error.msg); }); });
        this.apiService.getStatistics()
            .subscribe(function (statistic) { return _this.statistic = statistic; }, function (error) { return console.log('error.msg', error.msg); });
        this.map = L.map('map', {
            zoom: 4,
            center: index_1.WA_CENTER,
            layers: [index_1.getDefaultBaseLayer()]
        });
        L.control.layers(null, index_1.getOverlayLayers()).addTo(this.map);
    };
    HomeComponent.prototype.onMapReady = function (map) {
        this.map = map;
    };
    HomeComponent.prototype.loadProjectMarkers = function () {
        for (var _i = 0, _a = this.projects; _i < _a.length; _i++) {
            var project = _a[_i];
            if (project.centroid) {
                var marker = L.geoJSON(project.centroid).addTo(this.map);
                var popupContent = '<p class="m-0"><strong>' + project.name + '</strong></p>';
                if (project.description) {
                    popupContent += '<p class="mt-1 mb-0">' + project.description + '</p>';
                }
                if (this.user && project.custodians.indexOf(this.user.id) > -1) {
                    popupContent += '<p class="mt-1"><a href="#/management/projects/edit-project/' + project.id +
                        '">Project Details</a></p>';
                }
                marker.bindPopup(popupContent);
                marker.on('mouseover', function () {
                    this.openPopup();
                });
                marker.addTo(this.map);
            }
        }
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'biosys-home',
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css'],
    })
], HomeComponent);
exports.HomeComponent = HomeComponent;
