angular.module("ipCookie", ["ng"]).factory("ipCookie", ["$document", function(e) {
        "use strict";
        function t(e) {
                try {
                        return decodeURIComponent(e)
                } catch(t) {}
        }
        return function() {
                function n(n, r, i) {
                        var a, o, s, l, u, c, d, h, f;
                        if (i = i || {},
                        void 0 !== r) return r = "object" == typeof r ? JSON.stringify(r) : String(r),
                        "number" == typeof i.expires && (f = i.expires, i.expires = new Date, -1 === f ? i.expires = new Date("Thu, 01 Jan 1970 00:00:00 GMT") : void 0 !== i.expirationUnit ? "hours" === i.expirationUnit ? i.expires.setHours(i.expires.getHours() + f) : "minutes" === i.expirationUnit ? i.expires.setMinutes(i.expires.getMinutes() + f) : "seconds" === i.expirationUnit ? i.expires.setSeconds(i.expires.getSeconds() + f) : i.expires.setDate(i.expires.getDate() + f) : i.expires.setDate(i.expires.getDate() + f)),
                        e[0].cookie = [encodeURIComponent(n), "=", encodeURIComponent(r), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path: "", i.domain ? "; domain=" + i.domain: "", i.secure ? "; secure": ""].join("");
                        for (o = [], h = e[0].cookie, h && (o = h.split("; ")), a = {},
                        d = !1, s = 0; s < o.length; ++s) if (o[s]) {
                                if (l = o[s], u = l.indexOf("="), c = l.substring(0, u), r = t(l.substring(u + 1)), angular.isUndefined(r)) continue;
                                if (void 0 === n || n === c) {
                                        try {
                                                a[c] = JSON.parse(r)
                                        } catch(p) {
                                                a[c] = r
                                        }
                                        if (n === c) return a[c];
                                        d = !0
                                }
                        }
                        return d && void 0 === n ? a: void 0
                }
                return n.remove = function(e, t) {
                        var r = void 0 !== n(e);
                        return r && (t || (t = {}), t.expires = -1, n(e, "", t)),
                        r
                },
                n
        } ()
}]);