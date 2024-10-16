!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
          ? define(e)
          : (t.i18next = e());
})(this, function () {
    "use strict";
    var t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                  return typeof t;
              }
            : function (t) {
                  return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
              };
    var e = function (t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
    };
    var n =
        Object.assign ||
        function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
        };
    var o = function (t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError(
                "Super expression must either be null or a function, not " +
                    typeof e,
            );
        (t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
            },
        })),
            e &&
                (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e));
    };
    var r = function (t, e) {
        if (!t)
            throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called",
            );
        return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
    };
    var i = function (t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t))
            return (function (t, e) {
                var n = [];
                var o = !0;
                var r = !1;
                var i = void 0;
                try {
                    for (
                        var s, a = t[Symbol.iterator]();
                        !(o = (s = a.next()).done) &&
                        (n.push(s.value), !e || n.length !== e);
                        o = !0
                    );
                } catch (t) {
                    (r = !0), (i = t);
                } finally {
                    try {
                        !o && a.return && a.return();
                    } finally {
                        if (r) throw i;
                    }
                }
                return n;
            })(t, e);
        throw new TypeError(
            "Invalid attempt to destructure non-iterable instance",
        );
    };
    var s = {
        type: "logger",
        log: function (t) {
            this.output("log", t);
        },
        warn: function (t) {
            this.output("warn", t);
        },
        error: function (t) {
            this.output("error", t);
        },
        output: function (t, e) {
            var n;
            console &&
                console[t] &&
                (n = console)[t].apply(
                    n,
                    (function (t) {
                        if (Array.isArray(t)) {
                            for (
                                var e = 0, n = Array(t.length);
                                e < t.length;
                                e++
                            )
                                n[e] = t[e];
                            return n;
                        }
                        return Array.from(t);
                    })(e),
                );
        },
    };
    var a = (function () {
        function t(n) {
            var o =
                arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
            e(this, t), this.init(n, o);
        }
        return (
            (t.prototype.init = function (t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                (this.prefix = e.prefix || "i18next:"),
                    (this.logger = t || s),
                    (this.options = e),
                    (this.debug = e.debug);
            }),
            (t.prototype.setDebug = function (t) {
                this.debug = t;
            }),
            (t.prototype.log = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                    e[n] = arguments[n];
                return this.forward(e, "log", "", !0);
            }),
            (t.prototype.warn = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                    e[n] = arguments[n];
                return this.forward(e, "warn", "", !0);
            }),
            (t.prototype.error = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                    e[n] = arguments[n];
                return this.forward(e, "error", "");
            }),
            (t.prototype.deprecate = function () {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
                    e[n] = arguments[n];
                return this.forward(e, "warn", "WARNING DEPRECATED: ", !0);
            }),
            (t.prototype.forward = function (t, e, n, o) {
                return o && !this.debug
                    ? null
                    : ("string" == typeof t[0] &&
                          (t[0] = "" + n + this.prefix + " " + t[0]),
                      this.logger[e](t));
            }),
            (t.prototype.create = function (e) {
                return new t(
                    this.logger,
                    n(
                        {
                            prefix: this.prefix + ":" + e + ":",
                        },
                        this.options,
                    ),
                );
            }),
            t
        );
    })();
    var l = new a();
    var u = (function () {
        function t() {
            e(this, t), (this.observers = {});
        }
        return (
            (t.prototype.on = function (t, e) {
                var n = this;
                t.split(" ").forEach(function (t) {
                    (n.observers[t] = n.observers[t] || []),
                        n.observers[t].push(e);
                });
            }),
            (t.prototype.off = function (t, e) {
                var n = this;
                this.observers[t] &&
                    this.observers[t].forEach(function () {
                        if (e) {
                            var o = n.observers[t].indexOf(e);
                            o > -1 && n.observers[t].splice(o, 1);
                        } else delete n.observers[t];
                    });
            }),
            (t.prototype.emit = function (t) {
                for (
                    var e = arguments.length,
                        n = Array(e > 1 ? e - 1 : 0),
                        o = 1;
                    o < e;
                    o++
                )
                    n[o - 1] = arguments[o];
                this.observers[t] &&
                    [].concat(this.observers[t]).forEach(function (t) {
                        t.apply(void 0, n);
                    });
                this.observers["*"] &&
                    [].concat(this.observers["*"]).forEach(function (e) {
                        var o;
                        e.apply(e, (o = [t]).concat.apply(o, n));
                    });
            }),
            t
        );
    })();

    function c(t) {
        return null == t ? "" : "" + t;
    }

    function p(t, e, n) {
        function o(t) {
            return t && t.indexOf("###") > -1 ? t.replace(/###/g, ".") : t;
        }

        function r() {
            return !t || "string" == typeof t;
        }
        for (
            var i = "string" != typeof e ? [].concat(e) : e.split(".");
            i.length > 1;

        ) {
            if (r()) return {};
            var s = o(i.shift());
            !t[s] && n && (t[s] = new n()), (t = t[s]);
        }
        return r()
            ? {}
            : {
                  obj: t,
                  k: o(i.shift()),
              };
    }

    function f(t, e, n) {
        var o = p(t, e, Object);
        o.obj[o.k] = n;
    }

    function g(t, e) {
        var n = p(t, e);
        var o = n.obj;
        var r = n.k;
        if (o) return o[r];
    }

    function h(t, e, n) {
        for (var o in e)
            o in t
                ? "string" == typeof t[o] ||
                  t[o] instanceof String ||
                  "string" == typeof e[o] ||
                  e[o] instanceof String
                    ? n && (t[o] = e[o])
                    : h(t[o], e[o], n)
                : (t[o] = e[o]);
        return t;
    }

    function d(t) {
        return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    var v = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
    };

    function y(t) {
        return "string" == typeof t
            ? t.replace(/[&<>"'\/]/g, function (t) {
                  return v[t];
              })
            : t;
    }
    var m = (function (t) {
        function i(n) {
            var o =
                arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {
                          ns: ["translation"],
                          defaultNS: "translation",
                      };
            e(this, i);
            var s = r(this, t.call(this));
            return (s.data = n || {}), (s.options = o), s;
        }
        return (
            o(i, t),
            (i.prototype.addNamespaces = function (t) {
                this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
            }),
            (i.prototype.removeNamespaces = function (t) {
                var e = this.options.ns.indexOf(t);
                e > -1 && this.options.ns.splice(e, 1);
            }),
            (i.prototype.getResource = function (t, e, n) {
                var o =
                    (arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : {}
                    ).keySeparator || this.options.keySeparator;
                void 0 === o && (o = ".");
                var r = [t, e];
                return (
                    n && "string" != typeof n && (r = r.concat(n)),
                    n &&
                        "string" == typeof n &&
                        (r = r.concat(o ? n.split(o) : n)),
                    t.indexOf(".") > -1 && (r = t.split(".")),
                    g(this.data, r)
                );
            }),
            (i.prototype.addResource = function (t, e, n, o) {
                var r =
                    arguments.length > 4 && void 0 !== arguments[4]
                        ? arguments[4]
                        : {
                              silent: !1,
                          };
                var i = this.options.keySeparator;
                void 0 === i && (i = ".");
                var s = [t, e];
                n && (s = s.concat(i ? n.split(i) : n)),
                    t.indexOf(".") > -1 &&
                        ((o = e), (e = (s = t.split("."))[1])),
                    this.addNamespaces(e),
                    f(this.data, s, o),
                    r.silent || this.emit("added", t, e, n, o);
            }),
            (i.prototype.addResources = function (t, e, n) {
                for (var o in n)
                    "string" == typeof n[o] &&
                        this.addResource(t, e, o, n[o], {
                            silent: !0,
                        });
                this.emit("added", t, e, n);
            }),
            (i.prototype.addResourceBundle = function (t, e, o, r, i) {
                var s = [t, e];
                t.indexOf(".") > -1 &&
                    ((r = o), (o = e), (e = (s = t.split("."))[1])),
                    this.addNamespaces(e);
                var a = g(this.data, s) || {};
                r ? h(a, o, i) : (a = n({}, a, o)),
                    f(this.data, s, a),
                    this.emit("added", t, e, o);
            }),
            (i.prototype.removeResourceBundle = function (t, e) {
                this.hasResourceBundle(t, e) && delete this.data[t][e],
                    this.removeNamespaces(e),
                    this.emit("removed", t, e);
            }),
            (i.prototype.hasResourceBundle = function (t, e) {
                return void 0 !== this.getResource(t, e);
            }),
            (i.prototype.getResourceBundle = function (t, e) {
                return (
                    e || (e = this.options.defaultNS),
                    "v1" === this.options.compatibilityAPI
                        ? n({}, this.getResource(t, e))
                        : this.getResource(t, e)
                );
            }),
            (i.prototype.toJSON = function () {
                return this.data;
            }),
            i
        );
    })(u);
    var b = {
        processors: {},
        addPostProcessor: function (t) {
            this.processors[t.name] = t;
        },
        handle: function (t, e, n, o, r) {
            var i = this;
            return (
                t.forEach(function (t) {
                    i.processors[t] &&
                        (e = i.processors[t].process(e, n, o, r));
                }),
                e
            );
        },
    };
    var x = (function (i) {
        function s(t) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
            e(this, s);
            var o;
            var a;
            var u = r(this, i.call(this));
            return (
                (o = t),
                (a = u),
                [
                    "resourceStore",
                    "languageUtils",
                    "pluralResolver",
                    "interpolator",
                    "backendConnector",
                ].forEach(function (t) {
                    o[t] && (a[t] = o[t]);
                }),
                (u.options = n),
                (u.logger = l.create("translator")),
                u
            );
        }
        return (
            o(s, i),
            (s.prototype.changeLanguage = function (t) {
                t && (this.language = t);
            }),
            (s.prototype.exists = function (t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {
                              interpolation: {},
                          };
                var n = this.resolve(t, e);
                return n && void 0 !== n.res;
            }),
            (s.prototype.extractFromKey = function (t, e) {
                var n = e.nsSeparator || this.options.nsSeparator;
                void 0 === n && (n = ":");
                var o = e.keySeparator || this.options.keySeparator || ".";
                var r = e.ns || this.options.defaultNS;
                if (n && t.indexOf(n) > -1) {
                    var i = t.split(n);
                    (n !== o ||
                        (n === o && this.options.ns.indexOf(i[0]) > -1)) &&
                        (r = i.shift()),
                        (t = i.join(o));
                }
                return (
                    "string" == typeof r && (r = [r]),
                    {
                        key: t,
                        namespaces: r,
                    }
                );
            }),
            (s.prototype.translate = function (e, o) {
                var r = this;
                if (
                    ("object" !== (void 0 === o ? "undefined" : t(o)) &&
                        this.options.overloadTranslationOptionHandler &&
                        (o =
                            this.options.overloadTranslationOptionHandler(
                                arguments,
                            )),
                    o || (o = {}),
                    null == e || "" === e)
                )
                    return "";
                "number" == typeof e && (e = String(e)),
                    "string" == typeof e && (e = [e]);
                var i = o.keySeparator || this.options.keySeparator || ".";
                var s = this.extractFromKey(e[e.length - 1], o);
                var a = s.key;
                var l = s.namespaces;
                var u = l[l.length - 1];
                var c = o.lng || this.language;
                var p =
                    o.appendNamespaceToCIMode ||
                    this.options.appendNamespaceToCIMode;
                if (c && "cimode" === c.toLowerCase()) {
                    if (p) {
                        var f = o.nsSeparator || this.options.nsSeparator;
                        return u + f + a;
                    }
                    return a;
                }
                var g = this.resolve(e, o);
                var h = g && g.res;
                var d = (g && g.usedKey) || a;
                var v = Object.prototype.toString.apply(h);
                var y =
                    void 0 !== o.joinArrays
                        ? o.joinArrays
                        : this.options.joinArrays;
                if (
                    h &&
                    "string" != typeof h &&
                    "boolean" != typeof h &&
                    "number" != typeof h &&
                    [
                        "[object Number]",
                        "[object Function]",
                        "[object RegExp]",
                    ].indexOf(v) < 0 &&
                    (!y || "[object Array]" !== v)
                ) {
                    if (!o.returnObjects && !this.options.returnObjects)
                        return (
                            this.logger.warn(
                                "accessing an object - but returnObjects options is not enabled!",
                            ),
                            this.options.returnedObjectHandler
                                ? this.options.returnedObjectHandler(d, h, o)
                                : "key '" +
                                  a +
                                  " (" +
                                  this.language +
                                  ")' returned an object instead of string."
                        );
                    if (o.keySeparator || this.options.keySeparator) {
                        var m = "[object Array]" === v ? [] : {};
                        for (var b in h)
                            if (Object.prototype.hasOwnProperty.call(h, b)) {
                                var x = "" + d + i + b;
                                (m[b] = this.translate(
                                    x,
                                    n({}, o, {
                                        joinArrays: !1,
                                        ns: l,
                                    }),
                                )),
                                    m[b] === x && (m[b] = h[b]);
                            }
                        h = m;
                    }
                } else if (y && "[object Array]" === v)
                    (h = h.join(y)) && (h = this.extendTranslation(h, e, o));
                else {
                    var k = !1;
                    var S = !1;
                    this.isValidLookup(h) ||
                        void 0 === o.defaultValue ||
                        ((k = !0), (h = o.defaultValue)),
                        this.isValidLookup(h) || ((S = !0), (h = a));
                    var w =
                        o.defaultValue &&
                        o.defaultValue !== h &&
                        this.options.updateMissing;
                    if (S || k || w) {
                        this.logger.log(
                            w ? "updateKey" : "missingKey",
                            c,
                            u,
                            a,
                            w ? o.defaultValue : h,
                        );
                        var O = [];
                        var L = this.languageUtils.getFallbackCodes(
                            this.options.fallbackLng,
                            o.lng || this.language,
                        );
                        if (
                            "fallback" === this.options.saveMissingTo &&
                            L &&
                            L[0]
                        )
                            for (var R = 0; R < L.length; R++) O.push(L[R]);
                        else
                            "all" === this.options.saveMissingTo
                                ? (O = this.languageUtils.toResolveHierarchy(
                                      o.lng || this.language,
                                  ))
                                : O.push(o.lng || this.language);
                        var j = function (t, e) {
                            r.options.missingKeyHandler
                                ? r.options.missingKeyHandler(
                                      t,
                                      u,
                                      e,
                                      w ? o.defaultValue : h,
                                      w,
                                      o,
                                  )
                                : r.backendConnector &&
                                  r.backendConnector.saveMissing &&
                                  r.backendConnector.saveMissing(
                                      t,
                                      u,
                                      e,
                                      w ? o.defaultValue : h,
                                      w,
                                      o,
                                  ),
                                r.emit("missingKey", t, u, e, h);
                        };
                        this.options.saveMissing &&
                            (this.options.saveMissingPlurals && o.count
                                ? O.forEach(function (t) {
                                      r.pluralResolver
                                          .getPluralFormsOfKey(t, a)
                                          .forEach(function (e) {
                                              return j([t], e);
                                          });
                                  })
                                : j(O, a));
                    }
                    (h = this.extendTranslation(h, e, o)),
                        S &&
                            h === a &&
                            this.options.appendNamespaceToMissingKey &&
                            (h = u + ":" + a),
                        S &&
                            this.options.parseMissingKeyHandler &&
                            (h = this.options.parseMissingKeyHandler(h));
                }
                return h;
            }),
            (s.prototype.extendTranslation = function (t, e, o) {
                var r = this;
                o.interpolation &&
                    this.interpolator.init(
                        n({}, o, {
                            interpolation: n(
                                {},
                                this.options.interpolation,
                                o.interpolation,
                            ),
                        }),
                    );
                var i =
                    o.replace && "string" != typeof o.replace ? o.replace : o;
                this.options.interpolation.defaultVariables &&
                    (i = n({}, this.options.interpolation.defaultVariables, i)),
                    (t = this.interpolator.interpolate(
                        t,
                        i,
                        o.lng || this.language,
                    )),
                    !1 !== o.nest &&
                        (t = this.interpolator.nest(
                            t,
                            function () {
                                return r.translate.apply(r, arguments);
                            },
                            o,
                        )),
                    o.interpolation && this.interpolator.reset();
                var s = o.postProcess || this.options.postProcess;
                var a = "string" == typeof s ? [s] : s;
                return (
                    null != t &&
                        a &&
                        a.length &&
                        !1 !== o.applyPostProcessor &&
                        (t = b.handle(a, t, e, o, this)),
                    t
                );
            }),
            (s.prototype.resolve = function (t) {
                var e = this;
                var n =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                var o = void 0;
                var r = void 0;
                return (
                    "string" == typeof t && (t = [t]),
                    t.forEach(function (t) {
                        if (!e.isValidLookup(o)) {
                            var i = e.extractFromKey(t, n);
                            var s = i.key;
                            r = s;
                            var a = i.namespaces;
                            e.options.fallbackNS &&
                                (a = a.concat(e.options.fallbackNS));
                            var l =
                                void 0 !== n.count &&
                                "string" != typeof n.count;
                            var u =
                                void 0 !== n.context &&
                                "string" == typeof n.context &&
                                "" !== n.context;
                            var c = n.lngs
                                ? n.lngs
                                : e.languageUtils.toResolveHierarchy(
                                      n.lng || e.language,
                                  );
                            a.forEach(function (t) {
                                e.isValidLookup(o) ||
                                    c.forEach(function (r) {
                                        if (!e.isValidLookup(o)) {
                                            var i = s;
                                            var a = [i];
                                            var c = void 0;
                                            l &&
                                                (c = e.pluralResolver.getSuffix(
                                                    r,
                                                    n.count,
                                                )),
                                                l && u && a.push(i + c),
                                                u &&
                                                    a.push(
                                                        (i +=
                                                            "" +
                                                            e.options
                                                                .contextSeparator +
                                                            n.context),
                                                    ),
                                                l && a.push((i += c));
                                            for (
                                                var p = void 0;
                                                (p = a.pop());

                                            )
                                                e.isValidLookup(o) ||
                                                    (o = e.getResource(
                                                        r,
                                                        t,
                                                        p,
                                                        n,
                                                    ));
                                        }
                                    });
                            });
                        }
                    }),
                    {
                        res: o,
                        usedKey: r,
                    }
                );
            }),
            (s.prototype.isValidLookup = function (t) {
                return !(
                    void 0 === t ||
                    (!this.options.returnNull && null === t) ||
                    (!this.options.returnEmptyString && "" === t)
                );
            }),
            (s.prototype.getResource = function (t, e, n) {
                var o =
                    arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : {};
                return this.resourceStore.getResource(t, e, n, o);
            }),
            s
        );
    })(u);

    function k(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
    }
    var S = (function () {
        function t(n) {
            e(this, t),
                (this.options = n),
                (this.whitelist = this.options.whitelist || !1),
                (this.logger = l.create("languageUtils"));
        }
        return (
            (t.prototype.getScriptPartFromCode = function (t) {
                if (!t || t.indexOf("-") < 0) return null;
                var e = t.split("-");
                return 2 === e.length
                    ? null
                    : (e.pop(), this.formatLanguageCode(e.join("-")));
            }),
            (t.prototype.getLanguagePartFromCode = function (t) {
                if (!t || t.indexOf("-") < 0) return t;
                var e = t.split("-");
                return this.formatLanguageCode(e[0]);
            }),
            (t.prototype.formatLanguageCode = function (t) {
                if ("string" == typeof t && t.indexOf("-") > -1) {
                    var e = [
                        "hans",
                        "hant",
                        "latn",
                        "cyrl",
                        "cans",
                        "mong",
                        "arab",
                    ];
                    var n = t.split("-");
                    return (
                        this.options.lowerCaseLng
                            ? (n = n.map(function (t) {
                                  return t.toLowerCase();
                              }))
                            : 2 === n.length
                              ? ((n[0] = n[0].toLowerCase()),
                                (n[1] = n[1].toUpperCase()),
                                e.indexOf(n[1].toLowerCase()) > -1 &&
                                    (n[1] = k(n[1].toLowerCase())))
                              : 3 === n.length &&
                                ((n[0] = n[0].toLowerCase()),
                                2 === n[1].length &&
                                    (n[1] = n[1].toUpperCase()),
                                "sgn" !== n[0] &&
                                    2 === n[2].length &&
                                    (n[2] = n[2].toUpperCase()),
                                e.indexOf(n[1].toLowerCase()) > -1 &&
                                    (n[1] = k(n[1].toLowerCase())),
                                e.indexOf(n[2].toLowerCase()) > -1 &&
                                    (n[2] = k(n[2].toLowerCase()))),
                        n.join("-")
                    );
                }
                return this.options.cleanCode || this.options.lowerCaseLng
                    ? t.toLowerCase()
                    : t;
            }),
            (t.prototype.isWhitelisted = function (t) {
                return (
                    ("languageOnly" === this.options.load ||
                        this.options.nonExplicitWhitelist) &&
                        (t = this.getLanguagePartFromCode(t)),
                    !this.whitelist ||
                        !this.whitelist.length ||
                        this.whitelist.indexOf(t) > -1
                );
            }),
            (t.prototype.getFallbackCodes = function (t, e) {
                if (!t) return [];
                if (
                    ("string" == typeof t && (t = [t]),
                    "[object Array]" === Object.prototype.toString.apply(t))
                )
                    return t;
                if (!e) return t.default || [];
                var n = t[e];
                return (
                    n || (n = t[this.getScriptPartFromCode(e)]),
                    n || (n = t[this.formatLanguageCode(e)]),
                    n || (n = t.default),
                    n || []
                );
            }),
            (t.prototype.toResolveHierarchy = function (t, e) {
                var n = this;
                var o = this.getFallbackCodes(
                    e || this.options.fallbackLng || [],
                    t,
                );
                var r = [];
                var i = function (t) {
                    t &&
                        (n.isWhitelisted(t)
                            ? r.push(t)
                            : n.logger.warn(
                                  "rejecting non-whitelisted language code: " +
                                      t,
                              ));
                };
                return (
                    "string" == typeof t && t.indexOf("-") > -1
                        ? ("languageOnly" !== this.options.load &&
                              i(this.formatLanguageCode(t)),
                          "languageOnly" !== this.options.load &&
                              "currentOnly" !== this.options.load &&
                              i(this.getScriptPartFromCode(t)),
                          "currentOnly" !== this.options.load &&
                              i(this.getLanguagePartFromCode(t)))
                        : "string" == typeof t && i(this.formatLanguageCode(t)),
                    o.forEach(function (t) {
                        r.indexOf(t) < 0 && i(n.formatLanguageCode(t));
                    }),
                    r
                );
            }),
            t
        );
    })();
    var w = [
        {
            lngs: [
                "ach",
                "ak",
                "am",
                "arn",
                "br",
                "fil",
                "gun",
                "ln",
                "mfe",
                "mg",
                "mi",
                "oc",
                "pt",
                "pt-BR",
                "tg",
                "ti",
                "tr",
                "uz",
                "wa",
            ],
            nr: [1, 2],
            fc: 1,
        },
        {
            lngs: [
                "af",
                "an",
                "ast",
                "az",
                "bg",
                "bn",
                "ca",
                "da",
                "de",
                "dev",
                "el",
                "en",
                "eo",
                "es",
                "et",
                "eu",
                "fi",
                "fo",
                "fur",
                "fy",
                "gl",
                "gu",
                "ha",
                "he",
                "hi",
                "hu",
                "hy",
                "ia",
                "it",
                "kn",
                "ku",
                "lb",
                "mai",
                "ml",
                "mn",
                "mr",
                "nah",
                "nap",
                "nb",
                "ne",
                "nl",
                "nn",
                "no",
                "nso",
                "pa",
                "pap",
                "pms",
                "ps",
                "pt-PT",
                "rm",
                "sco",
                "se",
                "si",
                "so",
                "son",
                "sq",
                "sv",
                "sw",
                "ta",
                "te",
                "tk",
                "ur",
                "yo",
            ],
            nr: [1, 2],
            fc: 2,
        },
        {
            lngs: [
                "ay",
                "bo",
                "cgg",
                "fa",
                "id",
                "ja",
                "jbo",
                "ka",
                "kk",
                "km",
                "ko",
                "ky",
                "lo",
                "ms",
                "sah",
                "su",
                "th",
                "tt",
                "ug",
                "vi",
                "wo",
                "zh",
            ],
            nr: [1],
            fc: 3,
        },
        {
            lngs: ["be", "bs", "dz", "hr", "ru", "sr", "uk"],
            nr: [1, 2, 5],
            fc: 4,
        },
        {
            lngs: ["ar"],
            nr: [0, 1, 2, 3, 11, 100],
            fc: 5,
        },
        {
            lngs: ["cs", "sk"],
            nr: [1, 2, 5],
            fc: 6,
        },
        {
            lngs: ["csb", "pl"],
            nr: [1, 2, 5],
            fc: 7,
        },
        {
            lngs: ["cy"],
            nr: [1, 2, 3, 8],
            fc: 8,
        },
        {
            lngs: ["fr"],
            nr: [1, 2],
            fc: 9,
        },
        {
            lngs: ["ga"],
            nr: [1, 2, 3, 7, 11],
            fc: 10,
        },
        {
            lngs: ["gd"],
            nr: [1, 2, 3, 20],
            fc: 11,
        },
        {
            lngs: ["is"],
            nr: [1, 2],
            fc: 12,
        },
        {
            lngs: ["jv"],
            nr: [0, 1],
            fc: 13,
        },
        {
            lngs: ["kw"],
            nr: [1, 2, 3, 4],
            fc: 14,
        },
        {
            lngs: ["lt"],
            nr: [1, 2, 10],
            fc: 15,
        },
        {
            lngs: ["lv"],
            nr: [1, 2, 0],
            fc: 16,
        },
        {
            lngs: ["mk"],
            nr: [1, 2],
            fc: 17,
        },
        {
            lngs: ["mnk"],
            nr: [0, 1, 2],
            fc: 18,
        },
        {
            lngs: ["mt"],
            nr: [1, 2, 11, 20],
            fc: 19,
        },
        {
            lngs: ["or"],
            nr: [2, 1],
            fc: 2,
        },
        {
            lngs: ["ro"],
            nr: [1, 2, 20],
            fc: 20,
        },
        {
            lngs: ["sl"],
            nr: [5, 1, 2, 3],
            fc: 21,
        },
    ];
    var O = {
        1: function (t) {
            return Number(t > 1);
        },
        2: function (t) {
            return Number(1 != t);
        },
        3: function (t) {
            return 0;
        },
        4: function (t) {
            return Number(
                t % 10 == 1 && t % 100 != 11
                    ? 0
                    : t % 10 >= 2 &&
                        t % 10 <= 4 &&
                        (t % 100 < 10 || t % 100 >= 20)
                      ? 1
                      : 2,
            );
        },
        5: function (t) {
            return Number(
                0 === t
                    ? 0
                    : 1 == t
                      ? 1
                      : 2 == t
                        ? 2
                        : t % 100 >= 3 && t % 100 <= 10
                          ? 3
                          : t % 100 >= 11
                            ? 4
                            : 5,
            );
        },
        6: function (t) {
            return Number(1 == t ? 0 : t >= 2 && t <= 4 ? 1 : 2);
        },
        7: function (t) {
            return Number(
                1 == t
                    ? 0
                    : t % 10 >= 2 &&
                        t % 10 <= 4 &&
                        (t % 100 < 10 || t % 100 >= 20)
                      ? 1
                      : 2,
            );
        },
        8: function (t) {
            return Number(1 == t ? 0 : 2 == t ? 1 : 8 != t && 11 != t ? 2 : 3);
        },
        9: function (t) {
            return Number(t >= 2);
        },
        10: function (t) {
            return Number(1 == t ? 0 : 2 == t ? 1 : t < 7 ? 2 : t < 11 ? 3 : 4);
        },
        11: function (t) {
            return Number(
                1 == t || 11 == t
                    ? 0
                    : 2 == t || 12 == t
                      ? 1
                      : t > 2 && t < 20
                        ? 2
                        : 3,
            );
        },
        12: function (t) {
            return Number(t % 10 != 1 || t % 100 == 11);
        },
        13: function (t) {
            return Number(0 !== t);
        },
        14: function (t) {
            return Number(1 == t ? 0 : 2 == t ? 1 : 3 == t ? 2 : 3);
        },
        15: function (t) {
            return Number(
                t % 10 == 1 && t % 100 != 11
                    ? 0
                    : t % 10 >= 2 && (t % 100 < 10 || t % 100 >= 20)
                      ? 1
                      : 2,
            );
        },
        16: function (t) {
            return Number(t % 10 == 1 && t % 100 != 11 ? 0 : 0 !== t ? 1 : 2);
        },
        17: function (t) {
            return Number(1 == t || t % 10 == 1 ? 0 : 1);
        },
        18: function (t) {
            return Number(0 == t ? 0 : 1 == t ? 1 : 2);
        },
        19: function (t) {
            return Number(
                1 == t
                    ? 0
                    : 0 === t || (t % 100 > 1 && t % 100 < 11)
                      ? 1
                      : t % 100 > 10 && t % 100 < 20
                        ? 2
                        : 3,
            );
        },
        20: function (t) {
            return Number(
                1 == t ? 0 : 0 === t || (t % 100 > 0 && t % 100 < 20) ? 1 : 2,
            );
        },
        21: function (t) {
            return Number(
                t % 100 == 1
                    ? 1
                    : t % 100 == 2
                      ? 2
                      : t % 100 == 3 || t % 100 == 4
                        ? 3
                        : 0,
            );
        },
    };
    var L = (function () {
        function t(n) {
            var o;
            var r =
                arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
            e(this, t),
                (this.languageUtils = n),
                (this.options = r),
                (this.logger = l.create("pluralResolver")),
                (this.rules =
                    ((o = {}),
                    w.forEach(function (t) {
                        t.lngs.forEach(function (e) {
                            o[e] = {
                                numbers: t.nr,
                                plurals: O[t.fc],
                            };
                        });
                    }),
                    o));
        }
        return (
            (t.prototype.addRule = function (t, e) {
                this.rules[t] = e;
            }),
            (t.prototype.getRule = function (t) {
                return (
                    this.rules[t] ||
                    this.rules[this.languageUtils.getLanguagePartFromCode(t)]
                );
            }),
            (t.prototype.needsPlural = function (t) {
                var e = this.getRule(t);
                return e && e.numbers.length > 1;
            }),
            (t.prototype.getPluralFormsOfKey = function (t, e) {
                var n = this;
                var o = [];
                return (
                    this.getRule(t).numbers.forEach(function (r) {
                        var i = n.getSuffix(t, r);
                        o.push("" + e + i);
                    }),
                    o
                );
            }),
            (t.prototype.getSuffix = function (t, e) {
                var n = this;
                var o = this.getRule(t);
                if (o) {
                    var r = o.noAbs ? o.plurals(e) : o.plurals(Math.abs(e));
                    var i = o.numbers[r];
                    this.options.simplifyPluralSuffix &&
                        2 === o.numbers.length &&
                        1 === o.numbers[0] &&
                        (2 === i ? (i = "plural") : 1 === i && (i = ""));
                    var s = function () {
                        return n.options.prepend && i.toString()
                            ? n.options.prepend + i.toString()
                            : i.toString();
                    };
                    return "v1" === this.options.compatibilityJSON
                        ? 1 === i
                            ? ""
                            : "number" == typeof i
                              ? "_plural_" + i.toString()
                              : s()
                        : "v2" === this.options.compatibilityJSON ||
                            (2 === o.numbers.length && 1 === o.numbers[0]) ||
                            (2 === o.numbers.length && 1 === o.numbers[0])
                          ? s()
                          : this.options.prepend && r.toString()
                            ? this.options.prepend + r.toString()
                            : r.toString();
                }
                return this.logger.warn("no plural rule found for: " + t), "";
            }),
            t
        );
    })();
    var R = (function () {
        function t() {
            var n =
                arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
            e(this, t),
                (this.logger = l.create("interpolator")),
                this.init(n, !0);
        }
        return (
            (t.prototype.init = function () {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {};
                arguments[1] &&
                    ((this.options = t),
                    (this.format =
                        (t.interpolation && t.interpolation.format) ||
                        function (t) {
                            return t;
                        }),
                    (this.escape =
                        (t.interpolation && t.interpolation.escape) || y)),
                    t.interpolation ||
                        (t.interpolation = {
                            escapeValue: !0,
                        });
                var e = t.interpolation;
                (this.escapeValue = void 0 === e.escapeValue || e.escapeValue),
                    (this.prefix = e.prefix
                        ? d(e.prefix)
                        : e.prefixEscaped || "{{"),
                    (this.suffix = e.suffix
                        ? d(e.suffix)
                        : e.suffixEscaped || "}}"),
                    (this.formatSeparator = e.formatSeparator
                        ? e.formatSeparator
                        : e.formatSeparator || ","),
                    (this.unescapePrefix = e.unescapeSuffix
                        ? ""
                        : e.unescapePrefix || "-"),
                    (this.unescapeSuffix = this.unescapePrefix
                        ? ""
                        : e.unescapeSuffix || ""),
                    (this.nestingPrefix = e.nestingPrefix
                        ? d(e.nestingPrefix)
                        : e.nestingPrefixEscaped || d("$t(")),
                    (this.nestingSuffix = e.nestingSuffix
                        ? d(e.nestingSuffix)
                        : e.nestingSuffixEscaped || d(")")),
                    (this.maxReplaces = e.maxReplaces ? e.maxReplaces : 1e3),
                    this.resetRegExp();
            }),
            (t.prototype.reset = function () {
                this.options && this.init(this.options);
            }),
            (t.prototype.resetRegExp = function () {
                var t = this.prefix + "(.+?)" + this.suffix;
                this.regexp = new RegExp(t, "g");
                var e =
                    "" +
                    this.prefix +
                    this.unescapePrefix +
                    "(.+?)" +
                    this.unescapeSuffix +
                    this.suffix;
                this.regexpUnescape = new RegExp(e, "g");
                var n = this.nestingPrefix + "(.+?)" + this.nestingSuffix;
                this.nestingRegexp = new RegExp(n, "g");
            }),
            (t.prototype.interpolate = function (t, e, n) {
                var o = this;
                var r = void 0;
                var i = void 0;
                var s = void 0;

                function a(t) {
                    return t.replace(/\$/g, "$$$$");
                }
                var l = function (t) {
                    if (t.indexOf(o.formatSeparator) < 0) return g(e, t);
                    var r = t.split(o.formatSeparator);
                    var i = r.shift().trim();
                    var s = r.join(o.formatSeparator).trim();
                    return o.format(g(e, i), s, n);
                };
                for (
                    this.resetRegExp(), s = 0;
                    (r = this.regexpUnescape.exec(t)) &&
                    ((i = l(r[1].trim())),
                    (t = t.replace(r[0], i)),
                    (this.regexpUnescape.lastIndex = 0),
                    !(++s >= this.maxReplaces));

                );
                for (
                    s = 0;
                    (r = this.regexp.exec(t)) &&
                    ("string" != typeof (i = l(r[1].trim())) && (i = c(i)),
                    i ||
                        (this.logger.warn(
                            "missed to pass in variable " +
                                r[1] +
                                " for interpolating " +
                                t,
                        ),
                        (i = "")),
                    (i = this.escapeValue ? a(this.escape(i)) : a(i)),
                    (t = t.replace(r[0], i)),
                    (this.regexp.lastIndex = 0),
                    !(++s >= this.maxReplaces));

                );
                return t;
            }),
            (t.prototype.nest = function (t, e) {
                var o = void 0;
                var r = void 0;
                var i = n(
                    {},
                    arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {},
                );

                function s(t, e) {
                    if (t.indexOf(",") < 0) return t;
                    var o = t.split(",");
                    t = o.shift();
                    var r = o.join(",");
                    r = (r = this.interpolate(r, i)).replace(/'/g, '"');
                    try {
                        (i = JSON.parse(r)), e && (i = n({}, e, i));
                    } catch (e) {
                        this.logger.error(
                            "failed parsing options string in nesting for key " +
                                t,
                            e,
                        );
                    }
                    return t;
                }
                for (
                    i.applyPostProcessor = !1;
                    (o = this.nestingRegexp.exec(t));

                ) {
                    if (
                        (r = e(s.call(this, o[1].trim(), i), i)) &&
                        o[0] === t &&
                        "string" != typeof r
                    )
                        return r;
                    "string" != typeof r && (r = c(r)),
                        r ||
                            (this.logger.warn(
                                "missed to resolve " +
                                    o[1] +
                                    " for nesting " +
                                    t,
                            ),
                            (r = "")),
                        (t = t.replace(o[0], r)),
                        (this.regexp.lastIndex = 0);
                }
                return t;
            }),
            t
        );
    })();
    var j = (function (t) {
        function s(n, o, i) {
            var a =
                arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {};
            e(this, s);
            var u = r(this, t.call(this));
            return (
                (u.backend = n),
                (u.store = o),
                (u.languageUtils = i.languageUtils),
                (u.options = a),
                (u.logger = l.create("backendConnector")),
                (u.state = {}),
                (u.queue = []),
                u.backend && u.backend.init && u.backend.init(i, a.backend, a),
                u
            );
        }
        return (
            o(s, t),
            (s.prototype.queueLoad = function (t, e, n) {
                var o = this;
                var r = [];
                var i = [];
                var s = [];
                var a = [];
                return (
                    t.forEach(function (t) {
                        var n = !0;
                        e.forEach(function (e) {
                            var s = t + "|" + e;
                            o.store.hasResourceBundle(t, e)
                                ? (o.state[s] = 2)
                                : o.state[s] < 0 ||
                                  (1 === o.state[s]
                                      ? i.indexOf(s) < 0 && i.push(s)
                                      : ((o.state[s] = 1),
                                        (n = !1),
                                        i.indexOf(s) < 0 && i.push(s),
                                        r.indexOf(s) < 0 && r.push(s),
                                        a.indexOf(e) < 0 && a.push(e)));
                        }),
                            n || s.push(t);
                    }),
                    (r.length || i.length) &&
                        this.queue.push({
                            pending: i,
                            loaded: {},
                            errors: [],
                            callback: n,
                        }),
                    {
                        toLoad: r,
                        pending: i,
                        toLoadLanguages: s,
                        toLoadNamespaces: a,
                    }
                );
            }),
            (s.prototype.loaded = function (t, e, n) {
                var o = this;
                var r = t.split("|");
                var s = i(r, 2);
                var a = s[0];
                var l = s[1];
                e && this.emit("failedLoading", a, l, e),
                    n && this.store.addResourceBundle(a, l, n),
                    (this.state[t] = e ? -1 : 2),
                    this.queue.forEach(function (n) {
                        var r;
                        var i;
                        var s;
                        var u;
                        var c;
                        var f;
                        (r = n.loaded),
                            (i = l),
                            (u = p(r, [a], Object)),
                            (c = u.obj),
                            (f = u.k),
                            (c[f] = c[f] || []),
                            s && (c[f] = c[f].concat(i)),
                            s || c[f].push(i),
                            (function (t, e) {
                                for (var n = t.indexOf(e); -1 !== n; )
                                    t.splice(n, 1), (n = t.indexOf(e));
                            })(n.pending, t),
                            e && n.errors.push(e),
                            0 !== n.pending.length ||
                                n.done ||
                                (o.emit("loaded", n.loaded),
                                (n.done = !0),
                                n.errors.length
                                    ? n.callback(n.errors)
                                    : n.callback());
                    }),
                    (this.queue = this.queue.filter(function (t) {
                        return !t.done;
                    }));
            }),
            (s.prototype.read = function (t, e, n) {
                var o =
                    arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : 0;
                var r = this;
                var i =
                    arguments.length > 4 && void 0 !== arguments[4]
                        ? arguments[4]
                        : 250;
                var s = arguments[5];
                return t.length
                    ? this.backend[n](t, e, function (a, l) {
                          a && l && o < 5
                              ? setTimeout(function () {
                                    r.read.call(r, t, e, n, o + 1, 2 * i, s);
                                }, i)
                              : s(a, l);
                      })
                    : s(null, {});
            }),
            (s.prototype.load = function (t, e, o) {
                var r = this;
                if (!this.backend)
                    return (
                        this.logger.warn(
                            "No backend was added via i18next.use. Will not load resources.",
                        ),
                        o && o()
                    );
                var s = n({}, this.backend.options, this.options.backend);
                "string" == typeof t &&
                    (t = this.languageUtils.toResolveHierarchy(t)),
                    "string" == typeof e && (e = [e]);
                var a = this.queueLoad(t, e, o);
                if (!a.toLoad.length) return a.pending.length || o(), null;
                s.allowMultiLoading && this.backend.readMulti
                    ? this.read(
                          a.toLoadLanguages,
                          a.toLoadNamespaces,
                          "readMulti",
                          null,
                          null,
                          function (t, e) {
                              t &&
                                  r.logger.warn(
                                      "loading namespaces " +
                                          a.toLoadNamespaces.join(", ") +
                                          " for languages " +
                                          a.toLoadLanguages.join(", ") +
                                          " via multiloading failed",
                                      t,
                                  ),
                                  !t &&
                                      e &&
                                      r.logger.log(
                                          "successfully loaded namespaces " +
                                              a.toLoadNamespaces.join(", ") +
                                              " for languages " +
                                              a.toLoadLanguages.join(", ") +
                                              " via multiloading",
                                          e,
                                      ),
                                  a.toLoad.forEach(function (n) {
                                      var o = n.split("|");
                                      var s = i(o, 2);
                                      var a = s[0];
                                      var l = s[1];
                                      var u = g(e, [a, l]);
                                      if (u) r.loaded(n, t, u);
                                      else {
                                          var c =
                                              "loading namespace " +
                                              l +
                                              " for language " +
                                              a +
                                              " via multiloading failed";
                                          r.loaded(n, c), r.logger.error(c);
                                      }
                                  });
                          },
                      )
                    : a.toLoad.forEach(function (t) {
                          r.loadOne(t);
                      });
            }),
            (s.prototype.reload = function (t, e) {
                var o = this;
                this.backend ||
                    this.logger.warn(
                        "No backend was added via i18next.use. Will not load resources.",
                    );
                var r = n({}, this.backend.options, this.options.backend);
                "string" == typeof t &&
                    (t = this.languageUtils.toResolveHierarchy(t)),
                    "string" == typeof e && (e = [e]),
                    r.allowMultiLoading && this.backend.readMulti
                        ? this.read(
                              t,
                              e,
                              "readMulti",
                              null,
                              null,
                              function (n, r) {
                                  n &&
                                      o.logger.warn(
                                          "reloading namespaces " +
                                              e.join(", ") +
                                              " for languages " +
                                              t.join(", ") +
                                              " via multiloading failed",
                                          n,
                                      ),
                                      !n &&
                                          r &&
                                          o.logger.log(
                                              "successfully reloaded namespaces " +
                                                  e.join(", ") +
                                                  " for languages " +
                                                  t.join(", ") +
                                                  " via multiloading",
                                              r,
                                          ),
                                      t.forEach(function (t) {
                                          e.forEach(function (e) {
                                              var i = g(r, [t, e]);
                                              if (i)
                                                  o.loaded(t + "|" + e, n, i);
                                              else {
                                                  var s =
                                                      "reloading namespace " +
                                                      e +
                                                      " for language " +
                                                      t +
                                                      " via multiloading failed";
                                                  o.loaded(t + "|" + e, s),
                                                      o.logger.error(s);
                                              }
                                          });
                                      });
                              },
                          )
                        : t.forEach(function (t) {
                              e.forEach(function (e) {
                                  o.loadOne(t + "|" + e, "re");
                              });
                          });
            }),
            (s.prototype.loadOne = function (t) {
                var e = this;
                var n =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : "";
                var o = t.split("|");
                var r = i(o, 2);
                var s = r[0];
                var a = r[1];
                this.read(s, a, "read", null, null, function (o, r) {
                    o &&
                        e.logger.warn(
                            n +
                                "loading namespace " +
                                a +
                                " for language " +
                                s +
                                " failed",
                            o,
                        ),
                        !o &&
                            r &&
                            e.logger.log(
                                n +
                                    "loaded namespace " +
                                    a +
                                    " for language " +
                                    s,
                                r,
                            ),
                        e.loaded(t, o, r);
                });
            }),
            (s.prototype.saveMissing = function (t, e, o, r, i) {
                var s =
                    arguments.length > 5 && void 0 !== arguments[5]
                        ? arguments[5]
                        : {};
                this.backend &&
                    this.backend.create &&
                    this.backend.create(
                        t,
                        e,
                        o,
                        r,
                        null,
                        n({}, s, {
                            isUpdate: i,
                        }),
                    ),
                    t && t[0] && this.store.addResource(t[0], e, o, r);
            }),
            s
        );
    })(u);
    var C = (function (t) {
        function i(n, o, s) {
            var a =
                arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {};
            e(this, i);
            var u = r(this, t.call(this));
            return (
                (u.cache = n),
                (u.store = o),
                (u.services = s),
                (u.options = a),
                (u.logger = l.create("cacheConnector")),
                u.cache && u.cache.init && u.cache.init(s, a.cache, a),
                u
            );
        }
        return (
            o(i, t),
            (i.prototype.load = function (t, e, o) {
                var r = this;
                if (!this.cache) return o && o();
                var i = n({}, this.cache.options, this.options.cache);
                var s =
                    "string" == typeof t
                        ? this.services.languageUtils.toResolveHierarchy(t)
                        : t;
                i.enabled
                    ? this.cache.load(s, function (t, e) {
                          if (
                              (t &&
                                  r.logger.error(
                                      "loading languages " +
                                          s.join(", ") +
                                          " from cache failed",
                                      t,
                                  ),
                              e)
                          )
                              for (var n in e)
                                  if (
                                      Object.prototype.hasOwnProperty.call(e, n)
                                  )
                                      for (var i in e[n])
                                          if (
                                              Object.prototype.hasOwnProperty.call(
                                                  e[n],
                                                  i,
                                              ) &&
                                              "i18nStamp" !== i
                                          ) {
                                              var a = e[n][i];
                                              a &&
                                                  r.store.addResourceBundle(
                                                      n,
                                                      i,
                                                      a,
                                                  );
                                          }
                          o && o();
                      })
                    : o && o();
            }),
            (i.prototype.save = function () {
                this.cache &&
                    this.options.cache &&
                    this.options.cache.enabled &&
                    this.cache.save(this.store.data);
            }),
            i
        );
    })(u);

    function N(t) {
        return (
            "string" == typeof t.ns && (t.ns = [t.ns]),
            "string" == typeof t.fallbackLng &&
                (t.fallbackLng = [t.fallbackLng]),
            "string" == typeof t.fallbackNS && (t.fallbackNS = [t.fallbackNS]),
            t.whitelist &&
                t.whitelist.indexOf("cimode") < 0 &&
                t.whitelist.push("cimode"),
            t
        );
    }

    function E() {}
    var P = (function (i) {
        function s() {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
            var n = arguments[1];
            e(this, s);
            var o = r(this, i.call(this));
            if (
                ((o.options = N(t)),
                (o.services = {}),
                (o.logger = l),
                (o.modules = {
                    external: [],
                }),
                n && !o.isInitialized && !t.isClone)
            ) {
                var a;
                if (!o.options.initImmediate)
                    return (a = o.init(t, n)), r(o, a);
                setTimeout(function () {
                    o.init(t, n);
                }, 0);
            }
            return o;
        }
        return (
            o(s, i),
            (s.prototype.init = function () {
                var t = this;
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {};
                var o = arguments[1];

                function r(t) {
                    return t ? ("function" == typeof t ? new t() : t) : null;
                }
                if (
                    ("function" == typeof e && ((o = e), (e = {})),
                    (this.options = n(
                        {},
                        {
                            debug: !1,
                            initImmediate: !0,
                            ns: ["translation"],
                            defaultNS: ["translation"],
                            fallbackLng: ["dev"],
                            fallbackNS: !1,
                            whitelist: !1,
                            nonExplicitWhitelist: !1,
                            load: "all",
                            preload: !1,
                            simplifyPluralSuffix: !0,
                            keySeparator: ".",
                            nsSeparator: ":",
                            pluralSeparator: "_",
                            contextSeparator: "_",
                            saveMissing: !1,
                            updateMissing: !1,
                            saveMissingTo: "fallback",
                            saveMissingPlurals: !0,
                            missingKeyHandler: !1,
                            postProcess: !1,
                            returnNull: !0,
                            returnEmptyString: !0,
                            returnObjects: !1,
                            joinArrays: !1,
                            returnedObjectHandler: function () {},
                            parseMissingKeyHandler: !1,
                            appendNamespaceToMissingKey: !1,
                            appendNamespaceToCIMode: !1,
                            overloadTranslationOptionHandler: function (t) {
                                var e = {};
                                return (
                                    t[1] && (e.defaultValue = t[1]),
                                    t[2] && (e.tDescription = t[2]),
                                    e
                                );
                            },
                            interpolation: {
                                escapeValue: !0,
                                format: function (t, e, n) {
                                    return t;
                                },
                                prefix: "{{",
                                suffix: "}}",
                                formatSeparator: ",",
                                unescapePrefix: "-",
                                nestingPrefix: "$t(",
                                nestingSuffix: ")",
                                maxReplaces: 1e3,
                            },
                        },
                        this.options,
                        N(e),
                    )),
                    (this.format = this.options.interpolation.format),
                    o || (o = E),
                    !this.options.isClone)
                ) {
                    this.modules.logger
                        ? l.init(r(this.modules.logger), this.options)
                        : l.init(null, this.options);
                    var i = new S(this.options);
                    this.store = new m(this.options.resources, this.options);
                    var s = this.services;
                    (s.logger = l),
                        (s.resourceStore = this.store),
                        s.resourceStore.on("added removed", function (t, e) {
                            s.cacheConnector.save();
                        }),
                        (s.languageUtils = i),
                        (s.pluralResolver = new L(i, {
                            prepend: this.options.pluralSeparator,
                            compatibilityJSON: this.options.compatibilityJSON,
                            simplifyPluralSuffix:
                                this.options.simplifyPluralSuffix,
                        })),
                        (s.interpolator = new R(this.options)),
                        (s.backendConnector = new j(
                            r(this.modules.backend),
                            s.resourceStore,
                            s,
                            this.options,
                        )),
                        s.backendConnector.on("*", function (e) {
                            for (
                                var n = arguments.length,
                                    o = Array(n > 1 ? n - 1 : 0),
                                    r = 1;
                                r < n;
                                r++
                            )
                                o[r - 1] = arguments[r];
                            t.emit.apply(t, [e].concat(o));
                        }),
                        s.backendConnector.on("loaded", function (t) {
                            s.cacheConnector.save();
                        }),
                        (s.cacheConnector = new C(
                            r(this.modules.cache),
                            s.resourceStore,
                            s,
                            this.options,
                        )),
                        s.cacheConnector.on("*", function (e) {
                            for (
                                var n = arguments.length,
                                    o = Array(n > 1 ? n - 1 : 0),
                                    r = 1;
                                r < n;
                                r++
                            )
                                o[r - 1] = arguments[r];
                            t.emit.apply(t, [e].concat(o));
                        }),
                        this.modules.languageDetector &&
                            ((s.languageDetector = r(
                                this.modules.languageDetector,
                            )),
                            s.languageDetector.init(
                                s,
                                this.options.detection,
                                this.options,
                            )),
                        (this.translator = new x(this.services, this.options)),
                        this.translator.on("*", function (e) {
                            for (
                                var n = arguments.length,
                                    o = Array(n > 1 ? n - 1 : 0),
                                    r = 1;
                                r < n;
                                r++
                            )
                                o[r - 1] = arguments[r];
                            t.emit.apply(t, [e].concat(o));
                        }),
                        this.modules.external.forEach(function (e) {
                            e.init && e.init(t);
                        });
                }
                [
                    "getResource",
                    "addResource",
                    "addResources",
                    "addResourceBundle",
                    "removeResourceBundle",
                    "hasResourceBundle",
                    "getResourceBundle",
                ].forEach(function (e) {
                    t[e] = function () {
                        var n;
                        return (n = t.store)[e].apply(n, arguments);
                    };
                });
                var a = function () {
                    t.changeLanguage(t.options.lng, function (e, n) {
                        (t.isInitialized = !0),
                            t.logger.log("initialized", t.options),
                            t.emit("initialized", t.options),
                            o(e, n);
                    });
                };
                return (
                    this.options.resources || !this.options.initImmediate
                        ? a()
                        : setTimeout(a, 0),
                    this
                );
            }),
            (s.prototype.loadResources = function () {
                var t = this;
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : E;
                if (this.options.resources) e(null);
                else {
                    if (
                        this.language &&
                        "cimode" === this.language.toLowerCase()
                    )
                        return e();
                    var n = [];
                    var o = function (e) {
                        e &&
                            t.services.languageUtils
                                .toResolveHierarchy(e)
                                .forEach(function (t) {
                                    n.indexOf(t) < 0 && n.push(t);
                                });
                    };
                    if (this.language) o(this.language);
                    else
                        this.services.languageUtils
                            .getFallbackCodes(this.options.fallbackLng)
                            .forEach(function (t) {
                                return o(t);
                            });
                    this.options.preload &&
                        this.options.preload.forEach(function (t) {
                            return o(t);
                        }),
                        this.services.cacheConnector.load(
                            n,
                            this.options.ns,
                            function () {
                                t.services.backendConnector.load(
                                    n,
                                    t.options.ns,
                                    e,
                                );
                            },
                        );
                }
            }),
            (s.prototype.reloadResources = function (t, e) {
                t || (t = this.languages),
                    e || (e = this.options.ns),
                    this.services.backendConnector.reload(t, e);
            }),
            (s.prototype.use = function (t) {
                return (
                    "backend" === t.type && (this.modules.backend = t),
                    "cache" === t.type && (this.modules.cache = t),
                    ("logger" === t.type || (t.log && t.warn && t.error)) &&
                        (this.modules.logger = t),
                    "languageDetector" === t.type &&
                        (this.modules.languageDetector = t),
                    "postProcessor" === t.type && b.addPostProcessor(t),
                    "3rdParty" === t.type && this.modules.external.push(t),
                    this
                );
            }),
            (s.prototype.changeLanguage = function (t, e) {
                var n = this;
                var o = function (t) {
                    t &&
                        ((n.language = t),
                        (n.languages =
                            n.services.languageUtils.toResolveHierarchy(t)),
                        n.translator.language || n.translator.changeLanguage(t),
                        n.services.languageDetector &&
                            n.services.languageDetector.cacheUserLanguage(t)),
                        n.loadResources(function (o) {
                            !(function (t, o) {
                                n.translator.changeLanguage(o),
                                    o &&
                                        (n.emit("languageChanged", o),
                                        n.logger.log("languageChanged", o)),
                                    e &&
                                        e(t, function () {
                                            return n.t.apply(n, arguments);
                                        });
                            })(o, t);
                        });
                };
                t ||
                !this.services.languageDetector ||
                this.services.languageDetector.async
                    ? !t &&
                      this.services.languageDetector &&
                      this.services.languageDetector.async
                        ? this.services.languageDetector.detect(o)
                        : o(t)
                    : o(this.services.languageDetector.detect());
            }),
            (s.prototype.getFixedT = function (e, o) {
                var r = this;
                var i = function e(o, i) {
                    for (
                        var s = arguments.length,
                            a = Array(s > 2 ? s - 2 : 0),
                            l = 2;
                        l < s;
                        l++
                    )
                        a[l - 2] = arguments[l];
                    var u = n({}, i);
                    return (
                        "object" !== (void 0 === i ? "undefined" : t(i)) &&
                            (u = r.options.overloadTranslationOptionHandler(
                                [o, i].concat(a),
                            )),
                        (u.lng = u.lng || e.lng),
                        (u.lngs = u.lngs || e.lngs),
                        (u.ns = u.ns || e.ns),
                        r.t(o, u)
                    );
                };
                return (
                    "string" == typeof e ? (i.lng = e) : (i.lngs = e),
                    (i.ns = o),
                    i
                );
            }),
            (s.prototype.t = function () {
                var t;
                return (
                    this.translator &&
                    (t = this.translator).translate.apply(t, arguments)
                );
            }),
            (s.prototype.exists = function () {
                var t;
                return (
                    this.translator &&
                    (t = this.translator).exists.apply(t, arguments)
                );
            }),
            (s.prototype.setDefaultNamespace = function (t) {
                this.options.defaultNS = t;
            }),
            (s.prototype.loadNamespaces = function (t, e) {
                var n = this;
                if (!this.options.ns) return e && e();
                "string" == typeof t && (t = [t]),
                    t.forEach(function (t) {
                        n.options.ns.indexOf(t) < 0 && n.options.ns.push(t);
                    }),
                    this.loadResources(e);
            }),
            (s.prototype.loadLanguages = function (t, e) {
                "string" == typeof t && (t = [t]);
                var n = this.options.preload || [];
                var o = t.filter(function (t) {
                    return n.indexOf(t) < 0;
                });
                if (!o.length) return e();
                (this.options.preload = n.concat(o)), this.loadResources(e);
            }),
            (s.prototype.dir = function (t) {
                if (
                    (t ||
                        (t =
                            this.languages && this.languages.length > 0
                                ? this.languages[0]
                                : this.language),
                    !t)
                )
                    return "rtl";
                return [
                    "ar",
                    "shu",
                    "sqr",
                    "ssh",
                    "xaa",
                    "yhd",
                    "yud",
                    "aao",
                    "abh",
                    "abv",
                    "acm",
                    "acq",
                    "acw",
                    "acx",
                    "acy",
                    "adf",
                    "ads",
                    "aeb",
                    "aec",
                    "afb",
                    "ajp",
                    "apc",
                    "apd",
                    "arb",
                    "arq",
                    "ars",
                    "ary",
                    "arz",
                    "auz",
                    "avl",
                    "ayh",
                    "ayl",
                    "ayn",
                    "ayp",
                    "bbz",
                    "pga",
                    "he",
                    "iw",
                    "ps",
                    "pbt",
                    "pbu",
                    "pst",
                    "prp",
                    "prd",
                    "ur",
                    "ydd",
                    "yds",
                    "yih",
                    "ji",
                    "yi",
                    "hbo",
                    "men",
                    "xmn",
                    "fa",
                    "jpr",
                    "peo",
                    "pes",
                    "prs",
                    "dv",
                    "sam",
                ].indexOf(
                    this.services.languageUtils.getLanguagePartFromCode(t),
                ) >= 0
                    ? "rtl"
                    : "ltr";
            }),
            (s.prototype.createInstance = function () {
                return new s(
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    arguments[1],
                );
            }),
            (s.prototype.cloneInstance = function () {
                var t = this;
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {};
                var o =
                    arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : E;
                var r = n({}, this.options, e, {
                    isClone: !0,
                });
                var i = new s(r);
                return (
                    ["store", "services", "language"].forEach(function (e) {
                        i[e] = t[e];
                    }),
                    (i.translator = new x(i.services, i.options)),
                    i.translator.on("*", function (t) {
                        for (
                            var e = arguments.length,
                                n = Array(e > 1 ? e - 1 : 0),
                                o = 1;
                            o < e;
                            o++
                        )
                            n[o - 1] = arguments[o];
                        i.emit.apply(i, [t].concat(n));
                    }),
                    i.init(r, o),
                    (i.translator.options = i.options),
                    i
                );
            }),
            s
        );
    })(u);
    return new P();
});
