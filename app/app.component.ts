import {Component} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {RouteConfig} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {LoginPage} from "./pages/login/login.component";
import {RegisterPage} from "./pages/register/register.component";
import {MapPage} from "./pages/map/map.component";
import {ListPage} from "./pages/list/list.component";

@Component({
    selector: "main",
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, NS_ROUTER_PROVIDERS],
    template: "<page-router-outlet></page-router-outlet>"
})
@RouteConfig([
    { path: "/Login", component: LoginPage, name: "Login", useAsDefault: true },
    { path: "/Register", component: RegisterPage, name: "Register" },
    { path: "/Map", component: MapPage, name: "Map" },
    { path: "/List", component: ListPage, name: "List" }
])
export class AppComponent {}
