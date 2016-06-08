import {Component, OnInit} from "@angular/core";
var frame = require("ui/frame");
import {Page} from "ui/page";
import labelModule = require("ui/label");
import {MapService} from "../../shared/map/map.service";

@Component({
  selector: "MapPage",
  providers: [MapService],
  templateUrl: "pages/map/map.html",
  styleUrls: ["pages/map/map-common.css", "pages/map/map.css"],
})
export class MapPage implements OnInit {

  constructor(private _mapService: MapService, private page: Page) {

  }

  ngOnInit() {
    console.log("Map component inited...");
    this.page.actionBarHidden = true;
    this._mapService.startMap();
  }

  addMarker() {
    console.log('add marker...');
  }

  onMapReady() {
    console.log("Setting a marker...");
  }

  onMarkerSelect(args) {
    console.log("Clicked on " +args.marker.title);
  }

  onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera));
  }

}
