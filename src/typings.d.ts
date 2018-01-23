import * as L from 'leaflet';

declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'leaflet' {
    namespace control {
        function mousePosition(options?: any): L.Control;
    }

    function latlngGraticule(options?: any): L.Layer;
}
