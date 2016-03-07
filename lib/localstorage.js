/**
 * An Angular module that gives you access to the browsers local storage
 * @version v0.1.5 - 2014-11-04
 * @link https://github.com/grevory/angular-local-storage
 * @author grevory <greg@gregpike.ca>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function(e, t) {
        "use strict";
        function n(e) {
                return /^-?\d+\.?\d*$/.test(e.replace(/["']/g, ""))
        }
        var r = t.isDefined,
        i = t.isUndefined,
        a = t.isNumber,
        o = t.isObject,
        s = t.isArray,
        l = t.extend,
        u = t.toJson,
        c = t.fromJson,
        d = t.module("LocalStorage", []);
        d.provider("localStorageService", function() {
                this.prefix = "ls",
                this.storageType = "localStorage",
                this.cookie = {
                        expiry: 30,
                        path: "/"
                },
                this.notify = {
                        setItem: !0,
                        removeItem: !1
                },
                this.setPrefix = function(e) {
                        return this.prefix = e,
                        this
                },
                this.setStorageType = function(e) {
                        return this.storageType = e,
                        this
                },
                this.setStorageCookie = function(e, t) {
                        return this.cookie = {
                                expiry: e,
                                path: t
                        },
                        this
                },
                this.setStorageCookieDomain = function(e) {
                        return this.cookie.domain = e,
                        this
                },
                this.setNotify = function(e, t) {
                        return this.notify = {
                                setItem: e,
                                removeItem: t
                        },
                        this
                },
                this.$get = ["$rootScope", "$window", "$document", "$parse", function(e, t, d, h) {
                        var f, p = this,
                        g = p.prefix,
                        m = p.cookie,
                        v = p.notify,
                        y = p.storageType;
                        d ? d[0] && (d = d[0]) : d = document,
                        "." !== g.substr( - 1) && (g = g ? g + ".": "");
                        var b = function(e) {
                                return g + e
                        },
                        x = function() {
                                try {
                                        var n = y in t && null !== t[y],
                                        r = b("__" + Math.round(1e7 * Math.random()));
                                        return n && (f = t[y], f.setItem(r, ""), f.removeItem(r)),
                                        n
                                } catch(i) {
                                        return y = "cookie",
                                        e.$broadcast("LocalStorageModule.notification.error", i.message),
                                        !1
                                }
                        } (),
                        w = function(t, n) {
                                if (i(n) ? n = null: (o(n) || s(n) || a( + n || n)) && (n = u(n)), !x || "cookie" === p.storageType) return x || e.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"),
                                v.setItem && e.$broadcast("LocalStorageModule.notification.setitem", {
                                        key: t,
                                        newvalue: n,
                                        storageType: "cookie"
                                }),
                                T(t, n);
                                try { (o(n) || s(n)) && (n = u(n)),
                                        f && f.setItem(b(t), n),
                                        v.setItem && e.$broadcast("LocalStorageModule.notification.setitem", {
                                                key: t,
                                                newvalue: n,
                                                storageType: p.storageType
                                        })
                                } catch(r) {
                                        return e.$broadcast("LocalStorageModule.notification.error", r.message),
                                        T(t, n)
                                }
                                return ! 0
                        },
                        $ = function(t) {
                                if (!x || "cookie" === p.storageType) return x || e.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"),
                                A(t);
                                var r = f ? f.getItem(b(t)) : null;
                                return r && "null" !== r ? "{" === r.charAt(0) || "[" === r.charAt(0) || n(r) ? c(r) : r: null
                        },
                        k = function(t) {
                                if (!x || "cookie" === p.storageType) return x || e.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"),
                                v.removeItem && e.$broadcast("LocalStorageModule.notification.removeitem", {
                                        key: t,
                                        storageType: "cookie"
                                }),
                                M(t);
                                try {
                                        f.removeItem(b(t)),
                                        v.removeItem && e.$broadcast("LocalStorageModule.notification.removeitem", {
                                                key: t,
                                                storageType: p.storageType
                                        })
                                } catch(n) {
                                        return e.$broadcast("LocalStorageModule.notification.error", n.message),
                                        M(t)
                                }
                                return ! 0
                        },
                        C = function() {
                                if (!x) return e.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"),
                                !1;
                                var t = g.length,
                                n = [];
                                for (var r in f) if (r.substr(0, t) === g) try {
                                        n.push(r.substr(t))
                                } catch(i) {
                                        return e.$broadcast("LocalStorageModule.notification.error", i.Description),
                                        []
                                }
                                return n
                        },
                        D = function(t) {
                                t = t || "";
                                var n = g.slice(0, -1),
                                r = new RegExp(n + "." + t);
                                if (!x || "cookie" === p.storageType) return x || e.$broadcast("LocalStorageModule.notification.warning", "LOCAL_STORAGE_NOT_SUPPORTED"),
                                E();
                                var i = g.length;
                                for (var a in f) if (r.test(a)) try {
                                        k(a.substr(i))
                                } catch(o) {
                                        return e.$broadcast("LocalStorageModule.notification.error", o.message),
                                        E()
                                }
                                return ! 0
                        },
                        S = function() {
                                try {
                                        return t.navigator.cookieEnabled || "cookie" in d && (d.cookie.length > 0 || (d.cookie = "test").indexOf.call(d.cookie, "test") > -1)
                                } catch(n) {
                                        return e.$broadcast("LocalStorageModule.notification.error", n.message),
                                        !1
                                }
                        } (),
                        T = function(t, n) {
                                if (i(n)) return ! 1;
                                if ((s(n) || o(n)) && (n = u(n)), !S) return e.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"),
                                !1;
                                try {
                                        var r = "",
                                        a = new Date,
                                        l = "";
                                        if (null === n ? (a.setTime(a.getTime() + -864e5), r = "; expires=" + a.toGMTString(), n = "") : 0 !== m.expiry && (a.setTime(a.getTime() + 24 * m.expiry * 60 * 60 * 1e3), r = "; expires=" + a.toGMTString()), t) {
                                                var c = "; path=" + m.path;
                                                m.domain && (l = "; domain=" + m.domain),
                                                d.cookie = b(t) + "=" + encodeURIComponent(n) + r + c + l
                                        }
                                } catch(h) {
                                        return e.$broadcast("LocalStorageModule.notification.error", h.message),
                                        !1
                                }
                                return ! 0
                        },
                        A = function(t) {
                                if (!S) return e.$broadcast("LocalStorageModule.notification.error", "COOKIES_NOT_SUPPORTED"),
                                !1;
                                for (var n = d.cookie && d.cookie.split(";") || [], r = 0; r < n.length; r++) {
                                        for (var i = n[r];
                                        " " === i.charAt(0);) i = i.substring(1, i.length);
                                        if (0 === i.indexOf(b(t) + "=")) {
                                                var a = decodeURIComponent(i.substring(g.length + t.length + 1, i.length));
                                                try {
                                                        var o = JSON.parse(a);
                                                        return c(o)
                                                } catch(s) {
                                                        return a
                                                }
                                        }
                                }
                                return null
                        },
                        M = function(e) {
                                T(e, null)
                        },
                        E = function() {
                                for (var e = null,
                                t = g.length,
                                n = d.cookie.split(";"), r = 0; r < n.length; r++) {
                                        for (e = n[r];
                                        " " === e.charAt(0);) e = e.substring(1, e.length);
                                        var i = e.substring(t, e.indexOf("="));
                                        M(i)
                                }
                        },
                        _ = function() {
                                return y
                        },
                        P = function(e, t, n, i) {
                                i = i || t;
                                var a = $(i);
                                return null === a && r(n) ? a = n: o(a) && o(n) && (a = l(n, a)),
                                h(t).assign(e, a),
                                e.$watch(t,
                                function(e) {
                                        w(i, e)
                                },
                                o(e[t]))
                        },
                        F = function() {
                                for (var e = 0,
                                n = t[y], r = 0; r < n.length; r++) 0 === n.key(r).indexOf(g) && e++;
                                return e
                        };
                        return {
                                isSupported: x,
                                getStorageType: _,
                                set: w,
                                add: w,
                                get: $,
                                keys: C,
                                remove: k,
                                clearAll: D,
                                bind: P,
                                deriveKey: b,
                                length: F,
                                cookie: {
                                        isSupported: S,
                                        set: T,
                                        add: T,
                                        get: A,
                                        remove: M,
                                        clearAll: E
                                }
                        }
                }]
        })
} (window, window.angular)