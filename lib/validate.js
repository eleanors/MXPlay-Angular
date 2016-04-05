
!function(e) {
        e.extend(e.fn, {
                validate: function(t) {
                        if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                        var n = e.data(this[0], "validate");
                        return n ? n: (this.attr("novalidate", "novalidate"), n = new e.validate(t, this[0]), e.data(this[0], "validate", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click",
                        function(t) {
                                n.settings.submitHandler && (n.submitButton = t.target),
                                e(t.target).hasClass("cancel") && (n.cancelSubmit = !0),
                                void 0 !== e(t.target).attr("formnovalidate") && (n.cancelSubmit = !0)
                        }), this.submit(function(t) {
                                function r() {
                                        var r;
                                        return n.settings.submitHandler ? (n.submitButton && (r = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)), n.settings.submitHandler.call(n, n.currentForm, t), n.submitButton && r.remove(), !1) : !0
                                }
                                return n.settings.debug && t.preventDefault(),
                                n.cancelSubmit ? (n.cancelSubmit = !1, r()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : r() : (n.focusInvalid(), !1)
                        })), n)
                },
                valid: function() {
                        var t, n;
                        return e(this[0]).is("form") ? t = this.validate().form() : (t = !0, n = e(this[0].form).validate(), this.each(function() {
                                t = n.element(this) && t
                        })),
                        t
                },
                removeAttrs: function(t) {
                        var n = {},
                        r = this;
                        return e.each(t.split(/\s/),
                        function(e, t) {
                                n[t] = r.attr(t),
                                r.removeAttr(t)
                        }),
                        n
                },
                rules: function(t, n) {
                        var r, i, a, o, s, l, u = this[0];
                        if (t) switch (r = e.data(u.form, "validate").settings, i = r.rules, a = e.validate.staticRules(u), t) {
                        case "add":
                                e.extend(a, e.validate.normalizeRule(n)),
                                delete a.messages,
                                i[u.name] = a,
                                n.messages && (r.messages[u.name] = e.extend(r.messages[u.name], n.messages));
                                break;
                        case "remove":
                                return n ? (l = {},
                                e.each(n.split(/\s/),
                                function(t, n) {
                                        l[n] = a[n],
                                        delete a[n],
                                        "required" === n && e(u).removeAttr("aria-required")
                                }), l) : (delete i[u.name], a)
                        }
                        return o = e.validate.normalizeRules(e.extend({},
                        e.validate.classRules(u), e.validate.attributeRules(u), e.validate.dataRules(u), e.validate.staticRules(u)), u),
                        o.required && (s = o.required, delete o.required, o = e.extend({
                                required: s
                        },
                        o), e(u).attr("aria-required", "true")),
                        o.remote && (s = o.remote, delete o.remote, o = e.extend(o, {
                                remote: s
                        })),
                        o
                }
        }),
        e.extend(e.expr[":"], {
                blank: function(t) {
                        return ! e.trim("" + e(t).val())
                },
                filled: function(t) {
                        return !! e.trim("" + e(t).val())
                },
                unchecked: function(t) {
                        return ! e(t).prop("checked")
                }
        }),
        e.validate = function(t, n) {
                this.settings = e.extend(!0, {},
                e.validate.defaults, t),
                this.currentForm = n,
                this.init()
        },
        e.validate.format = function(t, n) {
                return 1 === arguments.length ?
                function() {
                        var n = e.makeArray(arguments);
                        return n.unshift(t),
                        e.validate.format.apply(this, n)
                }: (arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), e.each(n,
                function(e, n) {
                        t = t.replace(new RegExp("\\{" + e + "\\}", "g"),
                        function() {
                                return n
                        })
                }), t)
        },
        e.extend(e.validate, {
                defaults: {
                        messages: {},
                        groups: {},
                        rules: {},
                        errorClass: "error",
                        validClass: "valid",
                        errorElement: "label",
                        focusInvalid: !0,
                        errorContainer: e([]),
                        errorLabelContainer: e([]),
                        onsubmit: !0,
                        ignore: ":hidden",
                        ignoreTitle: !0,
                        onfocusin: function(e) {
                                this.lastActive = e,
                                this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(e)).hide())
                        },
                        onfocusout: function(t) {
                                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t),
                                e(t).valid()
                        },
                        onkeyup: function(t, n) { (9 !== n.which || "" !== this.elementValue(t)) && ((t.name in this.submitted || t === this.lastElement) && this.element(t), e(t).valid())
                        },
                        onclick: function(e) {
                                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
                        },
                        highlight: function(t, n, r) {
                                "radio" === t.type ? this.findByName(t.name).addClass(n).removeClass(r) : e(t).addClass(n).removeClass(r)
                        },
                        unhighlight: function(t, n, r) {
                                "radio" === t.type ? this.findByName(t.name).removeClass(n).addClass(r) : e(t).removeClass(n).addClass(r)
                        }
                },
                setDefaults: function(t) {
                        e.extend(e.validate.defaults, t)
                },
                messages: {
                        required: "必须填写",
                        remote: "请修正此栏位",
                        email: "请输入有效的电子邮件",
                        url: "请输入有效的网址",
                        date: "请输入有效的日期",
                        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
                        number: "请输入正确的数字",
                        digits: "只可输入数字",
                        creditcard: "请输入有效的信用卡号码",
                        equalTo: "你的输入不相同",
                        extension: "请输入有效的后缀",
                        maxlength: e.validate.format("最多 {0} 个字"),
                        minlength: e.validate.format("最少 {0} 个字"),
                        rangelength: e.validate.format("请输入长度为 {0} 至 {1} 之间的字符串"),
                        range: e.validate.format("请输入 {0} 至 {1} 之间的数值"),
                        max: e.validate.format("请输入不大于 {0} 的数值"),
                        min: e.validate.format("请输入不小于 {0} 的数值")
                },
                autoCreateRanges: !1,
                prototype: {
                        init: function() {
                                function t(t) {
                                        var n = e.data(this[0].form, "validate"),
                                        r = "on" + t.type.replace(/^validate/, ""),
                                        i = n.settings;
                                        i[r] && !this.is(i.ignore) && i[r].call(n, this[0], t)
                                }
                                this.labelContainer = e(this.settings.errorLabelContainer),
                                this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm),
                                this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                                this.submitted = {},
                                this.valueCache = {},
                                this.pendingRequest = 0,
                                this.pending = {},
                                this.invalid = {},
                                this.reset();
                                var n, r = this.groups = {};
                                e.each(this.settings.groups,
                                function(t, n) {
                                        "string" == typeof n && (n = n.split(/\s/)),
                                        e.each(n,
                                        function(e, n) {
                                                r[n] = t
                                        })
                                }),
                                n = this.settings.rules,
                                e.each(n,
                                function(t, r) {
                                        n[t] = e.validate.normalizeRule(r)
                                }),
                                e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", t).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", t),
                                this.settings.invalidHandler && e(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler),
                                e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                        },
                        form: function() {
                                return this.checkForm(),
                                e.extend(this.submitted, this.errorMap),
                                this.invalid = e.extend({},
                                this.errorMap),
                                this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]),
                                this.showErrors(),
                                this.valid()
                        },
                        checkForm: function() {
                                this.prepareForm();
                                for (var e = 0,
                                t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                                return this.valid()
                        },
                        element: function(t) {
                                var n = this.clean(t),
                                r = this.validationTargetFor(n),
                                i = !0;
                                return this.lastElement = r,
                                void 0 === r ? delete this.invalid[n.name] : (this.prepareElement(r), this.currentElements = e(r), i = this.check(r) !== !1, i ? delete this.invalid[r.name] : this.invalid[r.name] = !0),
                                e(t).attr("aria-invalid", !i),
                                this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                                this.showErrors(),
                                i
                        },
                        showErrors: function(t) {
                                if (t) {
                                        e.extend(this.errorMap, t),
                                        this.errorList = [];
                                        for (var n in t) this.errorList.push({
                                                message: t[n],
                                                element: this.findByName(n)[0]
                                        });
                                        this.successList = e.grep(this.successList,
                                        function(e) {
                                                return ! (e.name in t)
                                        })
                                }
                                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                        },
                        resetForm: function() {
                                e.fn.resetForm && e(this.currentForm).resetForm(),
                                this.submitted = {},
                                this.lastElement = null,
                                this.prepareForm(),
                                this.hideErrors(),
                                this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
                        },
                        numberOfInvalids: function() {
                                return this.objectLength(this.invalid)
                        },
                        objectLength: function(e) {
                                var t, n = 0;
                                for (t in e) n++;
                                return n
                        },
                        hideErrors: function() {
                                this.addWrapper(this.toHide).hide()
                        },
                        valid: function() {
                                return 0 === this.size()
                        },
                        size: function() {
                                return this.errorList.length
                        },
                        focusInvalid: function() {
                                if (this.settings.focusInvalid) try {
                                        e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                                } catch(t) {}
                        },
                        findLastActive: function() {
                                var t = this.lastActive;
                                return t && 1 === e.grep(this.errorList,
                                function(e) {
                                        return e.element.name === t.name
                                }).length && t
                        },
                        elements: function() {
                                var t = this,
                                n = {};
                                return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                                        return ! this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this),
                                        this.name in n || !t.objectLength(e(this).rules()) ? !1 : (n[this.name] = !0, !0)
                                })
                        },
                        clean: function(t) {
                                return e(t)[0]
                        },
                        errors: function() {
                                var t = this.settings.errorClass.split(" ").join(".");
                                return e(this.settings.errorElement + "." + t, this.errorContext)
                        },
                        reset: function() {
                                this.successList = [],
                                this.errorList = [],
                                this.errorMap = {},
                                this.toShow = e([]),
                                this.toHide = e([]),
                                this.currentElements = e([])
                        },
                        prepareForm: function() {
                                this.reset(),
                                this.toHide = this.errors().add(this.containers)
                        },
                        prepareElement: function(e) {
                                this.reset(),
                                this.toHide = this.errorsFor(e)
                        },
                        elementValue: function(t) {
                                var n, r = e(t),
                                i = r.attr("type");
                                return "radio" === i || "checkbox" === i ? e("input[name='" + r.attr("name") + "']:checked").val() : (n = r.val(), "string" == typeof n ? n.replace(/\r/g, "") : n)
                        },
                        check: function(t) {
                                t = this.validationTargetFor(this.clean(t));
                                var n, r, i, a = e(t).rules(),
                                o = e.map(a,
                                function(e, t) {
                                        return t
                                }).length,
                                s = !1,
                                l = this.elementValue(t);
                                for (r in a) {
                                        i = {
                                                method: r,
                                                parameters: a[r]
                                        };
                                        try {
                                                if (n = e.validate.methods[r].call(this, l, t, i.parameters), "dependency-mismatch" === n && 1 === o) {
                                                        s = !0;
                                                        continue
                                                }
                                                if (s = !1, "pending" === n) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                                                if (!n) return this.formatAndAdd(t, i),
                                                !1
                                        } catch(u) {
                                                throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + i.method + "' method.", u),
                                                u
                                        }
                                }
                                if (!s) return this.objectLength(a) && this.successList.push(t),
                                !0
                        },
                        customDataMessage: function(t, n) {
                                return e(t).data("msg" + n[0].toUpperCase() + n.substring(1).toLowerCase()) || e(t).data("msg")
                        },
                        customMessage: function(e, t) {
                                var n = this.settings.messages[e];
                                return n && (n.constructor === String ? n: n[t])
                        },
                        findDefined: function() {
                                for (var e = 0; e < arguments.length; e++) if (void 0 !== arguments[e]) return arguments[e];
                                return void 0
                        },
                        defaultMessage: function(t, n) {
                                return this.findDefined(this.customMessage(t.name, n), this.customDataMessage(t, n), !this.settings.ignoreTitle && t.title || void 0, e.validate.messages[n], "<strong>Warning: No message defined for " + t.name + "</strong>")
                        },
                        formatAndAdd: function(t, n) {
                                var r = this.defaultMessage(t, n.method),
                                i = /\$?\{(\d+)\}/g;
                                "function" == typeof r ? r = r.call(this, n.parameters, t) : i.test(r) && (r = e.validate.format(r.replace(i, "{$1}"), n.parameters)),
                                this.errorList.push({
                                        message: r,
                                        element: t,
                                        method: n.method
                                }),
                                this.errorMap[t.name] = r,
                                this.submitted[t.name] = r
                        },
                        addWrapper: function(e) {
                                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))),
                                e
                        },
                        defaultShowErrors: function() {
                                var e, t, n;
                                for (e = 0; this.errorList[e]; e++) n = this.errorList[e],
                                this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass),
                                this.showLabel(n.element, n.message);
                                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                                if (this.settings.unhighlight) for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                                this.toHide = this.toHide.not(this.toShow),
                                this.hideErrors(),
                                this.addWrapper(this.toShow).show()
                        },
                        validElements: function() {
                                return this.currentElements.not(this.invalidElements())
                        },
                        invalidElements: function() {
                                return e(this.errorList).map(function() {
                                        return this.element
                                })
                        },
                        showLabel: function(t, n) {
                                var r = this.errorsFor(t);
                                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(n)) : (r = e("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, e(t)) : r.insertAfter(t))),
                                !n && this.settings.success && (r.text().length > 0 && r.fadeOut(function() {
                                        e(this).text("")
                                }), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t)),
                                this.toShow = this.toShow.add(r)
                        },
                        errorsFor: function(t) {
                                var n = this.idOrName(t);
                                return this.errors().filter(function() {
                                        return e(this).attr("for") === n
                                })
                        },
                        idOrName: function(e) {
                                return this.groups[e.name] || (this.checkable(e) ? e.name: e.id || e.name)
                        },
                        validationTargetFor: function(e) {
                                return this.checkable(e) && (e = this.findByName(e.name).not(this.settings.ignore)[0]),
                                e
                        },
                        checkable: function(e) {
                                return /radio|checkbox/i.test(e.type)
                        },
                        findByName: function(t) {
                                return e(this.currentForm).find("[name='" + t + "']")
                        },
                        getLength: function(t, n) {
                                switch (n.nodeName.toLowerCase()) {
                                case "select":
                                        return e("option:selected", n).length;
                                case "input":
                                        if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                                }
                                return t.length
                        },
                        depend: function(e, t) {
                                return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, t) : !0
                        },
                        dependTypes: {
                                "boolean": function(e) {
                                        return e
                                },
                                string: function(t, n) {
                                        return !! e(t, n.form).length
                                },
                                "function": function(e, t) {
                                        return e(t)
                                }
                        },
                        optional: function(t) {
                                var n = this.elementValue(t);
                                return ! e.validate.methods.required.call(this, n, t) && "dependency-mismatch"
                        },
                        startRequest: function(e) {
                                this.pending[e.name] || (this.pendingRequest++, this.pending[e.name] = !0)
                        },
                        stopRequest: function(t, n) {
                                this.pendingRequest--,
                                this.pendingRequest < 0 && (this.pendingRequest = 0),
                                delete this.pending[t.name],
                                n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !n && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                        },
                        previousValue: function(t) {
                                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                                        old: null,
                                        valid: !0,
                                        message: this.defaultMessage(t, "remote")
                                })
                        }
                },
                classRuleSettings: {
                        required: {
                                required: !0
                        },
                        email: {
                                email: !0
                        },
                        url: {
                                url: !0
                        },
                        date: {
                                date: !0
                        },
                        dateISO: {
                                dateISO: !0
                        },
                        number: {
                                number: !0
                        },
                        digits: {
                                digits: !0
                        },
                        creditcard: {
                                creditcard: !0
                        }
                },
                addClassRules: function(t, n) {
                        t.constructor === String ? this.classRuleSettings[t] = n: e.extend(this.classRuleSettings, t)
                },
                classRules: function(t) {
                        var n = {},
                        r = e(t).attr("class");
                        return r && e.each(r.split(" "),
                        function() {
                                this in e.validate.classRuleSettings && e.extend(n, e.validate.classRuleSettings[this])
                        }),
                        n
                },
                attributeRules: function(t) {
                        var n, r, i = {},
                        a = e(t),
                        o = t.getAttribute("type");
                        for (n in e.validate.methods)"required" === n ? (r = t.getAttribute(n), "" === r && (r = !0), r = !!r) : r = a.attr(n),
                        /min|max/.test(n) && (null === o || /number|range|text/.test(o)) && (r = Number(r)),
                        r || 0 === r ? i[n] = r: o === n && "range" !== o && (i[n] = !0);
                        return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength,
                        i
                },
                dataRules: function(t) {
                        var n, r, i = {},
                        a = e(t);
                        for (n in e.validate.methods) r = a.data("rule" + n[0].toUpperCase() + n.substring(1).toLowerCase()),
                        void 0 !== r && (i[n] = r);
                        return i
                },
                staticRules: function(t) {
                        var n = {},
                        r = e.data(t.form, "validate");
                        return r.settings.rules && (n = e.validate.normalizeRule(r.settings.rules[t.name]) || {}),
                        n
                },
                normalizeRules: function(t, n) {
                        return e.each(t,
                        function(r, i) {
                                if (i === !1) return void delete t[r];
                                if (i.param || i.depends) {
                                        var a = !0;
                                        switch (typeof i.depends) {
                                        case "string":
                                                a = !!e(i.depends, n.form).length;
                                                break;
                                        case "function":
                                                a = i.depends.call(n, n)
                                        }
                                        a ? t[r] = void 0 !== i.param ? i.param: !0 : delete t[r]
                                }
                        }),
                        e.each(t,
                        function(r, i) {
                                t[r] = e.isFunction(i) ? i(n) : i
                        }),
                        e.each(["minlength", "maxlength"],
                        function() {
                                t[this] && (t[this] = Number(t[this]))
                        }),
                        e.each(["rangelength", "range"],
                        function() {
                                var n;
                                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (n = t[this].split(/[\s,]+/), t[this] = [Number(n[0]), Number(n[1])]))
                        }),
                        e.validate.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)),
                        t
                },
                normalizeRule: function(t) {
                        if ("string" == typeof t) {
                                var n = {};
                                e.each(t.split(/\s/),
                                function() {
                                        n[this] = !0
                                }),
                                t = n
                        }
                        return t
                },
                addMethod: function(t, n, r) {
                        e.validate.methods[t] = n,
                        e.validate.messages[t] = void 0 !== r ? r: e.validate.messages[t],
                        n.length < 3 && e.validate.addClassRules(t, e.validate.normalizeRule(t))
                },
                methods: {
                        required: function(t, n, r) {
                                if (!this.depend(r, n)) return "dependency-mismatch";
                                if ("select" === n.nodeName.toLowerCase()) {
                                        var i = e(n).val();
                                        return i && i.length > 0
                                }
                                return this.checkable(n) ? this.getLength(t, n) > 0 : e.trim(t).length > 0
                        },
                        email: function(e, t) {
                                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
                        },
                        url: function(e, t) {
                                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
                        },
                        date: function(e, t) {
                                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
                        },
                        dateISO: function(e, t) {
                                return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e)
                        },
                        number: function(e, t) {
                                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
                        },
                        digits: function(e, t) {
                                return this.optional(t) || /^\d+$/.test(e)
                        },
                        creditcard: function(e, t) {
                                if (this.optional(t)) return "dependency-mismatch";
                                if (/[^0-9 \-]+/.test(e)) return ! 1;
                                var n, r, i = 0,
                                a = 0,
                                o = !1;
                                if (e = e.replace(/\D/g, ""), e.length < 13 || e.length > 19) return ! 1;
                                for (n = e.length - 1; n >= 0; n--) r = e.charAt(n),
                                a = parseInt(r, 10),
                                o && (a *= 2) > 9 && (a -= 9),
                                i += a,
                                o = !o;
                                return i % 10 === 0
                        },
                        minlength: function(t, n, r) {
                                var i = e.isArray(t) ? t.length: this.getLength(e.trim(t), n);
                                return this.optional(n) || i >= r
                        },
                        maxlength: function(t, n, r) {
                                var i = e.isArray(t) ? t.length: this.getLength(e.trim(t), n);
                                return this.optional(n) || r >= i
                        },
                        rangelength: function(t, n, r) {
                                var i = e.isArray(t) ? t.length: this.getLength(e.trim(t), n);
                                return this.optional(n) || i >= r[0] && i <= r[1]
                        },
                        min: function(e, t, n) {
                                return this.optional(t) || e >= n
                        },
                        max: function(e, t, n) {
                                return this.optional(t) || n >= e
                        },
                        range: function(e, t, n) {
                                return this.optional(t) || e >= n[0] && e <= n[1]
                        },
                        equalTo: function(t, n, r) {
                                var i = e(r);
                                return this.settings.onfocusout && i.unbind(".validate-equalTo").bind("blur.validate-equalTo",
                                function() {
                                        e(n).valid()
                                }),
                                t === i.val()
                        },
                        remote: function(t, n, r) {
                                if (this.optional(n)) return "dependency-mismatch";
                                var i, a, o = this.previousValue(n);
                                return this.settings.messages[n.name] || (this.settings.messages[n.name] = {}),
                                o.originalMessage = this.settings.messages[n.name].remote,
                                this.settings.messages[n.name].remote = o.message,
                                r = "string" == typeof r && {
                                        url: r
                                } || r,
                                o.old === t ? o.valid: (o.old = t, i = this, this.startRequest(n), a = {},
                                a[n.name] = t, e.ajax(e.extend(!0, {
                                        url: r,
                                        mode: "abort",
                                        port: "validate" + n.name,
                                        dataType: "json",
                                        data: a,
                                        context: i.currentForm,
                                        success: function(r) {
                                                var a, s, l, u = r === !0 || "true" === r;
                                                i.settings.messages[n.name].remote = o.originalMessage,
                                                u ? (l = i.formSubmitted, i.prepareElement(n), i.formSubmitted = l, i.successList.push(n), delete i.invalid[n.name], i.showErrors()) : (a = {},
                                                s = r || i.defaultMessage(n, "remote"), a[n.name] = o.message = e.isFunction(s) ? s(t) : s, i.invalid[n.name] = !0, i.showErrors(a)),
                                                o.valid = u,
                                                i.stopRequest(n, u)
                                        }
                                },
                                r)), "pending")
                        }
                }
        }),
        e.format = function() {
                throw "$.format has been deprecated. Please use $.validate.format instead."
        }
} (jQuery),

