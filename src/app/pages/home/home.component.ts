import { Component, OnInit } from '@angular/core';
import { APIService, APIError, Project, Statistic, User, DEFAULT_CENTER, DEFAULT_MARKER_ICON, DEFAULT_ZOOM,
    getDefaultBaseLayer, getOverlayLayers } from '../../shared/index';
import * as L from 'leaflet';
import 'leaflet-mouse-position';
import '../../../lib/leaflet.latlng-graticule'

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'biosys-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {
    public projects: Project[];
    public statistic: Statistic;
    public user: User;

    private map: L.Map;

    constructor(public apiService: APIService) {
    }

    ngOnInit() {
        // need to get user before projects so use Promise 'then' syntax
        this.apiService.whoAmI()
        .toPromise()
        .then((user: User) => this.user = user,
            (error: APIError) => console.log('error.msg', error.msg)
        )
        .then(() => this.apiService.getProjects()
        .subscribe(
            (projects: Project[]) => {
                this.projects = projects;
                this.loadProjectMarkers();
            },
            (error: APIError) => console.log('error.msg', error.msg)
        ));

        this.apiService.getStatistics()
        .subscribe(
            (statistic: Statistic) => this.statistic = statistic,
            (error: APIError) => console.log('error.msg', error.msg)
        );

        this.map = L.map('map', {
            zoom: DEFAULT_ZOOM,
            center: DEFAULT_CENTER,
            layers: [getDefaultBaseLayer()]
        });

        L.control.layers(null, getOverlayLayers()).addTo(this.map);

        L.control.mousePosition({emptyString: '', lngFirst: true, separator: ', '}).addTo(this.map);

        L.latlngGraticule().addTo(this.map);

        L.control.scale({imperial: false, position: 'bottomright'}).addTo(this.map);
    }

    public onMapReady(map: L.Map) {
        this.map = map;
    }

    private loadProjectMarkers() {
        for (let project of this.projects) {
            if (project.centroid) {
                let coord: GeoJSON.Position = project.centroid.coordinates as GeoJSON.Position;
                let marker: L.Marker = L.marker(L.GeoJSON.coordsToLatLng([coord[0], coord[1]]),
                    {icon: DEFAULT_MARKER_ICON});
                let popupContent: string = '<p class="m-0"><strong>' + project.name + '</strong></p>';
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
    }
}
