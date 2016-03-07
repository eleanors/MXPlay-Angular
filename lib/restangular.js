/**
 * Restful Resources service for AngularJS apps
 * @version v1.3.1 - 2014-01-29 * @link https://github.com/mgonto/restangular
 * @author Martin Gontovnikas <martin@gon.to>
 * @license MIT License, http://www.opensource.org/licenses/MIT   依赖undescore.js
 */
!function() {
        var e = angular.module("restangular", []);
        e.provider("Restangular", function() {
                var e = {};
                e.init = function(e, t) {
                        function n(e, t, n, r) {
                                var i = {};
                                return _.each(_.keys(r), function(a) {
                                        var o = r[a];
                                        o.params = _.extend({},
                                        o.params, e.defaultRequestParams[o.method.toLowerCase()]),
                                        _.isEmpty(o.params) && delete o.params,
                                        i[a] = e.isSafe(o.method) ?
                                        function() {
                                                return t(_.extend(o, {
                                                        url: n
                                                }))
                                        }: function(e) {
                                                return t(_.extend(o, {
                                                        url: n,
                                                        data: e
                                                }))
                                        }
                                }),
                                i
                        }
                        e.configuration = t;
                        var r = ["get", "head", "options", "trace", "getlist"];
                        t.isSafe = function(e) {
                                return _.contains(r, e.toLowerCase())
                        };
                        var i = /^https?:\/\//i;
                        t.isAbsoluteUrl = function(e) {
                                return _.isUndefined(t.absoluteUrl) || _.isNull(t.absoluteUrl) ? e && i.test(e) : t.absoluteUrl
                        },
                        t.absoluteUrl = _.isUndefined(t.absoluteUrl) ? !1 : !0,
                        e.setSelfLinkAbsoluteUrl = function(e) {
                                t.absoluteUrl = e
                        },
                        t.baseUrl = _.isUndefined(t.baseUrl) ? "": t.baseUrl,
                        e.setBaseUrl = function(e) {
                                return t.baseUrl = /\/$/.test(e) ? e.substring(0, e.length - 1) : e,
                                this
                        },
                        t.extraFields = t.extraFields || [],
                        e.setExtraFields = function(e) {
                                return t.extraFields = e,
                                this
                        },
                        t.defaultHttpFields = t.defaultHttpFields || {},
                        e.setDefaultHttpFields = function(e) {
                                return t.defaultHttpFields = e,
                                this
                        },
                        t.withHttpValues = function(e, n) {
                                return _.defaults(n, e, t.defaultHttpFields)
                        },
                        t.encodeIds = _.isUndefined(t.encodeIds) ? !0 : t.encodeIds,
                        e.setEncodeIds = function(e) {
                                t.encodeIds = e
                        },
                        t.defaultRequestParams = t.defaultRequestParams || {
                                get: {},
                                post: {},
                                put: {},
                                remove: {},
                                common: {}
                        },
                        e.setDefaultRequestParams = function(e, n) {
                                var r = [],
                                i = n || e;
                                return _.isUndefined(n) ? r.push("common") : _.isArray(e) ? r = e: r.push(e),
                                _.each(r,
                                function(e) {
                                        t.defaultRequestParams[e] = i
                                }),
                                this
                        },
                        e.requestParams = t.defaultRequestParams,
                        t.defaultHeaders = t.defaultHeaders || {},
                        e.setDefaultHeaders = function(n) {
                                return t.defaultHeaders = n,
                                e.defaultHeaders = t.defaultHeaders,
                                this
                        },
                        e.defaultHeaders = t.defaultHeaders,
                        t.methodOverriders = t.methodOverriders || [],
                        e.setMethodOverriders = function(e) {
                                var n = _.extend([], e);
                                return t.isOverridenMethod("delete", n) && n.push("remove"),
                                t.methodOverriders = n,
                                this
                        },
                        t.jsonp = _.isUndefined(t.jsonp) ? !1 : t.jsonp,
                        e.setJsonp = function(e) {
                                t.jsonp = e
                        },
                        t.isOverridenMethod = function(e, n) {
                                var r = n || t.methodOverriders;
                                return ! _.isUndefined(_.find(r,
                                function(t) {
                                        return t.toLowerCase() === e.toLowerCase()
                                }))
                        },
                        t.urlCreator = t.urlCreator || "path",
                        e.setUrlCreator = function(e) {
                                if (!_.has(t.urlCreatorFactory, e)) throw new Error("URL Path selected isn't valid");
                                return t.urlCreator = e,
                                this
                        },
                        t.restangularFields = t.restangularFields || {
                                id: "id",
                                route: "route",
                                parentResource: "parentResource",
                                restangularCollection: "restangularCollection",
                                cannonicalId: "__cannonicalId",
                                etag: "restangularEtag",
                                selfLink: "href",
                                get: "get",
                                getList: "getList",
                                put: "put",
                                post: "post",
                                remove: "remove",
                                head: "head",
                                trace: "trace",
                                options: "options",
                                patch: "patch",
                                getRestangularUrl: "getRestangularUrl",
                                getRequestedUrl: "getRequestedUrl",
                                putElement: "putElement",
                                addRestangularMethod: "addRestangularMethod",
                                getParentList: "getParentList",
                                clone: "clone",
                                ids: "ids",
                                httpConfig: "_$httpConfig",
                                reqParams: "reqParams",
                                one: "one",
                                all: "all",
                                several: "several",
                                oneUrl: "oneUrl",
                                allUrl: "allUrl",
                                customPUT: "customPUT",
                                customPOST: "customPOST",
                                customDELETE: "customDELETE",
                                customGET: "customGET",
                                customGETLIST: "customGETLIST",
                                customOperation: "customOperation",
                                doPUT: "doPUT",
                                doPOST: "doPOST",
                                doDELETE: "doDELETE",
                                doGET: "doGET",
                                doGETLIST: "doGETLIST",
                                fromServer: "$fromServer",
                                withConfig: "withConfig",
                                withHttpConfig: "withHttpConfig"
                        },
                        e.setRestangularFields = function(e) {
                                return t.restangularFields = _.extend(t.restangularFields, e),
                                this
                        },
                        t.isRestangularized = function(e) {
                                return !! e[t.restangularFields.one] || !!e[t.restangularFields.all]
                        },
                        t.setFieldToElem = function(e, t, n) {
                                var r = e.split("."),
                                i = t;
                                return _.each(_.initial(r),
                                function(e) {
                                        i[e] = {},
                                        i = i[e]
                                }),
                                i[_.last(r)] = n,
                                this
                        },
                        t.getFieldFromElem = function(e, t) {
                                var n = e.split("."),
                                r = t;
                                return _.each(n,
                                function(e) {
                                        r && (r = r[e])
                                }),
                                angular.copy(r)
                        },
                        t.setIdToElem = function(e, n) {
                                return t.setFieldToElem(t.restangularFields.id, e, n),
                                this
                        },
                        t.getIdFromElem = function(e) {
                                return t.getFieldFromElem(t.restangularFields.id, e)
                        },
                        t.isValidId = function(e) {
                                return "" !== e && !_.isUndefined(e) && !_.isNull(e)
                        },
                        t.setUrlToElem = function(e, n) {
                                return t.setFieldToElem(t.restangularFields.selfLink, e, n),
                                this
                        },
                        t.getUrlFromElem = function(e) {
                                return t.getFieldFromElem(t.restangularFields.selfLink, e)
                        },
                        t.useCannonicalId = _.isUndefined(t.useCannonicalId) ? !1 : t.useCannonicalId,
                        e.setUseCannonicalId = function(e) {
                                return t.useCannonicalId = e,
                                this
                        },
                        t.getCannonicalIdFromElem = function(e) {
                                var n = e[t.restangularFields.cannonicalId],
                                r = t.isValidId(n) ? n: t.getIdFromElem(e);
                                return r
                        },
                        t.responseInterceptors = t.responseInterceptors || [],
                        t.defaultResponseInterceptor = function(e) {
                                return e
                        },
                        t.responseExtractor = function(e, n, r, i, a, o) {
                                var s = angular.copy(t.responseInterceptors);
                                s.push(t.defaultResponseInterceptor);
                                var l = e;
                                return _.each(s,
                                function(e) {
                                        l = e(l, n, r, i, a, o)
                                }),
                                l
                        },
                        e.addResponseInterceptor = function(e) {
                                return t.responseInterceptors.push(e),
                                this
                        },
                        e.setResponseInterceptor = e.addResponseInterceptor,
                        e.setResponseExtractor = e.addResponseInterceptor,
                        t.requestInterceptors = t.requestInterceptors || [],
                        t.defaultInterceptor = function(e, t, n, r, i, a, o) {
                                return {
                                        element: e,
                                        headers: i,
                                        params: a,
                                        httpConfig: o
                                }
                        },
                        t.fullRequestInterceptor = function(e, n, r, i, a, o, s) {
                                var l = angular.copy(t.requestInterceptors);
                                return l.push(t.defaultInterceptor),
                                _.reduce(l,
                                function(t, l) {
                                        return _.defaults(t, l(e, n, r, i, a, o, s))
                                },
                                {})
                        },
                        e.addRequestInterceptor = function(e) {
                                return t.requestInterceptors.push(function(t, n, r, i, a, o, s) {
                                        return {
                                                headers: a,
                                                params: o,
                                                element: e(t, n, r, i),
                                                httpConfig: s
                                        }
                                }),
                                this
                        },
                        e.setRequestInterceptor = e.addRequestInterceptor,
                        e.addFullRequestInterceptor = function(e) {
                                return t.requestInterceptors.push(e),
                                this
                        },
                        e.setFullRequestInterceptor = e.addFullRequestInterceptor,
                        t.errorInterceptor = t.errorInterceptor || function() {},
                        e.setErrorInterceptor = function(e) {
                                return t.errorInterceptor = e,
                                this
                        },
                        t.onBeforeElemRestangularized = t.onBeforeElemRestangularized || function(e) {
                                return e
                        },
                        e.setOnBeforeElemRestangularized = function(e) {
                                return t.onBeforeElemRestangularized = e,
                                this
                        },
                        t.onElemRestangularized = t.onElemRestangularized || function(e) {
                                return e
                        },
                        e.setOnElemRestangularized = function(e) {
                                return t.onElemRestangularized = e,
                                this
                        },
                        t.shouldSaveParent = t.shouldSaveParent || function() {
                                return ! 0
                        },
                        e.setParentless = function(e) {
                                return _.isArray(e) ? t.shouldSaveParent = function(t) {
                                        return ! _.contains(e, t)
                                }: _.isBoolean(e) && (t.shouldSaveParent = function() {
                                        return ! e
                                }),
                                this
                        },
                        t.suffix = _.isUndefined(t.suffix) ? null: t.suffix,
                        e.setRequestSuffix = function(e) {
                                return t.suffix = e,
                                this
                        },
                        t.transformers = t.transformers || {},
                        e.addElementTransformer = function(e, n, r) {
                                var i = null,
                                a = null;
                                2 === arguments.length ? a = n: (a = r, i = n);
                                var o = t.transformers[e];
                                o || (o = t.transformers[e] = []),
                                o.push(function(e, t) {
                                        return _.isNull(i) || e == i ? a(t) : t
                                })
                        },
                        e.extendCollection = function(t, n) {
                                return e.addElementTransformer(t, !0, n)
                        },
                        e.extendModel = function(t, n) {
                                return e.addElementTransformer(t, !1, n)
                        },
                        t.transformElem = function(e, n, r, i) {
                                if (!t.transformLocalElements && !e[t.restangularFields.fromServer]) return e;
                                var a = t.transformers[r],
                                o = e;
                                return a && _.each(a,
                                function(e) {
                                        o = e(n, o)
                                }),
                                t.onElemRestangularized(o, n, r, i)
                        },
                        t.transformLocalElements = _.isUndefined(t.transformLocalElements) ? !0 : t.transformLocalElements,
                        e.setTransformOnlyServerElements = function(e) {
                                t.transformLocalElements = !e
                        },
                        t.fullResponse = _.isUndefined(t.fullResponse) ? !1 : t.fullResponse,
                        e.setFullResponse = function(e) {
                                return t.fullResponse = e,
                                this
                        },
                        t.urlCreatorFactory = {};
                        var a = function() {};
                        a.prototype.setConfig = function(e) {
                                return this.config = e,
                                this
                        },
                        a.prototype.parentsArray = function(e) {
                                for (var t = []; e;) t.push(e),
                                e = e[this.config.restangularFields.parentResource];
                                return t.reverse()
                        },
                        a.prototype.resource = function(e, r, i, a, o, s, l, u) {
                                var c = _.defaults(o || {},
                                this.config.defaultRequestParams.common),
                                d = _.defaults(a || {},
                                this.config.defaultHeaders);
                                l && (t.isSafe(u) ? d["If-None-Match"] = l: d["If-Match"] = l);
                                var h = this.base(e);
                                if (s) {
                                        var f = "";
                                        /\/$/.test(h) || (f += "/"),
                                        f += s,
                                        h += f
                                }
                                return this.config.suffix && -1 === h.indexOf(this.config.suffix, h.length - this.config.suffix.length) && !this.config.getUrlFromElem(e) && (h += this.config.suffix),
                                e[this.config.restangularFields.httpConfig] = void 0,
                                n(this.config, r, h, {
                                        getList: this.config.withHttpValues(i, {
                                                method: "GET",
                                                params: c,
                                                headers: d
                                        }),
                                        get: this.config.withHttpValues(i, {
                                                method: "GET",
                                                params: c,
                                                headers: d
                                        }),
                                        jsonp: this.config.withHttpValues(i, {
                                                method: "jsonp",
                                                params: c,
                                                headers: d
                                        }),
                                        put: this.config.withHttpValues(i, {
                                                method: "PUT",
                                                params: c,
                                                headers: d
                                        }),
                                        post: this.config.withHttpValues(i, {
                                                method: "POST",
                                                params: c,
                                                headers: d
                                        }),
                                        remove: this.config.withHttpValues(i, {
                                                method: "DELETE",
                                                params: c,
                                                headers: d
                                        }),
                                        head: this.config.withHttpValues(i, {
                                                method: "HEAD",
                                                params: c,
                                                headers: d
                                        }),
                                        trace: this.config.withHttpValues(i, {
                                                method: "TRACE",
                                                params: c,
                                                headers: d
                                        }),
                                        options: this.config.withHttpValues(i, {
                                                method: "OPTIONS",
                                                params: c,
                                                headers: d
                                        }),
                                        patch: this.config.withHttpValues(i, {
                                                method: "PATCH",
                                                params: c,
                                                headers: d
                                        })
                                })
                        };
                        var o = function() {};
                        o.prototype = new a,
                        o.prototype.base = function(e) {
                                var n = this;
                                return _.reduce(this.parentsArray(e),
                                function(e, r) {
                                        var i, a = n.config.getUrlFromElem(r);
                                        if (a) {
                                                if (n.config.isAbsoluteUrl(a)) return a;
                                                i = a
                                        } else if (i = r[n.config.restangularFields.route], r[n.config.restangularFields.restangularCollection]) {
                                                var o = r[n.config.restangularFields.ids];
                                                o && (i += "/" + o.join(","))
                                        } else {
                                                var s;
                                                s = n.config.useCannonicalId ? n.config.getCannonicalIdFromElem(r) : n.config.getIdFromElem(r),
                                                t.isValidId(s) && (i += "/" + (n.config.encodeIds ? encodeURIComponent(s) : s))
                                        }
                                        return e.replace(/\/$/, "") + "/" + i
                                },
                                this.config.baseUrl)
                        },
                        o.prototype.fetchUrl = function(e, t) {
                                var n = this.base(e);
                                return t && (n += "/" + t),
                                n
                        },
                        o.prototype.fetchRequestedUrl = function(e, n) {
                                function r(e) {
                                        var t = [];
                                        for (var n in e) e.hasOwnProperty(n) && t.push(n);
                                        return t.sort()
                                }
                                function i(e, t, n) {
                                        for (var i = r(e), a = 0; a < i.length; a++) t.call(n, e[i[a]], i[a]);
                                        return i
                                }
                                function a(e, t) {
                                        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20": "+")
                                }
                                var o = this.fetchUrl(e, n),
                                s = e[t.restangularFields.reqParams];
                                if (!s) return o;
                                var l = [];
                                return i(s,
                                function(e, t) {
                                        null != e && void 0 != e && (angular.isArray(e) || (e = [e]), angular.forEach(e,
                                        function(e) {
                                                angular.isObject(e) && (e = angular.toJson(e)),
                                                l.push(a(t) + "=" + a(e))
                                        }))
                                }),
                                o + (this.config.suffix || "") + ( - 1 === o.indexOf("?") ? "?": "&") + l.join("&")
                        },
                        t.urlCreatorFactory.path = o
                };
                var t = {};
                e.init(this, t),
                this.$get = ["$http", "$q", function(n, r) {
                        function i(t) {
                                function a(e, n, r, i, a) {
                                        if (n[t.restangularFields.route] = r, n[t.restangularFields.getRestangularUrl] = _.bind(j.fetchUrl, j, n), n[t.restangularFields.getRequestedUrl] = _.bind(j.fetchRequestedUrl, j, n), n[t.restangularFields.addRestangularMethod] = _.bind(R, n), n[t.restangularFields.clone] = _.bind(v, n, n), n[t.restangularFields.reqParams] = _.isEmpty(i) ? null: i, n[t.restangularFields.withHttpConfig] = _.bind(D, n), n[t.restangularFields.one] = _.bind(o, n, n), n[t.restangularFields.all] = _.bind(s, n, n), n[t.restangularFields.several] = _.bind(l, n, n), n[t.restangularFields.oneUrl] = _.bind(u, n, n), n[t.restangularFields.allUrl] = _.bind(c, n, n), n[t.restangularFields.fromServer] = !!a, e && t.shouldSaveParent(r)) {
                                                var d = t.getIdFromElem(e),
                                                h = t.getUrlFromElem(e),
                                                f = _.union(_.values(_.pick(t.restangularFields, ["route", "parentResource"])), t.extraFields),
                                                p = _.pick(e, f);
                                                t.isValidId(d) && t.setIdToElem(p, d),
                                                t.isValidId(h) && t.setUrlToElem(p, h),
                                                n[t.restangularFields.parentResource] = p
                                        } else n[t.restangularFields.parentResource] = null;
                                        return n
                                }
                                function o(e, n, r) {
                                        if (_.isNumber(n) || _.isNumber(e)) {
                                                var i = "You're creating a Restangular entity with the number ";
                                                throw i += "instead of the route or the parent. You can't call .one(12)",
                                                new Error(i)
                                        }
                                        var a = {};
                                        return t.setIdToElem(a, r),
                                        y(e, a, n, !1)
                                }
                                function s(e, t) {
                                        return b(e, [], t, !1)
                                }
                                function l(e, n) {
                                        var r = [];
                                        return r[t.restangularFields.ids] = Array.prototype.splice.call(arguments, 2),
                                        b(e, r, n, !1)
                                }
                                function u(e, n, r) {
                                        if (!n) throw new Error("Route is mandatory when creating new Restangular objects.");
                                        var i = {};
                                        return t.setUrlToElem(i, r),
                                        y(e, i, n, !1)
                                }
                                function c(e, n, r) {
                                        if (!n) throw new Error("Route is mandatory when creating new Restangular objects.");
                                        var i = {};
                                        return t.setUrlToElem(i, r),
                                        b(e, i, n, !1)
                                }
                                function d(e, n, r) {
                                        return e.call = _.bind(h, e),
                                        e.get = _.bind(f, e),
                                        e[t.restangularFields.restangularCollection] = n,
                                        n && (e.push = _.bind(h, e, "push")),
                                        e.$object = r,
                                        e
                                }
                                function h(e) {
                                        var n = r.defer(),
                                        i = arguments,
                                        a = {};
                                        return this.then(function(t) {
                                                var r = Array.prototype.slice.call(i, 1),
                                                o = t[e];
                                                o.apply(t, r),
                                                a = t,
                                                n.resolve(t)
                                        }),
                                        d(n.promise, this[t.restangularFields.restangularCollection], a)
                                }
                                function f(e) {
                                        var n = r.defer(),
                                        i = {};
                                        return this.then(function(t) {
                                                i = t[e],
                                                n.resolve(i)
                                        }),
                                        d(n.promise, this[t.restangularFields.restangularCollection], i)
                                }
                                function p(e, n, r, i) {
                                        return _.extend(i, r),
                                        t.fullResponse ? e.resolve(_.extend(n, {
                                                data: r
                                        })) : void e.resolve(r, n.headers)
                                }
                                function g(e) {
                                        if (_.isArray(e)) {
                                                var n = [];
                                                return _.each(e,
                                                function(e) {
                                                        n.push(g(e))
                                                }),
                                                n
                                        }
                                        return _.omit(e, _.values(_.omit(t.restangularFields, "id")))
                                }
                                function m(e) {
                                        e[t.restangularFields.customOperation] = _.bind(I, e),
                                        _.each(["put", "post", "get", "delete"],
                                        function(t) {
                                                _.each(["do", "custom"],
                                                function(n) {
                                                        var r, i = "delete" === t ? "remove": t,
                                                        a = n + t.toUpperCase();
                                                        r = "put" !== i && "post" !== i ? I: function(e, t, n, r, i) {
                                                                return _.bind(I, this)(e, n, r, i, t)
                                                        },
                                                        e[a] = _.bind(r, e, i)
                                                })
                                        }),
                                        e[t.restangularFields.customGETLIST] = _.bind(C, e),
                                        e[t.restangularFields.doGETLIST] = e[t.restangularFields.customGETLIST]
                                }
                                function v(e) {
                                        var n = angular.copy(e);
                                        return y(n[t.restangularFields.parentResource], n, n[t.restangularFields.route], !0)
                                }
                                function y(e, n, r, i, o, s) {
                                        var l = t.onBeforeElemRestangularized(n, !1, r),
                                        u = a(e, l, r, s, i);
                                        return t.useCannonicalId && (u[t.restangularFields.cannonicalId] = t.getIdFromElem(u)),
                                        o && (u[t.restangularFields.getParentList] = function() {
                                                return o
                                        }),
                                        u[t.restangularFields.restangularCollection] = !1,
                                        u[t.restangularFields.get] = _.bind(T, u),
                                        u[t.restangularFields.getList] = _.bind(C, u),
                                        u[t.restangularFields.put] = _.bind(M, u),
                                        u[t.restangularFields.post] = _.bind(E, u),
                                        u[t.restangularFields.remove] = _.bind(A, u),
                                        u[t.restangularFields.head] = _.bind(P, u),
                                        u[t.restangularFields.trace] = _.bind(F, u),
                                        u[t.restangularFields.options] = _.bind(L, u),
                                        u[t.restangularFields.patch] = _.bind(O, u),
                                        m(u),
                                        t.transformElem(u, !1, r, H)
                                }
                                function b(e, n, r, i, o) {
                                        var s = t.onBeforeElemRestangularized(n, !0, r),
                                        l = a(e, s, r, o, i);
                                        return l[t.restangularFields.restangularCollection] = !0,
                                        l[t.restangularFields.post] = _.bind(E, l, null),
                                        l[t.restangularFields.remove] = _.bind(A, l),
                                        l[t.restangularFields.head] = _.bind(P, l),
                                        l[t.restangularFields.trace] = _.bind(F, l),
                                        l[t.restangularFields.putElement] = _.bind($, l),
                                        l[t.restangularFields.options] = _.bind(L, l),
                                        l[t.restangularFields.patch] = _.bind(O, l),
                                        l[t.restangularFields.get] = _.bind(w, l),
                                        l[t.restangularFields.getList] = _.bind(C, l, null),
                                        m(l),
                                        t.transformElem(l, !0, r, H)
                                }
                                function x(e, t, n) {
                                        var r = b(e, t, n, !1);
                                        return _.each(r,
                                        function(t) {
                                                y(e, t, n, !1)
                                        }),
                                        r
                                }
                                function w(e, t, n) {
                                        return this.customGET(e.toString(), t, n)
                                }
                                function $(e, n, i) {
                                        var a = this,
                                        o = this[e],
                                        s = r.defer(),
                                        l = [];
                                        return l = t.transformElem(l, !0, whatFetched, H),
                                        o.put(n, i).then(function(t) {
                                                var n = v(a);
                                                n[e] = t,
                                                l = n,
                                                s.resolve(n)
                                        },
                                        function(e) {
                                                s.reject(e)
                                        }),
                                        d(s.promise, !0, l)
                                }
                                function k(e, n, r, i, a, o) {
                                        var s = t.responseExtractor(e, n, r, i, a, o),
                                        l = a.headers("ETag");
                                        return s && l && (s[t.restangularFields.etag] = l),
                                        s
                                }
                                function C(e, i, a) {
                                        var o = this,
                                        s = r.defer(),
                                        l = "getList",
                                        u = j.fetchUrl(this, e),
                                        c = e || o[t.restangularFields.route],
                                        h = t.fullRequestInterceptor(null, l, c, u, a || {},
                                        i || {},
                                        this[t.restangularFields.httpConfig] || {}),
                                        f = [];
                                        f = t.transformElem(f, !0, c, H);
                                        var g = "getList";
                                        return t.jsonp && (g = "jsonp"),
                                        j.resource(this, n, h.httpConfig, h.headers, h.params, e, this[t.restangularFields.etag], l)[g]().then(function(n) {
                                                var r = n.data,
                                                i = n.config.params,
                                                a = k(r, l, c, u, n, s);
                                                if (!_.isArray(a)) throw new Error("Response for getList SHOULD be an array and not an object or something else");
                                                var d = _.map(a,
                                                function(n) {
                                                        return o[t.restangularFields.restangularCollection] ? y(o[t.restangularFields.parentResource], n, o[t.restangularFields.route], !0, a) : y(o, n, e, !0, a)
                                                });
                                                d = _.extend(a, d),
                                                o[t.restangularFields.restangularCollection] ? p(s, n, b(o[t.restangularFields.parentResource], d, o[t.restangularFields.route], !0, i), f) : p(s, n, b(o, d, e, !0, i), f)
                                        },
                                        function(e) {
                                                304 === e.status && o[t.restangularFields.restangularCollection] ? p(s, e, o, f) : t.errorInterceptor(e, s) !== !1 && s.reject(e)
                                        }),
                                        d(s.promise, !0, f)
                                }
                                function D(e) {
                                        return this[t.restangularFields.httpConfig] = e,
                                        this
                                }
                                function S(e, i, a, o, s) {
                                        var l = this,
                                        u = r.defer(),
                                        c = a || {},
                                        h = i || this[t.restangularFields.route],
                                        f = j.fetchUrl(this, i),
                                        m = o || this,
                                        v = m[t.restangularFields.etag] || ("post" != e ? this[t.restangularFields.etag] : null);
                                        _.isObject(m) && t.isRestangularized(m) && (m = g(m));
                                        var b = t.fullRequestInterceptor(m, e, h, f, s || {},
                                        c || {},
                                        this[t.restangularFields.httpConfig] || {}),
                                        x = {};
                                        x = t.transformElem(x, !1, h, H);
                                        var w = function(n) {
                                                var r = n.data,
                                                a = n.config.params,
                                                o = k(r, e, h, f, n, u);
                                                o ? "post" !== e || l[t.restangularFields.restangularCollection] ? p(u, n, y(l[t.restangularFields.parentResource], o, l[t.restangularFields.route], !0, null, a), x) : p(u, n, y(l, o, i, !0, null, a), x) : p(u, n, void 0, x)
                                        },
                                        $ = function(n) {
                                                304 === n.status && t.isSafe(e) ? p(u, n, l, x) : t.errorInterceptor(n, u) !== !1 && u.reject(n)
                                        },
                                        C = e,
                                        D = _.extend({},
                                        b.headers),
                                        S = t.isOverridenMethod(e);
                                        return S ? (C = "post", D = _.extend(D, {
                                                "X-HTTP-Method-Override": "remove" === e ? "DELETE": e
                                        })) : t.jsonp && "get" === C && (C = "jsonp"),
                                        t.isSafe(e) ? S ? j.resource(this, n, b.httpConfig, D, b.params, i, v, C)[C]({}).then(w, $) : j.resource(this, n, b.httpConfig, D, b.params, i, v, C)[C]().then(w, $) : j.resource(this, n, b.httpConfig, D, b.params, i, v, C)[C](b.element).then(w, $),
                                        d(u.promise, !1, x)
                                }
                                function T(e, t) {
                                        return _.bind(S, this)("get", void 0, e, void 0, t)
                                }
                                function A(e, t) {
                                        return _.bind(S, this)("remove", void 0, e, void 0, t)
                                }
                                function M(e, t) {
                                        return _.bind(S, this)("put", void 0, e, void 0, t)
                                }
                                function E(e, t, n, r) {
                                        return _.bind(S, this)("post", e, n, t, r)
                                }
                                function P(e, t) {
                                        return _.bind(S, this)("head", void 0, e, void 0, t)
                                }
                                function F(e, t) {
                                        return _.bind(S, this)("trace", void 0, e, void 0, t)
                                }
                                function L(e, t) {
                                        return _.bind(S, this)("options", void 0, e, void 0, t)
                                }
                                function O(e, t, n) {
                                        return _.bind(S, this)("patch", void 0, t, e, n)
                                }
                                function I(e, t, n, r, i) {
                                        return _.bind(S, this)(e, t, n, i, r)
                                }
                                function R(e, n, r, i, a, o) {
                                        var s;
                                        s = "getList" === n ? _.bind(C, this, r) : _.bind(I, this, n, r);
                                        var l = function(e, t, n) {
                                                var r = _.defaults({
                                                        params: e,
                                                        headers: t,
                                                        elem: n
                                                },
                                                {
                                                        params: i,
                                                        headers: a,
                                                        elem: o
                                                });
                                                return s(r.params, r.headers, r.elem)
                                        };
                                        this[e] = t.isSafe(n) ? l: function(e, t, n) {
                                                return l(t, n, e)
                                        }
                                }
                                function N(n) {
                                        var r = angular.copy(_.omit(t, "configuration"));
                                        return e.init(r, r),
                                        n(r),
                                        i(r)
                                }
                                var H = {},
                                j = new t.urlCreatorFactory[t.urlCreator];
                                return j.setConfig(t),
                                e.init(H, t),
                                H.copy = _.bind(v, H),
                                H.withConfig = _.bind(N, H),
                                H.one = _.bind(o, H, null),
                                H.all = _.bind(s, H, null),
                                H.several = _.bind(l, H, null),
                                H.oneUrl = _.bind(u, H, null),
                                H.allUrl = _.bind(c, H, null),
                                H.stripRestangular = _.bind(g, H),
                                H.restangularizeElement = _.bind(y, H),
                                H.restangularizeCollection = _.bind(x, H),
                                H
                        }
                        return i(t)
                }]
        })
}()
