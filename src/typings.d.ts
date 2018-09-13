import * as L from 'leaflet';
import { LayerGroup } from 'leaflet';
import { Map } from 'leaflet';

declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'leaflet' {
    namespace control {
        function mousePosition(options?: any): L.Control;
    }

    function latlngGraticule(options?: any): L.Layer;

    function loading(options?: any): L.Loading;

    class Loading extends L.Layer {
        start();

        stop();
    }
}
