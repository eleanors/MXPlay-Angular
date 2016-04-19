webpackJsonp([5], {
        43 : function(module, exports, __webpack_require__) {
                "use strict";
                var angular = __webpack_require__(1);
                module.exports = angular.module("account", [__webpack_require__(49).name, __webpack_require__(50).name, __webpack_require__(51).name, __webpack_require__(45).name, __webpack_require__(46).name, __webpack_require__(52).name, __webpack_require__(53).name, __webpack_require__(48).name, __webpack_require__(47).name, __webpack_require__(55).name, __webpack_require__(54).name])
        },
        45 : function(module, exports, __webpack_require__) {
                "use strict";
                function ActivateEmailController($scope, Account, $location, $routeParams, Flash, User, $rootScope) {
                        $rootScope.top_menu_tpl = "empty",
                        $scope.email = {
                                value: $routeParams.email,
                                disabled: !0,
                                local: !0
                        },
                        $scope.key = {
                                value: $routeParams.key
                        };
                        var p = Account.activate_email({
                                email: $scope.email.value,
                                key: $scope.key.value
                        });
                        p.then(function() {
                                Flash.success().send("恭喜，邮箱激活成功"),
                                $location.path("/login"),
                                User.current(function(result) {
                                        $rootScope.USER = result.data || !1
                                })
                        }),
                        p["finally"](function() {
                                $scope.loading = !1
                        })
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.activate.email", []).controller("ActivateEmailController", ActivateEmailController),
                ActivateEmailController.$inject = ["$scope", "Account", "location", "$routeParams", "Flash", "User", "$rootScope"]
        },
        46 : function(module, exports, __webpack_require__) {
                "use strict";
                function ActivateGKController($scope, Account, $location, $routeParams, Flash, User, $rootScope) {
                        $rootScope.top_menu_tpl = "empty",
                        $scope.global_key = {},
                        $scope.submit = function() {
                                $scope.loading = !0;
                                var p = Account.activate_gk({
                                        global_key: $scope.global_key.value
                                });
                                p.then(function() {
                                        Flash.success().send("恭喜，设置用户名成功"),
                                        $location.path("/user"),
                                        User.current(function(result) {
                                                $rootScope.USER = result.data || !1
                                        })
                                }),
                                p["finally"](function() {
                                        $scope.loading = !1
                                })
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.register.gk", []).controller("ActivateGKController", ActivateGKController),
                ActivateGKController.$inject = ["$scope", "Account", "location", "$routeParams", "Flash", "User", "$rootScope"]
        },
        47 : function(module, exports, __webpack_require__) {
                "use strict";
                function ForgetPasswordEmailController($scope, $routeParams, Account, Flash, $location, $rootScope) {
                        $rootScope.top_menu_tpl = "empty",
                        $scope.email = {
                                value: $routeParams.email,
                                disabled: !0,
                                local: !0
                        },
                        $scope.captcha = {
                                update: !0,
                                type: "fixed"
                        },
                        $scope.valid = function() {
                                return $scope.email.valid && $scope.captcha.valid
                        },
                        $scope.submit = function() {
                                if ($scope.valid()) {
                                        $scope.loading = !0;
                                        var p = Account.forget_password({
                                                account: $scope.email.value,
                                                j_captcha: $scope.captcha.value
                                        });
                                        p.then(function(result) {
                                                Flash.success().send("已经发送邮件"),
                                                $location.path("/login")
                                        }),
                                        p["catch"](function() {
                                                $scope.captcha.update = !0
                                        }),
                                        p["finally"](function() {
                                                $scope.loading = !1
                                        })
                                }
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.forget-password.email", []).controller("ForgetPasswordEmailController", ForgetPasswordEmailController),
                ForgetPasswordEmailController.$inject = ["$scope", "$routeParams", "Account", "Flash", "location", "$rootScope"]
        },
        48 : function(module, exports, __webpack_require__) {
                "use strict";
                function ForgetPasswordController($scope, $location, $rootScope) {
                        $rootScope.top_menu_tpl = "empty",
                        $scope.account = {},
                        $scope.valid = function() {
                                return $scope.account.valid
                        },
                        $scope.submit = function() {
                                $scope.valid() && ($scope.loading = !0, "phone" === $scope.account.type ? $location.path("/password/reset/phone/" + $scope.account.value) : "email" === $scope.account.type && $location.path("/password/forget/email/" + $scope.account.value))
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.forget-password", []).controller("ForgetPasswordController", ForgetPasswordController),
                ForgetPasswordController.$inject = ["$scope", "location", "$rootScope"]
        },
        49 : function(module, exports, __webpack_require__) {
                "use strict";
                function LoginController($scope, $rootScope, Account, Flash, Common, $location) {
                        $rootScope.top_menu_tpl = "empty";
                        var unWatch = $rootScope.$watch("USER", function(user) {
                                $rootScope.USER && (Common.loginRedirect(), unWatch())
                        });
                        $scope.account = {},
                        $scope.password = {},
                        $scope.captcha = {
                                type: "login",
                                update: !0
                        },
                        $scope.valid = function() {
                                return $scope.captcha.needed ? $scope.account.valid && $scope.password.valid && $scope.captcha.valid: $scope.account.valid && $scope.password.valid
                        },
                        $scope.submit = function() {
                                if ($scope.valid()) {
                                        var form = {
                                                account: $scope.account.value,
                                                password: SHA1($scope.password.value),
                                                remember_me: $scope.remember_me.value
                                        };
                                        $scope.captcha.needed && (form.j_captcha = $scope.captcha.value),
                                        $scope.loading = true;
                                        var p = Account.login(form);
                                        p.then(function(result) {
                                                Flash.success().send("Welcome! " + result.data.name),
                                                $rootScope.USER = result.data
                                        }),
                                        p["catch"](function(error, result) {
                                                return 3205 === result.code ? ($location.path("/twofa"), !1) : void($scope.captcha.update = !0)
                                        }),
                                        p["finally"](function() {
                                                $scope.loading = false
                                        })
                                }
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.login", []).controller("LoginController", LoginController),
                LoginController.$inject = ["$scope", "$rootScope", "Account", "Flash", "Common", "location"]
        },
        50 : function(module, exports, __webpack_require__) {
                "use strict";
                function RegisterEmailController($scope, Account, $rootScope, Common, $location) {
                        $rootScope.top_menu_tpl = "empty";
                        var unWatch = $rootScope.$watch("USER",
                        function(user) {
                                $rootScope.USER && (Common.loginRedirect(), unWatch())
                        });
                        $scope.gk = {
                                value: $location.search().gk
                        },
                        $scope.email = {},
                        $scope.password_confirm = {},
                        $scope.captcha = {
                                type: "register",
                                update: !0,
                                valid: !0
                        },
                        $scope.valid = function() {
                                return $scope.captcha.needed ? $scope.gk.valid && $scope.email.valid && $scope.password_confirm.valid && $scope.captcha.valid: $scope.gk.valid && $scope.email.valid && $scope.password_confirm.valid
                        },
                        $scope.submit = function() {
                                if ($scope.valid()) {
                                        var form = {
                                                global_key: $scope.gk.value,
                                                email: $scope.email.value,
                                                password: SHA1($scope.password_confirm.password),
                                                confirm: SHA1($scope.password_confirm.confirm),
                                                invite: $location.search().key || void 0
                                        };
                                        $scope.captcha.needed && (form.j_captcha = $scope.captcha.value),
                                        $scope.loading = !0;
                                        var p = Account.register(form);
                                        p.then(function(result) {
                                                $rootScope.USER = result.data
                                        }),
                                        p["catch"](function() {
                                                $scope.captcha.update = !0
                                        }),
                                        p["finally"](function() {
                                                $scope.loading = !1
                                        })
                                }
                        },
                        $scope.registerByPhone = function() {
                                $location.path("/register/phone").search("key", $location.search().key)
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.register.email", []).controller("RegisterEmailController", RegisterEmailController),
                RegisterEmailController.$inject = ["$scope", "Account", "$rootScope", "Common", "location"]
        },
        51 : function(module, exports, __webpack_require__) {
                "use strict";
                function RegisterPhoneController($scope, Account, $rootScope, $location, Common) {
                        $rootScope.top_menu_tpl = "empty";
                        var unWatch = $rootScope.$watch("USER",
                        function(user) {
                                $rootScope.USER && (Common.loginRedirect(), unWatch())
                        });
                        $scope.gk = {},
                        $scope.phone = {},
                        $scope.password_confirm = {},
                        $scope.code = {
                                type: "register"
                        },
                        $scope.captcha = {
                                type: "register",
                                update: !0,
                                valid: !0
                        },
                        $scope.valid = function() {
                                return $scope.captcha.needed ? $scope.gk.valid && $scope.phone.valid && $scope.password_confirm.valid && $scope.code.valid && $scope.captcha.valid: $scope.gk.valid && $scope.phone.valid && $scope.password_confirm.valid && $scope.code.valid
                        },
                        $scope.submit = function() {
                                if ($scope.valid()) {
                                        var form = {
                                                global_key: $scope.gk.value,
                                                phone: $scope.phone.value,
                                                password: SHA1($scope.password_confirm.password),
                                                confirm: SHA1($scope.password_confirm.confirm),
                                                code: $scope.code.value,
                                                invite: $location.search().key || void 0
                                        };
                                        $scope.captcha.needed && (form.j_captcha = $scope.captcha.value),
                                        $scope.loading = !0;
                                        var p = Account.register(form);
                                        p.then(function(result) {
                                                $rootScope.USER = result.data
                                        }),
                                        p["catch"](function(result) {
                                                $scope.captcha.update = !0
                                        }),
                                        p["finally"](function() {
                                                $scope.loading = !1
                                        })
                                }
                        },
                        $scope.registerByEmail = function() {
                                $location.path("/register/email").search("key", $location.search().key)
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.register.phone", []).controller("RegisterPhoneController", RegisterPhoneController),
                RegisterPhoneController.$inject = ["$scope", "Account", "$rootScope", "$location", "Common"]
        },
        52 : function(module, exports, __webpack_require__) {
                "use strict";
                function ResetPasswordEmailController(Account, $scope, Flash, $location, $routeParams, $rootScope) {
                        $rootScope.top_menu_tpl = "empty",
                        $scope.email = {
                                value: $routeParams.email,
                                disabled: !0,
                                local: !0
                        },
                        $scope.password_confirm = {},
                        $scope.captcha = {
                                update: !0,
                                type: "fixed"
                        },
                        $scope.key = {
                                value: $routeParams.key,
                                valid: !1
                        };
                        var kp = Account.before_reset_password({
                                email: $scope.email.value,
                                key: $scope.key.value
                        });
                        kp.then(function() {
                                $scope.key.valid = !0
                        }),
                        kp["catch"](function(error, result) {
                                $scope.key.valid = !1,
                                $scope.password_confirm.disabled = !0,
                                $scope.captcha.disabled = !0
                        }),
                        $scope.valid = function() {
                                return $scope.key.valid && $scope.email.valid && $scope.password_confirm.valid && $scope.captcha.valid
                        },
                        $scope.submit = function() {
                                if ($scope.valid()) {
                                        $scope.loading = !0;
                                        var p = Account.reset_password({
                                                account: $scope.email.value,
                                                password: SHA1($scope.password_confirm.password),
                                                confirm: SHA1($scope.password_confirm.confirm),
                                                key: $scope.key.value,
                                                j_captcha: $scope.captcha.value
                                        });
                                        p.then(function(result) {
                                                Flash.success().send("重置密码成功"),
                                                $location.path("/login")
                                        }),
                                        p["catch"](function() {
                                                $scope.captcha.update = !0
                                        }),
                                        p["finally"](function() {
                                                $scope.loading = !1
                                        })
                                }
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.reset-password.email", []).controller("ResetPasswordEmailController", ResetPasswordEmailController),
                ResetPasswordEmailController.$inject = ["Account", "$scope", "Flash", "location", "$routeParams", "$rootScope"]
        },
        53 : function(module, exports, __webpack_require__) {
                "use strict";
                function ResetPasswordPhoneController($scope, $routeParams, Account, $location, Flash, $rootScope, Common) {
                        $rootScope.top_menu_tpl = "empty",
                        $scope.phone = {
                                value: $routeParams.phone,
                                disabled: !0,
                                local: !0,
                                valid: Common.isPhone($routeParams.phone)
                        },
                        $scope.password_confirm = {},
                        $scope.code = {
                                type: "forget"
                        },
                        $scope.valid = function() {
                                return $scope.phone.valid && $scope.password_confirm.valid && $scope.code.valid
                        },
                        $scope.submit = function() {
                                if ($scope.valid()) {
                                        $scope.loading = !0;
                                        var p = Account.reset_password({
                                                account: $scope.phone.value,
                                                password: SHA1($scope.password_confirm.password),
                                                confirm: SHA1($scope.password_confirm.confirm),
                                                code: $scope.code.value
                                        });
                                        p.then(function(result) {
                                                Flash.success().send("修改成功"),
                                                $location.path("/login")
                                        }),
                                        p["finally"](function() {
                                                $scope.loading = !1
                                        })
                                }
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.reset-password.phone", []).controller("ResetPasswordPhoneController", ResetPasswordPhoneController),
                ResetPasswordPhoneController.$inject = ["$scope", "$routeParams", "Account", "location", "Flash", "$rootScope", "Common"]
        },
        54 : function(module, exports, __webpack_require__) {
                "use strict";
                function TwofaCloseController($scope, Account, $location, $rootScope) {
                        $rootScope.top_menu_tpl = "empty",
                        $scope.phone = {
                                local: !0
                        },
                        $scope.code = {
                                type: "twofa"
                        },
                        $scope.valid = function() {
                                return $scope.phone.valid && $scope.code.valid
                        },
                        $scope.submit = function() {
                                if ($scope.valid()) {
                                        $scope.loading = !0;
                                        var p = Account.close_twofa({
                                                phone: $scope.phone.value,
                                                code: $scope.code.value
                                        });
                                        p.then(function(result) {
                                                $location.path("/login")
                                        }),
                                        p["finally"](function() {
                                                $scope.loading = !1
                                        })
                                }
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.twofa.close", []).controller("TwofaCloseController", TwofaCloseController),
                TwofaCloseController.$inject = ["$scope", "Account", "location", "$rootScope"]
        },
        55 : function(module, exports, __webpack_require__) {
                "use strict";
                function TwofaController($scope, Account, Flash, $rootScope, Common) {
                        $rootScope.top_menu_tpl = "empty";
                        var unWatch = $rootScope.$watch("USER",
                        function(user) {
                                $rootScope.USER && (Common.loginRedirect(), unWatch())
                        });
                        $scope.code = {},
                        $scope.submit = function() {
                                if ($scope.code.valid) {
                                        $scope.loading = !0;
                                        var p = Account.twofa({
                                                code: $scope.code.value
                                        },
                                        function(result) {
                                                Flash.success().send("Welcome! " + result.data.name),
                                                $rootScope.USER = result.data,
                                                $location.path("/user")
                                        });
                                        p["finally"](function() {
                                                $scope.loading = !1
                                        })
                                }
                        }
                }
                var angular = __webpack_require__(1);
                module.exports = angular.module("account.twofa", []).controller("TwofaController", TwofaController),
                TwofaController.$inject = ["$scope", "Account", "Flash", "$rootScope", "Common"]
        }
});