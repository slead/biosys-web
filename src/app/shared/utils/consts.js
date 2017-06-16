"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var L = require("leaflet");
exports.WA_CENTER = L.latLng([-27, 121]);
exports.DATASET_TYPE_MAP = {
    generic: 'Generic Record',
    observation: 'Observation',
    species_observation: 'Species Observation'
};
function getDefaultBaseLayer() {
    return L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Open Street Map'
    });
}
exports.getDefaultBaseLayer = getDefaultBaseLayer;
function getOverlayLayers() {
    return {
        'Auslig 250K': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:auslig_cddp',
            format: 'image/png',
            transparent: true,
        }),
        'Pre-European Vegetation': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:pre_european',
            format: 'image/png',
            transparent: true,
        }),
        'WA Townsites': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:townsite_poly',
            format: 'image/png',
            transparent: true,
        }),
        'P&W Estate': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:dpaw_tenure',
            format: 'image/png',
            transparent: true,
        }),
        'DPaW District Boundaries': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:dpaw_districts',
            format: 'image/png',
            transparent: true,
        }),
        'DPaW Region Boundaries': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:dpaw_regions',
            format: 'image/png',
            transparent: true,
        }),
        'Interim Biogeographic Regionalisation for WA': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:ibra_wa_subregions',
            format: 'image/png',
            transparent: true,
        }),
        'Scientific Study Sites': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:scientific_study_sites',
            format: 'image/png',
            transparent: true,
        }),
        'Road Centrelines': L.tileLayer.wms('https://kmi.dpaw.wa.gov.au/geoserver/cddp/wms', {
            layers: 'cddp:road_centrelines',
            format: 'image/png',
            transparent: true,
        })
    };
}
exports.getOverlayLayers = getOverlayLayers;
