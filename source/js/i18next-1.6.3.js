// i18next, v1.6.3
// Copyright (c)2013 Jan Mühlemann (jamuhl).
// Distributed under MIT license
// http://i18next.com
!(function () {
    Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (n) {
            "use strict";
            if (null == this) throw new TypeError();
            var e = Object(this);
            var r = e.length >>> 0;
            if (0 === r) return -1;
            var t = 0;
            if (
                (arguments.length > 0 &&
                    ((t = Number(arguments[1])) != t
                        ? (t = 0)
                        : 0 != t &&
                          t != 1 / 0 &&
                          t != -1 / 0 &&
                          (t = (t > 0 || -1) * Math.floor(Math.abs(t)))),
                t >= r)
            )
                return -1;
            for (var u = t >= 0 ? t : Math.max(r - Math.abs(t), 0); u < r; u++)
                if (u in e && e[u] === n) return u;
            return -1;
        }),
        Array.prototype.lastIndexOf ||
            (Array.prototype.lastIndexOf = function (n) {
                "use strict";
                if (null == this) throw new TypeError();
                var e = Object(this);
                var r = e.length >>> 0;
                if (0 === r) return -1;
                var t = r;
                arguments.length > 1 &&
                    ((t = Number(arguments[1])) != t
                        ? (t = 0)
                        : 0 != t &&
                          t != 1 / 0 &&
                          t != -1 / 0 &&
                          (t = (t > 0 || -1) * Math.floor(Math.abs(t))));
                for (
                    var u = t >= 0 ? Math.min(t, r - 1) : r - Math.abs(t);
                    u >= 0;
                    u--
                )
                    if (u in e && e[u] === n) return u;
                return -1;
            });
    var n;
    var e = this;
    var r = e.jQuery || e.Zepto;
    var t = {};
    var u = {};
    var a = 0;
    var s = [];
    "undefined" != typeof module && module.exports
        ? (module.exports = t)
        : (r && (r.i18n = r.i18n || t), (e.i18n = e.i18n || t));
    var o = {
        lng: void 0,
        load: "all",
        preload: [],
        lowerCaseLng: !1,
        returnObjectTrees: !1,
        fallbackLng: "dev",
        fallbackNS: [],
        detectLngQS: "setLng",
        ns: "translation",
        fallbackOnNull: !0,
        fallbackToDefaultNS: !1,
        nsseparator: ":",
        keyseparator: ".",
        selectorAttr: "data-i18n",
        debug: !1,
        resGetPath: "locales/__lng__/__ns__.json",
        resPostPath: "locales/add/__lng__/__ns__",
        getAsync: !0,
        postAsync: !0,
        resStore: void 0,
        useLocalStorage: !1,
        localStorageExpirationTime: 6048e5,
        dynamicLoad: !1,
        sendMissing: !1,
        sendMissingTo: "fallback",
        sendType: "POST",
        interpolationPrefix: "__",
        interpolationSuffix: "__",
        reusePrefix: "$t(",
        reuseSuffix: ")",
        pluralSuffix: "_plural",
        pluralNotFound: ["plural_not_found", Math.random()].join(""),
        contextNotFound: ["context_not_found", Math.random()].join(""),
        escapeInterpolation: !1,
        setJqueryExt: !0,
        defaultValueFromContent: !0,
        useDataAttrOptions: !1,
        cookieExpirationTime: void 0,
        useCookie: !0,
        cookieName: "i18next",
        postProcess: void 0,
        parseMissingKey: void 0,
    };
    var i = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
    };
    var l = {
        create: function (n, e, r) {
            var t;
            if (r) {
                var u = new Date();
                u.setTime(u.getTime() + 60 * r * 1e3),
                    (t = "; expires=" + u.toGMTString());
            } else t = "";
            document.cookie = n + "=" + e + t + "; path=/";
        },
        read: function (n) {
            for (
                var e = n + "=", r = document.cookie.split(";"), t = 0;
                t < r.length;
                t++
            ) {
                for (var u = r[t]; " " == u.charAt(0); )
                    u = u.substring(1, u.length);
                if (0 === u.indexOf(e)) return u.substring(e.length, u.length);
            }
            return null;
        },
        remove: function (n) {
            this.create(n, "", -1);
        },
    };
    var c = {
        extend: r
            ? r.extend
            : function (n, e) {
                  if (!e || "function" == typeof e) return n;
                  for (var r in e) n[r] = e[r];
                  return n;
              },
        each: r
            ? r.each
            : function (n, e, r) {
                  var t;
                  var u = 0;
                  var a = n.length;
                  var s = void 0 === a || "function" == typeof n;
                  if (r)
                      if (s) {
                          for (t in n) if (!1 === e.apply(n[t], r)) break;
                      } else for (; u < a && !1 !== e.apply(n[u++], r); );
                  else if (s) {
                      for (t in n) if (!1 === e.call(n[t], t, n[t])) break;
                  } else for (; u < a && !1 !== e.call(n[u], u, n[u++]); );
                  return n;
              },
        ajax: r
            ? r.ajax
            : function (n) {
                  var e = function (n) {
                      var e =
                          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                      n = (function (n) {
                          n = n.replace(/\r\n/g, "\n");
                          for (var e = "", r = 0; r < n.length; r++) {
                              var t = n.charCodeAt(r);
                              t < 128
                                  ? (e += String.fromCharCode(t))
                                  : t > 127 && t < 2048
                                    ? ((e += String.fromCharCode(
                                          (t >> 6) | 192,
                                      )),
                                      (e += String.fromCharCode(
                                          (63 & t) | 128,
                                      )))
                                    : ((e += String.fromCharCode(
                                          (t >> 12) | 224,
                                      )),
                                      (e += String.fromCharCode(
                                          ((t >> 6) & 63) | 128,
                                      )),
                                      (e += String.fromCharCode(
                                          (63 & t) | 128,
                                      )));
                          }
                          return e;
                      })(n);
                      var r;
                      var t;
                      var u;
                      var a;
                      var s;
                      var o;
                      var i;
                      var l = "";
                      var c = 0;
                      do {
                          (a = (r = n.charCodeAt(c++)) >> 2),
                              (s =
                                  ((3 & r) << 4) |
                                  ((t = n.charCodeAt(c++)) >> 4)),
                              (o =
                                  ((15 & t) << 2) |
                                  ((u = n.charCodeAt(c++)) >> 6)),
                              (i = 63 & u),
                              isNaN(t) ? (o = i = 64) : isNaN(u) && (i = 64),
                              (l +=
                                  e.charAt(a) +
                                  e.charAt(s) +
                                  e.charAt(o) +
                                  e.charAt(i)),
                              (r = t = u = ""),
                              (a = s = o = i = "");
                      } while (c < n.length);
                      return l;
                  };
                  var r = function (n, e, t, u) {
                      "function" == typeof t && ((u = t), (t = {})),
                          (t.cache = t.cache || !1),
                          (t.data = t.data || {}),
                          (t.headers = t.headers || {}),
                          (t.jsonp = t.jsonp || !1),
                          (t.async = void 0 === t.async || t.async);
                      var a;
                      var s = (function () {
                          for (
                              var n = arguments[0], e = 1;
                              e < arguments.length;
                              e++
                          ) {
                              var r = arguments[e];
                              for (var t in r)
                                  r.hasOwnProperty(t) && (n[t] = r[t]);
                          }
                          return n;
                      })(
                          {
                              accept: "*/*",
                              "content-type":
                                  "application/x-www-form-urlencoded;charset=UTF-8",
                          },
                          r.headers,
                          t.headers,
                      );
                      if (
                          ((a =
                              "application/json" === s["content-type"]
                                  ? JSON.stringify(t.data)
                                  : (function (n) {
                                        if ("string" == typeof n) return n;
                                        var e = [];
                                        for (var r in n)
                                            n.hasOwnProperty(r) &&
                                                e.push(
                                                    encodeURIComponent(r) +
                                                        "=" +
                                                        encodeURIComponent(
                                                            n[r],
                                                        ),
                                                );
                                        return e.join("&");
                                    })(t.data)),
                          "GET" === n)
                      ) {
                          var o = [];
                          if (
                              (a && (o.push(a), (a = null)),
                              t.cache || o.push("_=" + new Date().getTime()),
                              t.jsonp &&
                                  (o.push("callback=" + t.jsonp),
                                  o.push("jsonp=" + t.jsonp)),
                              (o = o.join("&")).length > 1 &&
                                  (e.indexOf("?") > -1
                                      ? (e += "&" + o)
                                      : (e += "?" + o)),
                              t.jsonp)
                          ) {
                              var i = document.getElementsByTagName("head")[0];
                              var l = document.createElement("script");
                              return (
                                  (l.type = "text/javascript"),
                                  (l.src = e),
                                  void i.appendChild(l)
                              );
                          }
                      }
                      !(function (n) {
                          if (window.XMLHttpRequest)
                              return n(null, new XMLHttpRequest());
                          if (window.ActiveXObject)
                              try {
                                  return n(
                                      null,
                                      new ActiveXObject("Msxml2.XMLHTTP"),
                                  );
                              } catch (e) {
                                  return n(
                                      null,
                                      new ActiveXObject("Microsoft.XMLHTTP"),
                                  );
                              }
                          n(new Error());
                      })(function (r, o) {
                          if (r) return u(r);
                          for (var i in (o.open(n, e, t.async), s))
                              s.hasOwnProperty(i) &&
                                  o.setRequestHeader(i, s[i]);
                          (o.onreadystatechange = function () {
                              if (4 === o.readyState) {
                                  var n = o.responseText || "";
                                  if (!u) return;
                                  u(o.status, {
                                      text: function () {
                                          return n;
                                      },
                                      json: function () {
                                          return JSON.parse(n);
                                      },
                                  });
                              }
                          }),
                              o.send(a);
                      });
                  };
                  ({
                      authBasic: function (n, t) {
                          r.headers.Authorization = "Basic " + e(n + ":" + t);
                      },
                      connect: function (n, e, t) {
                          return r("CONNECT", n, e, t);
                      },
                      del: function (n, e, t) {
                          return r("DELETE", n, e, t);
                      },
                      get: function (n, e, t) {
                          return r("GET", n, e, t);
                      },
                      head: function (n, e, t) {
                          return r("HEAD", n, e, t);
                      },
                      headers: function (n) {
                          r.headers = n || {};
                      },
                      isAllowed: function (n, e, r) {
                          this.options(n, function (n, t) {
                              r(-1 !== t.text().indexOf(e));
                          });
                      },
                      options: function (n, e, t) {
                          return r("OPTIONS", n, e, t);
                      },
                      patch: function (n, e, t) {
                          return r("PATCH", n, e, t);
                      },
                      post: function (n, e, t) {
                          return r("POST", n, e, t);
                      },
                      put: function (n, e, t) {
                          return r("PUT", n, e, t);
                      },
                      trace: function (n, e, t) {
                          return r("TRACE", n, e, t);
                      },
                  })[n.type ? n.type.toLowerCase() : "get"](
                      n.url,
                      n,
                      function (e, r) {
                          200 === e
                              ? n.success(r.json(), e, null)
                              : n.error(r.text(), e, null);
                      },
                  );
              },
        cookie:
            "undefined" != typeof document
                ? l
                : {
                      create: function (n, e, r) {},
                      read: function (n) {
                          return null;
                      },
                      remove: function (n) {},
                  },
        detectLanguage: function () {
            var n;
            var e = [];
            "undefined" != typeof window &&
                (!(function () {
                    for (
                        var n = window.location.search.substring(1).split("&"),
                            r = 0;
                        r < n.length;
                        r++
                    ) {
                        var t = n[r].indexOf("=");
                        if (t > 0) {
                            var u = n[r].substring(0, t);
                            var a = n[r].substring(t + 1);
                            e[u] = a;
                        }
                    }
                })(),
                e[o.detectLngQS] && (n = e[o.detectLngQS]));
            if (!n && "undefined" != typeof document && o.useCookie) {
                var r = c.cookie.read(o.cookieName);
                r && (n = r);
            }
            n ||
                "undefined" == typeof navigator ||
                (n = navigator.language
                    ? navigator.language
                    : navigator.userLanguage);
            return n;
        },
        escape: function (n) {
            return "string" == typeof n
                ? n.replace(/[&<>"'\/]/g, function (n) {
                      return i[n];
                  })
                : n;
        },
        log: function (n) {
            o.debug && "undefined" != typeof console && console.log(n);
        },
        toLanguages: function (n) {
            var e = [];
            if ("string" == typeof n && n.indexOf("-") > -1) {
                var r = n.split("-");
                (n = o.lowerCaseLng
                    ? r[0].toLowerCase() + "-" + r[1].toLowerCase()
                    : r[0].toLowerCase() + "-" + r[1].toUpperCase()),
                    "unspecific" !== o.load && e.push(n),
                    "current" !== o.load && e.push(r[0]);
            } else e.push(n);
            return (
                -1 === e.indexOf(o.fallbackLng) &&
                    o.fallbackLng &&
                    e.push(o.fallbackLng),
                e
            );
        },
        regexEscape: function (n) {
            return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
    };

    function f(e, a) {
        var i;
        if (
            ("function" == typeof e && ((a = e), (e = {})),
            (e = e || {}),
            c.extend(o, e),
            "string" == typeof o.ns &&
                (o.ns = {
                    namespaces: [o.ns],
                    defaultNs: o.ns,
                }),
            "string" == typeof o.fallbackNS && (o.fallbackNS = [o.fallbackNS]),
            (o.interpolationPrefixEscaped = c.regexEscape(
                o.interpolationPrefix,
            )),
            (o.interpolationSuffixEscaped = c.regexEscape(
                o.interpolationSuffix,
            )),
            o.lng || (o.lng = c.detectLanguage()),
            o.lng
                ? o.useCookie &&
                  c.cookie.create(o.cookieName, o.lng, o.cookieExpirationTime)
                : ((o.lng = o.fallbackLng),
                  o.useCookie && c.cookie.remove(o.cookieName)),
            (s = c.toLanguages(o.lng)),
            (n = s[0]),
            c.log("currentLng set to: " + n),
            x.setCurrentLng(n),
            r &&
                o.setJqueryExt &&
                (function () {
                    function n(n, e, t) {
                        if (0 !== e.length) {
                            var u;
                            var a = "text";
                            if (0 === e.indexOf("[")) {
                                var s = e.split("]");
                                (e = s[1]),
                                    (a = s[0].substr(1, s[0].length - 1));
                            }
                            e.indexOf(";") === e.length - 1 &&
                                (e = e.substr(0, e.length - 2)),
                                "html" === a
                                    ? ((u = o.defaultValueFromContent
                                          ? r.extend(
                                                {
                                                    defaultValue: n.html(),
                                                },
                                                t,
                                            )
                                          : t),
                                      n.html(r.t(e, u)))
                                    : "text" === a
                                      ? ((u = o.defaultValueFromContent
                                            ? r.extend(
                                                  {
                                                      defaultValue: n.text(),
                                                  },
                                                  t,
                                              )
                                            : t),
                                        n.text(r.t(e, u)))
                                      : ((u = o.defaultValueFromContent
                                            ? r.extend(
                                                  {
                                                      defaultValue: n.attr(a),
                                                  },
                                                  t,
                                              )
                                            : t),
                                        n.attr(a, r.t(e, u)));
                        }
                    }

                    function e(e, t) {
                        var u = e.attr(o.selectorAttr);
                        if (u) {
                            var a = e;
                            var s = e.data("i18n-target");
                            if (
                                (s && (a = e.find(s) || e),
                                t ||
                                    !0 !== o.useDataAttrOptions ||
                                    (t = e.data("i18n-options")),
                                (t = t || {}),
                                u.indexOf(";") >= 0)
                            ) {
                                var i = u.split(";");
                                r.each(i, function (e, r) {
                                    "" !== r && n(a, r, t);
                                });
                            } else n(a, u, t);
                            !0 === o.useDataAttrOptions &&
                                e.data("i18n-options", t);
                        }
                    }
                    (r.t = r.t || d),
                        (r.fn.i18n = function (n) {
                            return this.each(function () {
                                e(r(this), n),
                                    r(this)
                                        .find("[" + o.selectorAttr + "]")
                                        .each(function () {
                                            e(r(this), n);
                                        });
                            });
                        });
                })(),
            r && r.Deferred && (i = r.Deferred()),
            o.resStore)
        )
            return (
                (u = o.resStore),
                a && a(d),
                i && i.resolve(),
                i ? i.promise() : void 0
            );
        var l = c.toLanguages(o.lng);
        "string" == typeof o.preload && (o.preload = [o.preload]);
        for (var f = 0, m = o.preload.length; f < m; f++)
            for (
                var p = c.toLanguages(o.preload[f]), b = 0, g = p.length;
                b < g;
                b++
            )
                l.indexOf(p[b]) < 0 && l.push(p[b]);
        return (
            t.sync.load(l, o, function (n, e) {
                (u = e), a && a(d), i && i.resolve();
            }),
            i ? i.promise() : void 0
        );
    }

    function m(n, e) {
        var r = {
            dynamicLoad: o.dynamicLoad,
            resGetPath: o.resGetPath,
            getAsync: o.getAsync,
            customLoad: o.customLoad,
            ns: {
                namespaces: n,
                defaultNs: "",
            },
        };
        var a = c.toLanguages(o.lng);
        "string" == typeof o.preload && (o.preload = [o.preload]);
        for (var s = 0, i = o.preload.length; s < i; s++)
            for (
                var l = c.toLanguages(o.preload[s]), f = 0, m = l.length;
                f < m;
                f++
            )
                a.indexOf(l[f]) < 0 && a.push(l[f]);
        for (var p = [], b = 0, d = a.length; b < d; b++) {
            var g = !1;
            var h = u[a[b]];
            if (h)
                for (var N = 0, v = n.length; N < v; N++) h[n[N]] || (g = !0);
            else g = !0;
            g && p.push(a[b]);
        }
        p.length
            ? t.sync._fetch(p, r, function (r, a) {
                  var s = n.length * p.length;
                  c.each(n, function (n, r) {
                      o.ns.namespaces.indexOf(r) < 0 && o.ns.namespaces.push(r),
                          c.each(p, function (n, i) {
                              (u[i] = u[i] || {}),
                                  (u[i][r] = a[i][r]),
                                  0 === --s &&
                                      e &&
                                      (o.useLocalStorage &&
                                          t.sync._storeLocal(u),
                                      e());
                          });
                  });
              })
            : e && e();
    }

    function p(n, e, r, t) {
        if (!n) return n;
        if (
            ((t = t || e),
            n.indexOf(t.interpolationPrefix || o.interpolationPrefix) < 0)
        )
            return n;
        var u = t.interpolationPrefix
            ? c.regexEscape(t.interpolationPrefix)
            : o.interpolationPrefixEscaped;
        var a = t.interpolationSuffix
            ? c.regexEscape(t.interpolationSuffix)
            : o.interpolationSuffixEscaped;
        var s = "HTML" + a;
        return (
            c.each(e, function (e, i) {
                var l = r ? r + o.keyseparator + e : e;
                n =
                    "object" == typeof i && null !== i
                        ? p(n, i, l, t)
                        : t.escapeInterpolation || o.escapeInterpolation
                          ? (n = n.replace(
                                new RegExp([u, l, s].join(""), "g"),
                                i,
                            )).replace(
                                new RegExp([u, l, a].join(""), "g"),
                                c.escape(i),
                            )
                          : n.replace(new RegExp([u, l, a].join(""), "g"), i);
            }),
            n
        );
    }

    function b(n, e) {
        var r = c.extend({}, e);
        for (
            delete r.postProcess;
            -1 != n.indexOf(o.reusePrefix) && !(++a > o.maxRecursion);

        ) {
            var t = n.lastIndexOf(o.reusePrefix);
            var u = n.indexOf(o.reuseSuffix, t) + o.reuseSuffix.length;
            var s = n.substring(t, u);
            var i = s.replace(o.reusePrefix, "").replace(o.reuseSuffix, "");
            if (-1 != i.indexOf(",")) {
                var l = i.indexOf(",");
                if (-1 != i.indexOf("{", l) && -1 != i.indexOf("}", l)) {
                    var f = i.indexOf("{", l);
                    var m = i.indexOf("}", f) + 1;
                    try {
                        (r = c.extend(r, JSON.parse(i.substring(f, m)))),
                            (i = i.substring(0, l));
                    } catch (n) {}
                }
            }
            var p = h(i, r);
            n = n.replace(s, p);
        }
        return n;
    }

    function d(n, e) {
        return (a = 0), h.apply(null, arguments);
    }

    function g() {
        for (var n = [], e = 1; e < arguments.length; e++) n.push(arguments[e]);
        return {
            postProcess: "sprintf",
            sprintf: n,
        };
    }

    function h(n, e) {
        var r;
        var t =
            (e = "string" == typeof e ? g.apply(null, arguments) : e || {})
                .defaultValue || n;
        var u = N(n, e);
        var a = e.lng ? c.toLanguages(e.lng) : s;
        var i = e.ns || o.ns.defaultNs;
        n.indexOf(o.nsseparator) > -1 &&
            ((i = (r = n.split(o.nsseparator))[0]), (n = r[1])),
            void 0 === u &&
                o.sendMissing &&
                (e.lng
                    ? v.postMissing(a[0], i, n, t, a)
                    : v.postMissing(o.lng, i, n, t, a));
        var l = e.postProcess || o.postProcess;
        void 0 !== u && l && y[l] && (u = y[l](u, n, e));
        var f = t;
        if (
            (t.indexOf(o.nsseparator) > -1 &&
                (f = (r = t.split(o.nsseparator))[1]),
            f === n && o.parseMissingKey && (t = o.parseMissingKey(t)),
            void 0 === u && ((t = b((t = p(t, e)), e)), l && y[l]))
        ) {
            var m = e.defaultValue || n;
            u = y[l](m, n, e);
        }
        return void 0 !== u ? u : t;
    }

    function N(n, e) {
        var r;
        var a;
        var i = (e = e || {}).defaultValue || n;
        var l = s;
        if (!u) return i;
        if (e.lng && ((l = c.toLanguages(e.lng)), !u[l[0]])) {
            var f = o.getAsync;
            (o.getAsync = !1),
                t.sync.load(l, o, function (n, e) {
                    c.extend(u, e), (o.getAsync = f);
                });
        }
        var m;
        var g = e.ns || o.ns.defaultNs;
        if (n.indexOf(o.nsseparator) > -1) {
            var v = n.split(o.nsseparator);
            (g = v[0]), (n = v[1]);
        }
        if (
            (function (n) {
                return n.context && "string" == typeof n.context;
            })(e) &&
            (delete (r = c.extend({}, e)).context,
            (r.defaultValue = o.contextNotFound),
            (a = d(g + o.nsseparator + n + "_" + e.context, r)) !=
                o.contextNotFound)
        )
            return p(a, {
                context: e.context,
            });
        if (
            (function (n) {
                return (
                    void 0 !== n.count &&
                    "string" != typeof n.count &&
                    1 !== n.count
                );
            })(e)
        ) {
            delete (r = c.extend({}, e)).count,
                (r.defaultValue = o.pluralNotFound);
            var y = g + o.nsseparator + n + o.pluralSuffix;
            var k = x.get(l[0], e.count);
            if (
                (k >= 0
                    ? (y = y + "_" + k)
                    : 1 === k && (y = g + o.nsseparator + n),
                (a = d(y, r)) != o.pluralNotFound)
            )
                return p(a, {
                    count: e.count,
                    interpolationPrefix: e.interpolationPrefix,
                    interpolationSuffix: e.interpolationSuffix,
                });
        }
        for (
            var S = n.split(o.keyseparator), O = 0, L = l.length;
            O < L && void 0 === m;
            O++
        ) {
            for (var w = l[O], j = 0, T = u[w] && u[w][g]; S[j]; )
                (T = T && T[S[j]]), j++;
            if (void 0 !== T) {
                if ("string" == typeof T) T = b((T = p(T, e)), e);
                else if (
                    "[object Array]" !== Object.prototype.toString.apply(T) ||
                    o.returnObjectTrees ||
                    e.returnObjectTrees
                ) {
                    if (null === T && !0 === o.fallbackOnNull) T = void 0;
                    else if (null !== T)
                        if (o.returnObjectTrees || e.returnObjectTrees) {
                            var P = {};
                            for (var A in T)
                                P[A] = h(
                                    g + o.nsseparator + n + o.keyseparator + A,
                                    e,
                                );
                            T = P;
                        } else
                            (T =
                                "key '" +
                                g +
                                ":" +
                                n +
                                " (" +
                                w +
                                ")' returned a object instead of string."),
                                c.log(T);
                } else T = b((T = p((T = T.join("\n")), e)), e);
                m = T;
            }
        }
        if (
            void 0 === m &&
            !e.isFallbackLookup &&
            (!0 === o.fallbackToDefaultNS ||
                (o.fallbackNS && o.fallbackNS.length > 0))
        )
            if (((e.isFallbackLookup = !0), o.fallbackNS.length))
                for (var C = 0, _ = o.fallbackNS.length; C < _; C++) {
                    if ((m = N(o.fallbackNS[C] + o.nsseparator + n, e)))
                        if (
                            (m.indexOf(o.nsseparator) > -1
                                ? m.split(o.nsseparator)[1]
                                : m) !==
                            (i.indexOf(o.nsseparator) > -1
                                ? i.split(o.nsseparator)[1]
                                : i)
                        )
                            break;
                }
            else m = N(n, e);
        return m;
    }
    c.applyReplacement = p;
    var v = {
        load: function (n, e, r) {
            e.useLocalStorage
                ? v._loadLocal(n, e, function (t, u) {
                      for (var a = [], s = 0, o = n.length; s < o; s++)
                          u[n[s]] || a.push(n[s]);
                      a.length > 0
                          ? v._fetch(a, e, function (n, e) {
                                c.extend(u, e), v._storeLocal(e), r(null, u);
                            })
                          : r(null, u);
                  })
                : v._fetch(n, e, function (n, e) {
                      r(null, e);
                  });
        },
        _loadLocal: function (n, e, r) {
            var t = {};
            var u = new Date().getTime();
            if (window.localStorage) {
                var a = n.length;
                c.each(n, function (n, s) {
                    var o = window.localStorage.getItem("res_" + s);
                    o &&
                        (o = JSON.parse(o)).i18nStamp &&
                        o.i18nStamp + e.localStorageExpirationTime > u &&
                        (t[s] = o),
                        0 === --a && r(null, t);
                });
            }
        },
        _storeLocal: function (n) {
            if (window.localStorage)
                for (var e in n)
                    (n[e].i18nStamp = new Date().getTime()),
                        window.localStorage.setItem(
                            "res_" + e,
                            JSON.stringify(n[e]),
                        );
        },
        _fetch: function (n, e, r) {
            var t = e.ns;
            var u = {};
            if (e.dynamicLoad) {
                var a = function (n, e) {
                    r(null, e);
                };
                if ("function" == typeof e.customLoad)
                    e.customLoad(n, t.namespaces, e, a);
                else {
                    var s = p(e.resGetPath, {
                        lng: n.join("+"),
                        ns: t.namespaces.join("+"),
                    });
                    c.ajax({
                        url: s,
                        success: function (n, e, r) {
                            c.log("loaded: " + s), a(0, n);
                        },
                        error: function (n, e, r) {
                            c.log("failed loading: " + s), a();
                        },
                        dataType: "json",
                        async: e.getAsync,
                    });
                }
            } else {
                var o;
                var i = t.namespaces.length * n.length;
                c.each(t.namespaces, function (t, a) {
                    c.each(n, function (n, t) {
                        var s = function (n, e) {
                            n && (o = o || []).push(n),
                                (u[t] = u[t] || {}),
                                (u[t][a] = e),
                                0 === --i && r(o, u);
                        };
                        "function" == typeof e.customLoad
                            ? e.customLoad(t, a, e, s)
                            : v._fetchOne(t, a, e, s);
                    });
                });
            }
        },
        _fetchOne: function (n, e, r, t) {
            var u = p(r.resGetPath, {
                lng: n,
                ns: e,
            });
            c.ajax({
                url: u,
                success: function (n, e, r) {
                    c.log("loaded: " + u), t(null, n);
                },
                error: function (n, e, r) {
                    c.log("failed loading: " + u), t(r, {});
                },
                dataType: "json",
                async: r.getAsync,
            });
        },
        postMissing: function (n, e, r, t, a) {
            var s = {};
            s[r] = t;
            var i = [];
            if ("fallback" === o.sendMissingTo && !1 !== o.fallbackLng)
                i.push({
                    lng: o.fallbackLng,
                    url: p(o.resPostPath, {
                        lng: o.fallbackLng,
                        ns: e,
                    }),
                });
            else if (
                "current" === o.sendMissingTo ||
                ("fallback" === o.sendMissingTo && !1 === o.fallbackLng)
            )
                i.push({
                    lng: n,
                    url: p(o.resPostPath, {
                        lng: n,
                        ns: e,
                    }),
                });
            else if ("all" === o.sendMissingTo)
                for (var l = 0, f = a.length; l < f; l++)
                    i.push({
                        lng: a[l],
                        url: p(o.resPostPath, {
                            lng: a[l],
                            ns: e,
                        }),
                    });
            for (var m = 0, b = i.length; m < b; m++) {
                var d = i[m];
                c.ajax({
                    url: d.url,
                    type: o.sendType,
                    data: s,
                    success: function (n, a, s) {
                        c.log("posted missing key '" + r + "' to: " + d.url);
                        for (
                            var o = r.split("."), i = 0, l = u[d.lng][e];
                            o[i];

                        )
                            (l =
                                i === o.length - 1
                                    ? (l[o[i]] = t)
                                    : (l[o[i]] = l[o[i]] || {})),
                                i++;
                    },
                    error: function (n, e, t) {
                        c.log(
                            "failed posting missing key '" +
                                r +
                                "' to: " +
                                d.url,
                        );
                    },
                    dataType: "json",
                    async: o.postAsync,
                });
            }
        },
    };
    var x = {
        rules: {
            ach: {
                name: "Acholi",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            af: {
                name: "Afrikaans",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ak: {
                name: "Akan",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            am: {
                name: "Amharic",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            an: {
                name: "Aragonese",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ar: {
                name: "Arabic",
                numbers: [0, 1, 2, 3, 11, 100],
                plurals: function (n) {
                    return Number(
                        0 === n
                            ? 0
                            : 1 == n
                              ? 1
                              : 2 == n
                                ? 2
                                : n % 100 >= 3 && n % 100 <= 10
                                  ? 3
                                  : n % 100 >= 11
                                    ? 4
                                    : 5,
                    );
                },
            },
            arn: {
                name: "Mapudungun",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            ast: {
                name: "Asturian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ay: {
                name: "Aymará",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            az: {
                name: "Azerbaijani",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            be: {
                name: "Belarusian",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            bg: {
                name: "Bulgarian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            bn: {
                name: "Bengali",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            bo: {
                name: "Tibetan",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            br: {
                name: "Breton",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            bs: {
                name: "Bosnian",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            ca: {
                name: "Catalan",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            cgg: {
                name: "Chiga",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            cs: {
                name: "Czech",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(1 == n ? 0 : n >= 2 && n <= 4 ? 1 : 2);
                },
            },
            csb: {
                name: "Kashubian",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        1 == n
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            cy: {
                name: "Welsh",
                numbers: [1, 2, 3, 8],
                plurals: function (n) {
                    return Number(
                        1 == n ? 0 : 2 == n ? 1 : 8 != n && 11 != n ? 2 : 3,
                    );
                },
            },
            da: {
                name: "Danish",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            de: {
                name: "German",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            dz: {
                name: "Dzongkha",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            el: {
                name: "Greek",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            en: {
                name: "English",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            eo: {
                name: "Esperanto",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            es: {
                name: "Spanish",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            es_ar: {
                name: "Argentinean Spanish",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            et: {
                name: "Estonian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            eu: {
                name: "Basque",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            fa: {
                name: "Persian",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            fi: {
                name: "Finnish",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            fil: {
                name: "Filipino",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            fo: {
                name: "Faroese",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            fr: {
                name: "French",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            fur: {
                name: "Friulian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            fy: {
                name: "Frisian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ga: {
                name: "Irish",
                numbers: [1, 2, 3, 7, 11],
                plurals: function (n) {
                    return Number(
                        1 == n ? 0 : 2 == n ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4,
                    );
                },
            },
            gd: {
                name: "Scottish Gaelic",
                numbers: [1, 2, 3, 20],
                plurals: function (n) {
                    return Number(
                        1 == n || 11 == n
                            ? 0
                            : 2 == n || 12 == n
                              ? 1
                              : n > 2 && n < 20
                                ? 2
                                : 3,
                    );
                },
            },
            gl: {
                name: "Galician",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            gu: {
                name: "Gujarati",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            gun: {
                name: "Gun",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            ha: {
                name: "Hausa",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            he: {
                name: "Hebrew",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            hi: {
                name: "Hindi",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            hr: {
                name: "Croatian",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            hu: {
                name: "Hungarian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            hy: {
                name: "Armenian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ia: {
                name: "Interlingua",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            id: {
                name: "Indonesian",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            is: {
                name: "Icelandic",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n % 10 != 1 || n % 100 == 11);
                },
            },
            it: {
                name: "Italian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ja: {
                name: "Japanese",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            jbo: {
                name: "Lojban",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            jv: {
                name: "Javanese",
                numbers: [0, 1],
                plurals: function (n) {
                    return Number(0 !== n);
                },
            },
            ka: {
                name: "Georgian",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            kk: {
                name: "Kazakh",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            km: {
                name: "Khmer",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            kn: {
                name: "Kannada",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ko: {
                name: "Korean",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            ku: {
                name: "Kurdish",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            kw: {
                name: "Cornish",
                numbers: [1, 2, 3, 4],
                plurals: function (n) {
                    return Number(1 == n ? 0 : 2 == n ? 1 : 3 == n ? 2 : 3);
                },
            },
            ky: {
                name: "Kyrgyz",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            lb: {
                name: "Letzeburgesch",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ln: {
                name: "Lingala",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            lo: {
                name: "Lao",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            lt: {
                name: "Lithuanian",
                numbers: [1, 2, 10],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11
                            ? 0
                            : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            lv: {
                name: "Latvian",
                numbers: [0, 1, 2],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11 ? 0 : 0 !== n ? 1 : 2,
                    );
                },
            },
            mai: {
                name: "Maithili",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            mfe: {
                name: "Mauritian Creole",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            mg: {
                name: "Malagasy",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            mi: {
                name: "Maori",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            mk: {
                name: "Macedonian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 == n || n % 10 == 1 ? 0 : 1);
                },
            },
            ml: {
                name: "Malayalam",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            mn: {
                name: "Mongolian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            mnk: {
                name: "Mandinka",
                numbers: [0, 1, 2],
                plurals: function (n) {
                    return Number(1 == n ? 1 : 2);
                },
            },
            mr: {
                name: "Marathi",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ms: {
                name: "Malay",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            mt: {
                name: "Maltese",
                numbers: [1, 2, 11, 20],
                plurals: function (n) {
                    return Number(
                        1 == n
                            ? 0
                            : 0 === n || (n % 100 > 1 && n % 100 < 11)
                              ? 1
                              : n % 100 > 10 && n % 100 < 20
                                ? 2
                                : 3,
                    );
                },
            },
            nah: {
                name: "Nahuatl",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            nap: {
                name: "Neapolitan",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            nb: {
                name: "Norwegian Bokmal",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ne: {
                name: "Nepali",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            nl: {
                name: "Dutch",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            nn: {
                name: "Norwegian Nynorsk",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            no: {
                name: "Norwegian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            nso: {
                name: "Northern Sotho",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            oc: {
                name: "Occitan",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            or: {
                name: "Oriya",
                numbers: [2, 1],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            pa: {
                name: "Punjabi",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            pap: {
                name: "Papiamento",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            pl: {
                name: "Polish",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        1 == n
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            pms: {
                name: "Piemontese",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ps: {
                name: "Pashto",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            pt: {
                name: "Portuguese",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            pt_br: {
                name: "Brazilian Portuguese",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            rm: {
                name: "Romansh",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ro: {
                name: "Romanian",
                numbers: [1, 2, 20],
                plurals: function (n) {
                    return Number(
                        1 == n
                            ? 0
                            : 0 === n || (n % 100 > 0 && n % 100 < 20)
                              ? 1
                              : 2,
                    );
                },
            },
            ru: {
                name: "Russian",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            sah: {
                name: "Yakut",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            sco: {
                name: "Scots",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            se: {
                name: "Northern Sami",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            si: {
                name: "Sinhala",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            sk: {
                name: "Slovak",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(1 == n ? 0 : n >= 2 && n <= 4 ? 1 : 2);
                },
            },
            sl: {
                name: "Slovenian",
                numbers: [5, 1, 2, 3],
                plurals: function (n) {
                    return Number(
                        n % 100 == 1
                            ? 1
                            : n % 100 == 2
                              ? 2
                              : n % 100 == 3 || n % 100 == 4
                                ? 3
                                : 0,
                    );
                },
            },
            so: {
                name: "Somali",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            son: {
                name: "Songhay",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            sq: {
                name: "Albanian",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            sr: {
                name: "Serbian",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            su: {
                name: "Sundanese",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            sv: {
                name: "Swedish",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            sw: {
                name: "Swahili",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            ta: {
                name: "Tamil",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            te: {
                name: "Telugu",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            tg: {
                name: "Tajik",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            th: {
                name: "Thai",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            ti: {
                name: "Tigrinya",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            tk: {
                name: "Turkmen",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            tr: {
                name: "Turkish",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            tt: {
                name: "Tatar",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            ug: {
                name: "Uyghur",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            uk: {
                name: "Ukrainian",
                numbers: [1, 2, 5],
                plurals: function (n) {
                    return Number(
                        n % 10 == 1 && n % 100 != 11
                            ? 0
                            : n % 10 >= 2 &&
                                n % 10 <= 4 &&
                                (n % 100 < 10 || n % 100 >= 20)
                              ? 1
                              : 2,
                    );
                },
            },
            ur: {
                name: "Urdu",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            uz: {
                name: "Uzbek",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            vi: {
                name: "Vietnamese",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            wa: {
                name: "Walloon",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(n > 1);
                },
            },
            wo: {
                name: "Wolof",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
            yo: {
                name: "Yoruba",
                numbers: [1, 2],
                plurals: function (n) {
                    return Number(1 != n);
                },
            },
            zh: {
                name: "Chinese",
                numbers: [1],
                plurals: function (n) {
                    return 0;
                },
            },
        },
        addRule: function (n, e) {
            x.rules[n] = e;
        },
        setCurrentLng: function (n) {
            if (!x.currentRule || x.currentRule.lng !== n) {
                var e = n.split("-");
                x.currentRule = {
                    lng: n,
                    rule: x.rules[e[0]],
                };
            }
        },
        get: function (n, e) {
            return (function (e, r) {
                var t;
                if (
                    (t =
                        x.currentRule && x.currentRule.lng === n
                            ? x.currentRule.rule
                            : x.rules[e])
                ) {
                    var u = t.plurals(r);
                    var a = t.numbers[u];
                    return (
                        2 === t.numbers.length &&
                            1 === t.numbers[0] &&
                            (2 === a ? (a = -1) : 1 === a && (a = 1)),
                        a
                    );
                }
                return 1 === r ? "1" : "-1";
            })(n.split("-")[0], e);
        },
    };
    var y = {};
    var k = function (n, e) {
        y[n] = e;
    };
    var S = (function () {
        function n(n) {
            return Object.prototype.toString.call(n).slice(8, -1).toLowerCase();
        }

        function e(n, e) {
            for (var r = []; e > 0; r[--e] = n);
            return r.join("");
        }
        var r = function () {
            return (
                r.cache.hasOwnProperty(arguments[0]) ||
                    (r.cache[arguments[0]] = r.parse(arguments[0])),
                r.format.call(null, r.cache[arguments[0]], arguments)
            );
        };
        return (
            (r.format = function (r, t) {
                var u;
                var a;
                var s;
                var o;
                var i;
                var l;
                var c;
                var f = 1;
                var m = r.length;
                var p = "";
                var b = [];
                for (a = 0; a < m; a++)
                    if ("string" === (p = n(r[a]))) b.push(r[a]);
                    else if ("array" === p) {
                        if ((o = r[a])[2])
                            for (u = t[f], s = 0; s < o[2].length; s++) {
                                if (!u.hasOwnProperty(o[2][s]))
                                    throw S(
                                        '[sprintf] property "%s" does not exist',
                                        o[2][s],
                                    );
                                u = u[o[2][s]];
                            }
                        else u = o[1] ? t[o[1]] : t[f++];
                        if (/[^s]/.test(o[8]) && "number" != n(u))
                            throw S(
                                "[sprintf] expecting number but found %s",
                                n(u),
                            );
                        switch (o[8]) {
                            case "b":
                                u = u.toString(2);
                                break;
                            case "c":
                                u = String.fromCharCode(u);
                                break;
                            case "d":
                                u = parseInt(u, 10);
                                break;
                            case "e":
                                u = o[7]
                                    ? u.toExponential(o[7])
                                    : u.toExponential();
                                break;
                            case "f":
                                u = o[7]
                                    ? parseFloat(u).toFixed(o[7])
                                    : parseFloat(u);
                                break;
                            case "o":
                                u = u.toString(8);
                                break;
                            case "s":
                                u =
                                    (u = String(u)) && o[7]
                                        ? u.substring(0, o[7])
                                        : u;
                                break;
                            case "u":
                                u = Math.abs(u);
                                break;
                            case "x":
                                u = u.toString(16);
                                break;
                            case "X":
                                u = u.toString(16).toUpperCase();
                        }
                        (u =
                            /[def]/.test(o[8]) && o[3] && u >= 0 ? "+" + u : u),
                            (l = o[4]
                                ? "0" == o[4]
                                    ? "0"
                                    : o[4].charAt(1)
                                : " "),
                            (c = o[6] - String(u).length),
                            (i = o[6] ? e(l, c) : ""),
                            b.push(o[5] ? u + i : i + u);
                    }
                return b.join("");
            }),
            (r.cache = {}),
            (r.parse = function (n) {
                for (var e = n, r = [], t = [], u = 0; e; ) {
                    if (null !== (r = /^[^\x25]+/.exec(e))) t.push(r[0]);
                    else if (null !== (r = /^\x25{2}/.exec(e))) t.push("%");
                    else {
                        if (
                            null ===
                            (r =
                                /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(
                                    e,
                                ))
                        )
                            throw "[sprintf] huh?";
                        if (r[2]) {
                            u |= 1;
                            var a = [];
                            var s = r[2];
                            var o = [];
                            if (null === (o = /^([a-z_][a-z_\d]*)/i.exec(s)))
                                throw "[sprintf] huh?";
                            for (
                                a.push(o[1]);
                                "" !== (s = s.substring(o[0].length));

                            )
                                if (
                                    null !==
                                    (o = /^\.([a-z_][a-z_\d]*)/i.exec(s))
                                )
                                    a.push(o[1]);
                                else {
                                    if (null === (o = /^\[(\d+)\]/.exec(s)))
                                        throw "[sprintf] huh?";
                                    a.push(o[1]);
                                }
                            r[2] = a;
                        } else u |= 2;
                        if (3 === u)
                            throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                        t.push(r);
                    }
                    e = e.substring(r[0].length);
                }
                return t;
            }),
            r
        );
    })();
    k("sprintf", function (n, e, r) {
        return r.sprintf
            ? "[object Array]" === Object.prototype.toString.apply(r.sprintf)
                ? ((t = n), (u = r.sprintf).unshift(t), S.apply(null, u))
                : "object" == typeof r.sprintf
                  ? S(n, r.sprintf)
                  : n
            : n;
        var t;
        var u;
    }),
        (t.init = f),
        (t.setLng = function (n, e) {
            return f(
                {
                    lng: n,
                },
                e,
            );
        }),
        (t.preload = function (n, e) {
            "string" == typeof n && (n = [n]);
            for (var r = 0, t = n.length; r < t; r++)
                o.preload.indexOf(n[r]) < 0 && o.preload.push(n[r]);
            return f(e);
        }),
        (t.addResourceBundle = function (n, e, r) {
            "string" != typeof e
                ? ((r = e), (e = o.ns.defaultNs))
                : o.ns.namespaces.indexOf(e) < 0 && o.ns.namespaces.push(e),
                (u[n] = u[n] || {}),
                (u[n][e] = u[n][e] || {}),
                c.extend(u[n][e], r);
        }),
        (t.loadNamespace = function (n, e) {
            m([n], e);
        }),
        (t.loadNamespaces = m),
        (t.setDefaultNamespace = function (n) {
            o.ns.defaultNs = n;
        }),
        (t.t = d),
        (t.translate = d),
        (t.exists = function (n, e) {
            var r = (e = e || {}).defaultValue || n;
            var t = N(n, e);
            return void 0 !== t || t === r;
        }),
        (t.detectLanguage = c.detectLanguage),
        (t.pluralExtensions = x),
        (t.sync = v),
        (t.functions = c),
        (t.lng = function () {
            return n;
        }),
        (t.addPostProcessor = k),
        (t.options = o);
})();
