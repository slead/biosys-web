import { Spinner } from 'spin.js';

L.Loading = L.Layer.extend({
    options: {
        background: '#000000',
        opacity: 0.5,
        showLabel: true,
        labelText: 'Loading',
        labelColor: '#FFFFFF',
        labelSize: '16px',
        spinnerOptions: {
            color: '#FFFFFF'
        }
    },

    initialize: function (options) {
        L.setOptions(this, options);

        this._modal = L.DomUtil.create('div', 'leaflet-layer');
        this._modal.style.background = this.options.background;
        this._modal.style.zIndex = 1000;
        L.DomUtil.setOpacity(this._modal, this.options.opacity);

        this._spinner = new Spinner(this.options.spinnerOptions).spin(this._modal);

        if(this.options.showLabel) {
            this._labelContainer = L.DomUtil.create('div');
            this._labelContainer.style.textAlign = 'center';
            this._modal.appendChild(this._labelContainer);

            this._label = L.DomUtil.create('label');
            this._label.innerHTML = this.options.labelText;
            this._label.style.color = this.options.labelColor;
            this._label.style.fontSize = this.options.labelSize;
            this._labelContainer.appendChild(this._label);
        }
    },

    onAdd: function (map) {
        this._resize(map.getSize());

        map._container.appendChild(this._modal);

        map.on('resize', function (resizeEvent) {
            this._resize(resizeEvent.newSize);
        }, this);
    },

    onRemove: function (map) {
        map._container.removeChild(this._modal);
    },

    addTo: function (map) {
        map.addLayer(this);

        return this;
    },

    setOpacity: function (opacity) {
        this.options.opacity = opacity;

        L.DomUtil.setOpacity(this._modal, this.options.opacity);

        return this;
    },

    start: function() {
        this._modal.style.display = 'block';
    },

    stop: function() {
        this._modal.style.display = 'None';
    },

    _resize(size) {
        var labelMargin = size.y * 0.5 + this._spinner.opts.length + this._spinner.opts.width +
            this._spinner.opts.radius;

        this._modal.style.width = size.x + 'px';
        this._modal.style.height = size.y + 'px';

        this._labelContainer.style.width = size.x + 'px';

        this._label.style.marginTop = labelMargin + 'px';
    }
});

L.loading = function (options) {
    return new L.Loading(options);
};
