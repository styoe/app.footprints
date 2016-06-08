"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
var router_1 = require("nativescript-angular/router");
var login_component_1 = require("./pages/login/login.component");
var register_component_1 = require("./pages/register/register.component");
var map_component_1 = require("./pages/map/map.component");
var list_component_1 = require("./pages/list/list.component");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "main",
            directives: [router_1.NS_ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, router_1.NS_ROUTER_PROVIDERS],
            template: "<page-router-outlet></page-router-outlet>"
        }),
        router_deprecated_1.RouteConfig([
            { path: "/Login", component: login_component_1.LoginPage, name: "Login", useAsDefault: true },
            { path: "/Register", component: register_component_1.RegisterPage, name: "Register" },
            { path: "/Map", component: map_component_1.MapPage, name: "Map" },
            { path: "/List", component: list_component_1.ListPage, name: "List" }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map