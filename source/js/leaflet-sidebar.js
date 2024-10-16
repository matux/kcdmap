/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @see L.control.sidebar
 */
(L.Control.Sidebar = L.Control.extend({
    includes: L.Evented.prototype || L.Mixin.Events,
    options: {
        position: "left",
    },
    initialize: function (t, s) {
        var i;
        var e;
        for (
            L.setOptions(this, s),
                this._sidebar = L.DomUtil.get(t),
                L.DomUtil.addClass(
                    this._sidebar,
                    "sidebar-" + this.options.position,
                ),
                L.Browser.touch &&
                    L.DomUtil.addClass(this._sidebar, "leaflet-touch"),
                i = this._sidebar.children.length - 1;
            i >= 0;
            i--
        )
            "DIV" == (e = this._sidebar.children[i]).tagName &&
                L.DomUtil.hasClass(e, "sidebar-content") &&
                (this._container = e);
        for (
            this._tabitems = this._sidebar.querySelectorAll(
                "ul.sidebar-tabs > li, .sidebar-tabs > ul > li",
            ),
                i = this._tabitems.length - 1;
            i >= 0;
            i--
        )
            this._tabitems[i]._sidebar = this;
        for (
            this._panes = [],
                this._closeButtons = [],
                i = this._container.children.length - 1;
            i >= 0;
            i--
        )
            if (
                "DIV" == (e = this._container.children[i]).tagName &&
                L.DomUtil.hasClass(e, "sidebar-pane")
            ) {
                this._panes.push(e);
                for (
                    var o = e.querySelectorAll(".sidebar-close"),
                        a = 0,
                        l = o.length;
                    a < l;
                    a++
                )
                    this._closeButtons.push(o[a]);
            }
    },
    addTo: function (t) {
        var s;
        var i;
        for (this._map = t, s = this._tabitems.length - 1; s >= 0; s--) {
            var e = (i = this._tabitems[s]).querySelector("a");
            e.hasAttribute("href") &&
                "#" == e.getAttribute("href").slice(0, 1) &&
                L.DomEvent.on(e, "click", L.DomEvent.preventDefault).on(
                    e,
                    "click",
                    this._onClick,
                    i,
                );
        }
        for (s = this._closeButtons.length - 1; s >= 0; s--)
            (i = this._closeButtons[s]),
                L.DomEvent.on(i, "click", this._onCloseClick, this);
        return this;
    },
    removeFrom: function (t) {
        console.log(
            "removeFrom() has been deprecated, please use remove() instead as support for this function will be ending soon.",
        ),
            this.remove(t);
    },
    remove: function (t) {
        var s;
        var i;
        for (this._map = null, s = this._tabitems.length - 1; s >= 0; s--)
            (i = this._tabitems[s]),
                L.DomEvent.off(i.querySelector("a"), "click", this._onClick);
        for (s = this._closeButtons.length - 1; s >= 0; s--)
            (i = this._closeButtons[s]),
                L.DomEvent.off(i, "click", this._onCloseClick, this);
        return this;
    },
    open: function (t) {
        var s;
        var i;
        for (s = this._panes.length - 1; s >= 0; s--)
            (i = this._panes[s]).id == t
                ? L.DomUtil.addClass(i, "active")
                : L.DomUtil.hasClass(i, "active") &&
                  L.DomUtil.removeClass(i, "active");
        for (s = this._tabitems.length - 1; s >= 0; s--)
            (i = this._tabitems[s]).querySelector("a").hash == "#" + t
                ? L.DomUtil.addClass(i, "active")
                : L.DomUtil.hasClass(i, "active") &&
                  L.DomUtil.removeClass(i, "active");
        return (
            this.fire("content", {
                id: t,
            }),
            L.DomUtil.hasClass(this._sidebar, "collapsed") &&
                (this.fire("opening"),
                L.DomUtil.removeClass(this._sidebar, "collapsed")),
            this
        );
    },
    close: function () {
        for (var t = this._tabitems.length - 1; t >= 0; t--) {
            var s = this._tabitems[t];
            L.DomUtil.hasClass(s, "active") &&
                L.DomUtil.removeClass(s, "active");
        }
        return (
            L.DomUtil.hasClass(this._sidebar, "collapsed") ||
                (this.fire("closing"),
                L.DomUtil.addClass(this._sidebar, "collapsed")),
            this
        );
    },
    _onClick: function () {
        L.DomUtil.hasClass(this, "active")
            ? this._sidebar.close()
            : L.DomUtil.hasClass(this, "disabled") ||
              this._sidebar.open(this.querySelector("a").hash.slice(1));
    },
    _onCloseClick: function () {
        this.close();
    },
})),
    (L.control.sidebar = function (t, s) {
        return new L.Control.Sidebar(t, s);
    });
