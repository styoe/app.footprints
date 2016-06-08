"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var GroceryListService = (function () {
    function GroceryListService(_http) {
        this._http = _http;
    }
    GroceryListService.prototype.load = function () {
        /*
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
    
        return this._http.get(Config.apiUrl + "Groceries", {
          headers: headers
        })
        .map(res => res.json())
        .map(data => {
          let groceryList = [];
          data.Result.forEach((grocery) => {
            groceryList.push(new Grocery(grocery.Id, grocery.Name));
          });
          return groceryList;
        })
        .catch(this.handleErrors);
        */
    };
    GroceryListService.prototype.add = function (name) {
        /*
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
        headers.append("Content-Type", "application/json");
    
        return this._http.post(
          Config.apiUrl + "Groceries",
          JSON.stringify({ Name: name }),
          { headers: headers }
        )
        .map(res => res.json())
        .map(data => {
          return new Grocery(data.Result.Id, name);
        })
        .catch(this.handleErrors);
        */
    };
    GroceryListService.prototype.delete = function (id) {
        /*
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
        headers.append("Content-Type", "application/json");
    
        return this._http.delete(
          Config.apiUrl + "Groceries/" + id,
          { headers: headers }
        )
        .map(res => res.json())
        .catch(this.handleErrors);
        */
    };
    GroceryListService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    GroceryListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GroceryListService);
    return GroceryListService;
}());
exports.GroceryListService = GroceryListService;
//# sourceMappingURL=grocery-list.service.js.map