function(e) {
        var t, n = {};
        e.ajaxPrefilter ? e.ajaxPrefilter(function(e, t, r) {
                var i = e.port;
                "abort" === e.mode && (n[i] && n[i].abort(), n[i] = r)
        }) : (t = e.ajax, e.ajax = function(r) {
                var i = ("mode" in r ? r: e.ajaxSettings).mode,
                a = ("port" in r ? r: e.ajaxSettings).port;
                return "abort" === i ? (n[a] && n[a].abort(), n[a] = t.apply(this, arguments), n[a]) : t.apply(this, arguments)
        })
} (jQuery),


function(e) {
        e.extend(e.fn, {
                validateDelegate: function(t, n, r) {
                        return this.bind(n,  function(n) {
                                var i = e(n.target);
                                return i.is(t) ? r.apply(i, arguments) : void 0
                        })
                }
        })
} (jQuery),




function(e) {
        jQuery.validate.addMethod("letterswithbasicpunc", function(e, t) {
                return this.optional(t) || /^[a-z-.,()'\"\s]+$/i.test(e)
        }, "只允许包括 字母 标点符号"),
		
        jQuery.validate.addMethod("lettersonly", function(e, t) {
                return this.optional(t) || /^[a-z]+$/i.test(e)
        }, "只允许输入字母"),
		
        jQuery.validate.addMethod("nowhitespace",  function(e, t) {
                return this.optional(t) || /^\S+$/i.test(e)
        },  "请不要 输入空格"),
		
        jQuery.validate.addMethod("integer", function(e, t) {
                return this.optional(t) || /^-?\d+$/.test(e)
        }, "请输入一个整数"),
		
        jQuery.validate.addMethod("dateNL", function(e, t) {
                return this.optional(t) || /^\d\d?[\.\/-]\d\d?[\.\/-]\d\d\d?\d?$/.test(e)
        }, "Vul hier een geldige datum in."),
		
        jQuery.validate.addMethod("time", function(e, t) {
                return this.optional(t) || /^([01][0-9])|(2[0123]):([0-5])([0-9])$/.test(e)
        }, "Please enter a valid time, between 00:00 and 23:59"),
		
		
        jQuery.validate.addMethod("phoneUS", function(e, t) {
                return e = e.replace(/\s+/g, ""),
                this.optional(t) || e.length > 9 && e.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
        }, "Please specify a valid phone number"),
		
        jQuery.validate.addMethod("phoneUK", function(e, t) {
                return this.optional(t) || e.length > 9 && e.match(/^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/)
        }, "Please specify a valid phone number"),
		
        jQuery.validate.addMethod("mobileUK", function(e, t) {
                return this.optional(t) || e.length > 9 && e.match(/^((0|\+44)7(5|6|7|8|9){1}\d{2}\s?\d{6})$/)
        }, "Please specify a valid mobile number"),
		
        jQuery.validate.addMethod("strippedminlength", function(e, t, n) {
                return jQuery(e).text().length >= n
        },
        jQuery.validate.format("Please enter at least {0} characters")),
        jQuery.validate.addMethod("email2",
        function(e, t) {
                return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(e)
        },
        jQuery.validate.messages.email),
        jQuery.validate.addMethod("url2",
        function(e, t) {
                return this.optional(t) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
        },
        jQuery.validate.messages.url),
        jQuery.validate.addMethod("ipv4",
        function(e, t) {
                return this.optional(t) || /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i.test(e)
        },
        "请输入一个有效的IP v4地址."),
        jQuery.validate.addMethod("ipv6",
        function(e, t) {
                return this.optional(t) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(e)
        },
        "请输入一个有效的IP版本6的地址."),
        jQuery.validate.addMethod("alphanumeric",
        function(e, t) {
                return this.optional(t) || /^\w+$/i.test(e)
        },
        "只允许包括 字母 数字 空格下划线"),
        jQuery.validate.addMethod("alphanumerics",
        function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9_-]*$/i.test(e)
        },
        "只允许包括 字母 数字 和上下划线 "),
        jQuery.validate.addMethod("username",
        function(e, t) {
                return this.optional(t) || /^[\u0391-\uFFE5\w]+$/.test(e)
        },
        "只允许包含中文、英文、数字和下划线"),
		
		
        jQuery.validate.addMethod("requiredTo", function(t, n, r) {
                var i = e(r).val();
                return "" != i ? "" != t: !0
        }, "此内容为必填项,请输入"),
		
        jQuery.validate.addMethod("requiredOne", function(t, n, r) {
                var i = e(r).val();
                return "" == i ? "" != t: !0
        }, e.validate.format("两项必须填写一项")),
		
		
        jQuery.validate.addMethod("notEqual",
        function(e, t, n) {
                return e != n
        },
        e.validate.format("输入值不允许为{0}")),
		
        jQuery.validate.addMethod("positive", function(e, t) {
                return this.optional(t) || e > 0
        }, "只允许输入正数"),
		
        jQuery.validate.addMethod("decimal", function(e, t, n) {
                var r = new RegExp("^(([0-9]\\d*)(\\.\\d{1," + n + "})?)$|(0\\.0?([1-9]\\d?))$ ");
                return this.optional(t) || r.test(e)
        }, "最多只保留小数点后{0}的正数"),
		
        jQuery.validate.addMethod("ismoney", function(e, t) {
                var n = new RegExp("^(([0-9]\\d*)(\\.\\d{1,2})?)$|(0\\.0?([1-9]\\d?))$ ");
                return this.optional(t) || n.test(e)
        }, "最多只保留小数点后2位的正数"),
		
        jQuery.validate.addMethod("positiveInteger", function(e, t) {
                return this.optional(t) || /^[1-9]\d*$/.test(e)
        }, "只允许输入正整数"),
		
        jQuery.validate.addMethod("Lettersnumbers", function(e, t) {
                return this.optional(t) || /^[A-Za-z0-9]+$/.test(e)
        }, "只允许输入 字母和整数"),
        jQuery.validate.addMethod("imageFile", function(e, t) {
                return this.optional(t) || /(.jpg|.jpeg|.gif|.bmp|.png)$/i.test(e)
        }, "图片文件格式错误"),
		
        jQuery.validate.addMethod("Mobile", function(e, t) {
                var n = e.length;
                return this.optional(t) || 11 == n && /^[0-9]{8,20}$/.test(e)
        }, "请正确填写您的手机号码"),
		
        jQuery.validate.addMethod("phone", function(e, t) {
                return this.optional(t) || /^((\d{3,4})|\d{3,4}-)?\d{7,8}(-\d+)*$/.test(e)
        }, "请正确填写您的电话号码"),
		
        jQuery.validate.addMethod("corpid", function(e, t) {
                return this.optional(t) || /\bwx\w{14,}/.test(e)
        }, "请正确填写CorpID")
		
} (jQuery)

