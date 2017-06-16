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
require("leaflet-draw");
require("leaflet-simple-graticule");
var MarkerDirective = (function () {
    function MarkerDirective() {
    }
    return MarkerDirective;
}());
__decorate([
    core_1.Input()
], MarkerDirective.prototype, "geometry", void 0);
__decorate([
    core_1.Input()
], MarkerDirective.prototype, "popupText", void 0);
MarkerDirective = __decorate([
    core_1.Directive({
        selector: 'biosys-marker'
    })
], MarkerDirective);
exports.MarkerDirective = MarkerDirective;
var FeatureMapComponent = (function () {
    function FeatureMapComponent() {
        this.drawFeatureTypes = [];
        this.layersControlOptions = {
            position: 'bottomleft'
        };
        this.icon = L.icon({
            iconUrl: 'assets/img/extra-marker-icon.png',
            shadowUrl: 'css/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        this.drawnFeatures = L.featureGroup();
        this.initialised = false;
    }
    Object.defineProperty(FeatureMapComponent.prototype, "markers", {
        set: function (markers) {
            var _this = this;
            markers.forEach(function (marker) {
                if (marker.geometry) {
                    var coord = marker.geometry.coordinates;
                    var leafletMarker = L.marker(L.GeoJSON.coordsToLatLng([coord[0], coord[1]]), { icon: _this.icon });
                    leafletMarker.bindPopup(marker.popupText);
                    leafletMarker.on('mouseover', function () {
                        this.openPopup();
                    });
                    _this.map.addLayer(leafletMarker);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    FeatureMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drawOptions = {
            position: 'bottomright',
            draw: {
                polyline: this.drawFeatureTypes.indexOf('LINE') > -1,
                polygon: this.drawFeatureTypes.indexOf('POLYGON') > -1,
                rectangle: this.drawFeatureTypes.indexOf('POLYGON') > -1,
                circle: false,
                marker: this.drawFeatureTypes.indexOf('POINT') > -1
            },
            edit: {
                featureGroup: this.drawnFeatures
            }
        };
        this.initialised = true;
        this.map = L.map('map', {
            zoom: 4,
            center: index_1.WA_CENTER,
            layers: [index_1.getDefaultBaseLayer()]
        });
        L.control.layers(null, index_1.getOverlayLayers()).addTo(this.map);
        console.log(L.simpleGraticule);
        L.simpleGraticule({ interval: 20,
            showOriginLabel: true,
            redraw: 'move',
            zoomIntervals: [
                { start: 0, end: 3, interval: 50 },
                { start: 4, end: 5, interval: 5 },
                { start: 6, end: 20, interval: 1 }
            ] }).addTo(this.map);
        this.map.addLayer(this.drawnFeatures);
        this.map.on('draw:created', function (e) { return _this.onFeatureCreated(e); });
        this.drawControl = new L.Control.Draw(this.drawOptions);
        if (this.isEditing) {
            this.map.addControl(this.drawControl);
        }
        var icon = L.icon({
            iconUrl: 'assets/img/extra-marker-icon.png',
            shadowUrl: 'assets/img/marker-shadow.png'
        });
    };
    FeatureMapComponent.prototype.ngOnChanges = function (changes) {
        if (changes['geometry']) {
            this.drawnFeatures.clearLayers();
            if (this.geometry) {
                if (this.geometry.type === 'LineString') {
                    var polyline = L.polyline(L.GeoJSON.coordsToLatLngs(this.geometry.coordinates));
                    this.drawnFeatures.addLayer(polyline);
                    this.drawnFeatureType = 'polyline';
                }
                else if (this.geometry.type === 'Polygon') {
                    var coords = this.geometry.coordinates[0];
                    var polygon = L.polygon(L.GeoJSON.coordsToLatLngs(coords));
                    this.drawnFeatures.addLayer(polygon);
                    this.drawnFeatureType = 'polygon';
                }
                else if (this.geometry.type === 'Point') {
                    var coord = this.geometry.coordinates;
                    var marker = L.marker(L.GeoJSON.coordsToLatLng([coord[0], coord[1]]));
                    this.drawnFeatures.addLayer(marker);
                    this.drawnFeatureType = 'point';
                }
            }
        }
        if (changes['isEditing']) {
            if (this.initialised) {
                if (this.isEditing) {
                    this.map.addControl(this.drawControl);
                }
                else {
                    this.map.removeControl(this.drawControl);
                }
            }
        }
    };
    FeatureMapComponent.prototype.getFeatureGeometry = function () {
        var geom = null;
        if (this.drawnFeatures.getLayers().length > 0) {
            if (this.drawnFeatureType === 'polygon' || this.drawnFeatureType === 'rectangle') {
                return this.drawnFeatures.getLayers()[0].toGeoJSON().geometry;
            }
            else if (this.drawnFeatureType === 'polyline') {
                return this.drawnFeatures.getLayers()[0].toGeoJSON().geometry;
            }
            else if (this.drawnFeatureType === 'marker' || this.drawnFeatureType === 'point') {
                return this.drawnFeatures.getLayers()[0].toGeoJSON().geometry;
            }
        }
        return geom;
    };
    FeatureMapComponent.prototype.onFeatureCreated = function (e) {
        this.drawnFeatures.clearLayers();
        this.drawnFeatures.addLayer(e.layer);
        this.drawnFeatureType = e.layerType;
    };
    return FeatureMapComponent;
}());
__decorate([
    core_1.Input()
], FeatureMapComponent.prototype, "drawFeatureTypes", void 0);
__decorate([
    core_1.Input()
], FeatureMapComponent.prototype, "isEditing", void 0);
__decorate([
    core_1.Input()
], FeatureMapComponent.prototype, "geometry", void 0);
__decorate([
    core_1.ContentChildren(MarkerDirective)
], FeatureMapComponent.prototype, "markers", null);
FeatureMapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'biosys-featuremap',
        templateUrl: 'featuremap.component.html',
        styleUrls: ['featuremap.component.css'],
    })
], FeatureMapComponent);
exports.FeatureMapComponent = FeatureMapComponent;
