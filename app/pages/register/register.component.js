"use strict";
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var page_1 = require("ui/page");
var user_1 = require("../../shared/user/user");
var user_service_1 = require("../../shared/user/user.service");
var RegisterPage = (function () {
    function RegisterPage(_router, _userService, page) {
        this._router = _router;
        this._userService = _userService;
        this.page = page;
        this.user = new user_1.User();
        this.user.email = "";
        this.user.password = "";
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    RegisterPage.prototype.submit = function () {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }
        this.signUp();
    };
    RegisterPage.prototype.signUp = function () {
        this._userService.register(this.user)
            .subscribe(function () {
            alert("Your account was successfully created.");
        }, function (res) {
            console.log(res.json());
            alert("Unfortunately we were unable to create your account.");
        });
    };
    RegisterPage.prototype.goToLoginPage = function () {
        this._router.navigate(["Login"]);
    };
    __decorate([
        core_1.ViewChild("container"), 
        __metadata('design:type', core_1.ElementRef)
    ], RegisterPage.prototype, "container", void 0);
    __decorate([
        core_1.ViewChild("email"), 
        __metadata('design:type', core_1.ElementRef)
    ], RegisterPage.prototype, "email", void 0);
    __decorate([
        core_1.ViewChild("password"), 
        __metadata('design:type', core_1.ElementRef)
    ], RegisterPage.prototype, "password", void 0);
    RegisterPage = __decorate([
        core_1.Component({
            selector: "RegisterPage",
            providers: [user_service_1.UserService],
            templateUrl: "pages/register/register.html",
            styleUrls: ["pages/register/register-common.css", "pages/register/register.css"],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, user_service_1.UserService, page_1.Page])
    ], RegisterPage);
    return RegisterPage;
}());
exports.RegisterPage = RegisterPage;
//# sourceMappingURL=register.component.js.map