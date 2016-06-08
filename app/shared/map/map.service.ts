import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Router} from "@angular/router-deprecated";
import {Config} from "../config";
var mapbox = require("nativescript-mapbox");
import geolocation = require("nativescript-geolocation");
import {Map} from "../../shared/map/map";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {getString, setString} from "application-settings";

@Injectable()
export class MapService{
    map: Map;

    constructor(private _http: Http, private _router: Router) {
        this.map = new Map();
        this.map.lat = 0;
        this.map.lng = 0;
        this.map.markers = [];
    }

    startMap(){
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
    }

    updateMap(loc){
        console.log('updateMap');
        //only update if users location has changed
        let distance = this.getDistanceFromLatLonInKm( this.map.lat, this.map.lng, loc.lat, loc.lng);
        if(distance > Config.minMovementFactor){
            this.map.lat = loc.lat;
            this.map.lng = loc.lng;

            mapbox.setCenter(loc);
            this.getMarkers(loc).subscribe(
                (data) => this.updateMarkers(data.pins),
                (error) => alert("Unfortunately we could not find your pins.")
            );
        }
    }

    getMarkers(loc){
        console.log('get Markers');
        let headers = new Headers(),
            token = getString('token');

        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");

        return this._http.post(
            Config.apiUrl + "near-pins",
            JSON.stringify({
                lat: loc.lat,
                lng: loc.lng
            }),
            { headers: headers }
        )
        .map(response => response.json())
        .do(data => {})
        .catch(this.handleErrors);
    }

    updateMarkers(markers){
        console.log('update markers...');
        var newMarkers = [];

        for(var i=0,iLen=markers.length; i<iLen; i++){
            var marker = markers[i].obj,
                addMarker = true;

            //check if marker exists;
            for(var j=0,jLen=this.map.markers.length; j<jLen; j++){
                if(marker._id === this.map.markers[j]._id){
                    addMarker = false;
                    break;
                }
            }

            //if marker does not exist add it to map
            if(addMarker){
                this.map.markers.push(marker);
                newMarkers.push({
                    'lng': marker.coordinates[0], // mandatory
                    'lat': marker.coordinates[1], // mandatory
                    'title': marker.name, // no popup unless set
                    'subtitle': marker.content
                })
            }

            if(newMarkers.length){
                mapbox.addMarkers(newMarkers);
            }
        }

    }

    startGeolocation(){
        console.log('startGeolocation');
        var self = this;
        setInterval(function(){
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
    }

    showMap(){
        console.log('showMap');
        setTimeout(function(){
            mapbox.show({
                accessToken: Config.mapboxAccessToken,
                style: mapbox.MapStyle.EMERALD,
                margins: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 100
                },
                zoomLevel: 6, // 0 (most of the world) to 20, default 0
                showUserLocation: false, // default false
                hideAttribution: true, // default false
                hideLogo: true, // default false
                hideCompass: false, // default false
                disableRotation: false, // default false
                disableScroll: false, // default false
                disableZoom: false, // default false
                disableTilt: false, // default false

            }).then(
                function (result) {
                    mapbox.setTilt({
                        pitch:60,
                        duration:5000
                    });

                    console.log("Mapbox show done");
                },
                function (error) {
                    console.log("mapbox show error: " + error);
                }
            );
        },10);
    }

    getDistanceFromLatLonInKm (lat1,lon1,lat2,lon2) {
        var deg2rad = function(deg) {
            return deg * (Math.PI/180)
        }
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }


}