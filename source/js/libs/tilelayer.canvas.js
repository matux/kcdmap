(L.TileLayer.Canvas = L.TileLayer.extend({
    _delays: {},
    _delaysForZoom: null,
    createCanvas: function (e, t, s) {
        let a;
        const o = e.getContext("2d");
        const { doubleSize: i } = this.options;
        const { x: n, y: l } = this.getTileSize();
        (e.width = i ? 2 * n : n), (e.height = i ? 2 * l : l);
        const r = new Image();
        r.onload = () => {
            try {
                o.drawImage(r, 0, 0), (e.complete = !0);
            } catch (e) {
                a = e;
            } finally {
                s(a, e);
            }
        };
        const c = this._getZoomForUrl();
        (r.src = isNaN(c) ? "" : this.getTileUrl(t)),
            (r.crossOrigin = "anonymous");
    },
    createTile: function (e, t) {
        const { timeout: s } = this.options;
        const { z: a } = e;
        const o = document.createElement("canvas");
        return (
            s
                ? (a !== this._delaysForZoom &&
                      (this._clearDelaysForZoom(), (this._delaysForZoom = a)),
                  this._delays[a] || (this._delays[a] = []),
                  this._delays[a].push(
                      setTimeout(() => {
                          this.createCanvas(o, e, t);
                      }, s),
                  ))
                : this.createCanvas(o, e, t),
            o
        );
    },
    _clearDelaysForZoom: function () {
        const e = this._delaysForZoom;
        const t = this._delays[e];
        t &&
            (t.forEach((e, s) => {
                clearTimeout(e), delete t[s];
            }),
            delete this._delays[e]);
    },
})),
    (L.tileLayer.canvas = function (e, t) {
        return new L.TileLayer.Canvas(e, t);
    });
