"use strict";
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var page_1 = require("ui/page");
var user_1 = require("../../shared/user/user");
var user_service_1 = require("../../shared/user/user.service");
var LoginPage = (function () {
    function LoginPage(_router, _userService, page) {
        this._router = _router;
        this._userService = _userService;
        this.page = page;
        this.user = new user_1.User();
        this.user.email = "";
        this.user.password = "";
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log('inited');
        this.page.actionBarHidden = true;
        this._userService.check()
            .subscribe(function () { return _this._router.navigate(["Map"]); }, function (error) { return alert("Your token is wrong or non existant"); });
    };
    LoginPage.prototype.submit = function () {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }
        this.login();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this._userService.login(this.user)
            .subscribe(function () { return _this._router.navigate(["Map"]); }, function (error) { return alert("Unfortunately we could not find your account."); });
    };
    LoginPage.prototype.goToRegisterPage = function () {
        this._router.navigate(["Register"]);
    };
    __decorate([
        core_1.ViewChild("container"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "container", void 0);
    __decorate([
        core_1.ViewChild("email"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "email", void 0);
    __decorate([
        core_1.ViewChild("password"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "password", void 0);
    LoginPage = __decorate([
        core_1.Component({
            selector: "LoginPage",
            providers: [user_service_1.UserService],
            templateUrl: "pages/login/login.html",
            styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, user_service_1.UserService, page_1.Page])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.component.js.map