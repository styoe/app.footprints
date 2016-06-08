"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
var config_1 = require("../config");
var mapbox = require("nativescript-mapbox");
var map_1 = require("../../shared/map/map");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var application_settings_1 = require("application-settings");
var MapService = (function () {
    function MapService(_http, _router) {
        this._http = _http;
        this._router = _router;
        this.map = new map_1.Map();
        this.map.lat = 0;
        this.map.lng = 0;
        this.map.markers = [];
    }
    MapService.prototype.startMap = function () {
        /*
        mapbox.requestFineLocationPermission().then(
            function() {
                console.log("Location permission requested");
            }
        );

        mapbox.hasFineLocationPermission().then(
            function(granted) {
                // if this is 'false' you probably want to call 'requestFineLocationPermission' now
                console.log("Has Location Permission? " + granted);
            }
        );
        */
        this.startGeolocation();
        this.showMap();
    };
    MapService.prototype.updateMap = function (loc) {
        var _this = this;
        console.log('updateMap');
        //only update if users location has changed
        var distance = this.getDistanceFromLatLonInKm(this.map.lat, this.map.lng, loc.lat, loc.lng);
        if (distance > config_1.Config.minMovementFactor) {
            this.map.lat = loc.lat;
            this.map.lng = loc.lng;
            mapbox.setCenter(loc);
            this.getMarkers(loc).subscribe(function (data) { return _this.updateMarkers(data.pins); }, function (error) { return alert("Unfortunately we could not find your pins."); });
        }
    };
    MapService.prototype.getMarkers = function (loc) {
        console.log('get Markers');
        var headers = new http_1.Headers(), token = application_settings_1.getString('token');
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
        return this._http.post(config_1.Config.apiUrl + "near-pins", JSON.stringify({
            lat: loc.lat,
            lng: loc.lng
        }), { headers: headers })
            .map(function (response) { return response.json(); })
            .do(function (data) { })
            .catch(this.handleErrors);
    };
    MapService.prototype.updateMarkers = function (markers) {
        console.log('update markers...');
        var newMarkers = [];
        for (var i = 0, iLen = markers.length; i < iLen; i++) {
            var marker = markers[i].obj, addMarker = true;
            //check if marker exists;
            for (var j = 0, jLen = this.map.markers.length; j < jLen; j++) {
                if (marker._id === this.map.markers[j]._id) {
                    addMarker = false;
                    break;
                }
            }
            //if marker does not exist add it to map
            if (addMarker) {
                this.map.markers.push(marker);
                newMarkers.push({
                    'lng': marker.coordinates[0],
                    'lat': marker.coordinates[1],
                    'title': marker.name,
                    'subtitle': marker.content
                });
            }
            if (newMarkers.length) {
                mapbox.addMarkers(newMarkers);
            }
        }
    };
    MapService.prototype.startGeolocation = function () {
        console.log('startGeolocation');
        var self = this;
        setInterval(function () {
            self.updateMap({
                lat: 12.0,
                lng: 13.0
            });
        }, 5000);
        //AS THIS IS NOT WORKING, WE WILL SIMULATE IT
        /*
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }

        var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
        then(function(loc) {
            if (loc) {
               console.log(loc);
            }
        }, function(e){
            console.log("Error: " + e.message);
        });
        */
    };
    MapService.prototype.showMap = function () {
        console.log('showMap');
        setTimeout(function () {
            mapbox.show({
                accessToken: config_1.Config.mapboxAccessToken,
                style: mapbox.MapStyle.EMERALD,
                margins: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 100
                },
                zoomLevel: 6,
                showUserLocation: false,
                hideAttribution: true,
                hideLogo: true,
                hideCompass: false,
                disableRotation: false,
                disableScroll: false,
                disableZoom: false,
                disableTilt: false,
            }).then(function (result) {
                mapbox.setTilt({
                    pitch: 60,
                    duration: 5000
                });
                console.log("Mapbox show done");
            }, function (error) {
                console.log("mapbox show error: " + error);
            });
        }, 10);
    };
    MapService.prototype.getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
        var deg2rad = function (deg) {
            return deg * (Math.PI / 180);
        };
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    };
    MapService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    MapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router])
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map