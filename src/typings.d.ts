/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare namespace L {
  namespace control {
    function mousePosition(options?: any): L.Layer;
  }
}
