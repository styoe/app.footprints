"use strict";
var core_1 = require("@angular/core");
var frame = require("ui/frame");
var page_1 = require("ui/page");
var map_service_1 = require("../../shared/map/map.service");
var MapPage = (function () {
    function MapPage(_mapService, page) {
        this._mapService = _mapService;
        this.page = page;
    }
    MapPage.prototype.ngOnInit = function () {
        console.log("Map component inited...");
        this.page.actionBarHidden = true;
        this._mapService.startMap();
    };
    MapPage.prototype.addMarker = function () {
        console.log('add marker...');
    };
    MapPage.prototype.onMapReady = function () {
        console.log("Setting a marker...");
    };
    MapPage.prototype.onMarkerSelect = function (args) {
        console.log("Clicked on " + args.marker.title);
    };
    MapPage.prototype.onCameraChanged = function (args) {
        console.log("Camera changed: " + JSON.stringify(args.camera));
    };
    MapPage = __decorate([
        core_1.Component({
            selector: "MapPage",
            providers: [map_service_1.MapService],
            templateUrl: "pages/map/map.html",
            styleUrls: ["pages/map/map-common.css", "pages/map/map.css"],
        }), 
        __metadata('design:paramtypes', [map_service_1.MapService, page_1.Page])
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;
//# sourceMappingURL=map.component.js.map