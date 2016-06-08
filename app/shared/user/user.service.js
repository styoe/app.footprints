"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
var config_1 = require("../config");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var application_settings_1 = require("application-settings");
var UserService = (function () {
    function UserService(_http, _router) {
        this._http = _http;
        this._router = _router;
    }
    UserService.prototype.login = function (user) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this._http.post(config_1.Config.apiUrl + "auth", JSON.stringify({
            email: user.email,
            password: user.password,
            grant_type: "password"
        }), { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) {
            console.log(data);
            if (data.token) {
                application_settings_1.setString('token', data.token);
            }
        })
            .catch(this.handleErrors);
    };
    UserService.prototype.register = function (user) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this._http.post(config_1.Config.apiUrl + "user/create", JSON.stringify({
            username: user.email,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword
        }), { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) {
            console.log(data);
            if (data.token) {
                application_settings_1.setString('token', data.token);
            }
        })
            .catch(this.handleErrors);
    };
    UserService.prototype.check = function () {
        var headers = new http_1.Headers(), token = application_settings_1.getString('token');
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
        console.log(config_1.Config.apiUrl + "auth-check");
        return this._http.post(config_1.Config.apiUrl + "auth-check", '', { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) {
            console.log(data);
        })
            .catch(this.handleErrors);
    };
    UserService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map