!(function () {
    (L.Control.FullScreen = L.Control.extend({
        options: {
            position: "topleft",
            title: "Full Screen",
            titleCancel: "Exit Full Screen",
            forceSeparateButton: !1,
            forcePseudoFullscreen: !1,
            fullscreenElement: !1,
        },
        onAdd: function (e) {
            var t;
            var n = "leaflet-control-zoom-fullscreen";
            var l = "";
            return (
                (t =
                    e.zoomControl && !this.options.forceSeparateButton
                        ? e.zoomControl._container
                        : L.DomUtil.create("div", "leaflet-bar")),
                this.options.content
                    ? (l = this.options.content)
                    : (n += " fullscreen-icon"),
                this._createButton(
                    this.options.title,
                    n,
                    l,
                    t,
                    this.toggleFullScreen,
                    this,
                ),
                this._map.on(
                    "enterFullscreen exitFullscreen",
                    this._toggleTitle,
                    this,
                ),
                t
            );
        },
        _createButton: function (t, n, l, r, i, s) {
            return (
                (this.link = L.DomUtil.create("a", n, r)),
                (this.link.href = "#"),
                (this.link.title = t),
                (this.link.innerHTML = l),
                L.DomEvent.addListener(
                    this.link,
                    "click",
                    L.DomEvent.stopPropagation,
                )
                    .addListener(this.link, "click", L.DomEvent.preventDefault)
                    .addListener(this.link, "click", i, s),
                L.DomEvent.addListener(
                    r,
                    e.fullScreenEventName,
                    L.DomEvent.stopPropagation,
                )
                    .addListener(
                        r,
                        e.fullScreenEventName,
                        L.DomEvent.preventDefault,
                    )
                    .addListener(
                        r,
                        e.fullScreenEventName,
                        this._handleEscKey,
                        s,
                    ),
                L.DomEvent.addListener(
                    document,
                    e.fullScreenEventName,
                    L.DomEvent.stopPropagation,
                )
                    .addListener(
                        document,
                        e.fullScreenEventName,
                        L.DomEvent.preventDefault,
                    )
                    .addListener(
                        document,
                        e.fullScreenEventName,
                        this._handleEscKey,
                        s,
                    ),
                this.link
            );
        },
        toggleFullScreen: function () {
            var t = this._map;
            (t._exitFired = !1),
                t._isFullscreen
                    ? (e.supportsFullScreen &&
                      !this.options.forcePseudoFullscreen
                          ? e.cancelFullScreen(
                                this.options.fullscreenElement
                                    ? this.options.fullscreenElement
                                    : t._container,
                            )
                          : L.DomUtil.removeClass(
                                this.options.fullscreenElement
                                    ? this.options.fullscreenElement
                                    : t._container,
                                "leaflet-pseudo-fullscreen",
                            ),
                      t.invalidateSize(),
                      t.fire("exitFullscreen"),
                      (t._exitFired = !0),
                      (t._isFullscreen = !1))
                    : (e.supportsFullScreen &&
                      !this.options.forcePseudoFullscreen
                          ? e.requestFullScreen(
                                this.options.fullscreenElement
                                    ? this.options.fullscreenElement
                                    : t._container,
                            )
                          : L.DomUtil.addClass(
                                this.options.fullscreenElement
                                    ? this.options.fullscreenElement
                                    : t._container,
                                "leaflet-pseudo-fullscreen",
                            ),
                      t.invalidateSize(),
                      t.fire("enterFullscreen"),
                      (t._isFullscreen = !0));
        },
        _toggleTitle: function () {
            this.link.title = this._map._isFullscreen
                ? this.options.title
                : this.options.titleCancel;
        },
        _handleEscKey: function () {
            var t = this._map;
            e.isFullScreen(t) ||
                t._exitFired ||
                (t.fire("exitFullscreen"),
                (t._exitFired = !0),
                (t._isFullscreen = !1));
        },
    })),
        L.Map.addInitHook(function () {
            this.options.fullscreenControl &&
                ((this.fullscreenControl = L.control.fullscreen(
                    this.options.fullscreenControlOptions,
                )),
                this.addControl(this.fullscreenControl));
        }),
        (L.control.fullscreen = function (e) {
            return new L.Control.FullScreen(e);
        });
    var e = {
        supportsFullScreen: !1,
        isFullScreen: function () {
            return !1;
        },
        requestFullScreen: function () {},
        cancelFullScreen: function () {},
        fullScreenEventName: "",
        prefix: "",
    };
    var t = "webkit moz o ms khtml".split(" ");
    if (void 0 !== document.exitFullscreen) e.supportsFullScreen = !0;
    else {
        for (var n = 0, l = t.length; n < l; n++)
            if (
                ((e.prefix = t[n]),
                void 0 !== document[e.prefix + "CancelFullScreen"])
            ) {
                e.supportsFullScreen = !0;
                break;
            }
        void 0 !== document.msExitFullscreen &&
            ((e.prefix = "ms"), (e.supportsFullScreen = !0));
    }
    e.supportsFullScreen &&
        ("ms" === e.prefix
            ? (e.fullScreenEventName = "MSFullscreenChange")
            : (e.fullScreenEventName = e.prefix + "fullscreenchange"),
        (e.isFullScreen = function () {
            switch (this.prefix) {
                case "":
                    return document.fullscreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                case "ms":
                    return document.msFullscreenElement;
                default:
                    return document[this.prefix + "FullScreen"];
            }
        }),
        (e.requestFullScreen = function (e) {
            switch (this.prefix) {
                case "":
                    return e.requestFullscreen();
                case "ms":
                    return e.msRequestFullscreen();
                default:
                    return e[this.prefix + "RequestFullScreen"]();
            }
        }),
        (e.cancelFullScreen = function () {
            switch (this.prefix) {
                case "":
                    return document.exitFullscreen();
                case "ms":
                    return document.msExitFullscreen();
                default:
                    return document[this.prefix + "CancelFullScreen"]();
            }
        })),
        "undefined" != typeof jQuery &&
            (jQuery.fn.requestFullScreen = function () {
                return this.each(function () {
                    var t = jQuery(this);
                    e.supportsFullScreen && e.requestFullScreen(t);
                });
            }),
        (window.fullScreenApi = e);
})();
