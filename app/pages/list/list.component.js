"use strict";
var core_1 = require("@angular/core");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
// var socialShare = require("nativescript-social-share");
var ListPage = (function () {
    function ListPage(_groceryListService) {
        this._groceryListService = _groceryListService;
        this.groceryList = [];
        this.grocery = "";
        this.isLoading = false;
        this.listLoaded = false;
    }
    ListPage.prototype.ngOnInit = function () {
        this.isLoading = true;
        /*
        this._groceryListService.load()
          .subscribe(loadedGroceries => {
            loadedGroceries.forEach((groceryObject) => {
              this.groceryList.unshift(groceryObject);
            });
            this.isLoading = false;
            this.listLoaded = true;
          });
          */
    };
    ListPage.prototype.add = function () {
        /*
        if (this.grocery.trim() === "") {
          alert("Enter a grocery item");
          return;
        }
    
        // Dismiss the keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
    
        this._groceryListService.add(this.grocery)
          .subscribe(
            groceryObject => {
              this.groceryList.unshift(groceryObject);
              this.grocery = "";
            },
            () => {
              alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
              });
              this.grocery = "";
            }
          )
          */
    };
    ListPage.prototype.delete = function (grocery) {
        /*
        this._groceryListService.delete(grocery.id)
          .subscribe(() => {
            var index = this.groceryList.indexOf(grocery);
            this.groceryList.splice(index, 1);
          })
          */
    };
    ListPage.prototype.share = function () {
        /*
        let list = [];
        for (let i = 0, size = this.groceryList.length; i < size ; i++) {
          list.push(this.groceryList[i].name);
        }
        let listString = list.join(", ").trim();
        socialShare.shareText(listString);
        */
    };
    __decorate([
        core_1.ViewChild("groceryTextField"), 
        __metadata('design:type', core_1.ElementRef)
    ], ListPage.prototype, "groceryTextField", void 0);
    ListPage = __decorate([
        core_1.Component({
            selector: "list",
            templateUrl: "pages/list/list.html",
            styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
            providers: [grocery_list_service_1.GroceryListService]
        }), 
        __metadata('design:paramtypes', [grocery_list_service_1.GroceryListService])
    ], ListPage);
    return ListPage;
}());
exports.ListPage = ListPage;
//# sourceMappingURL=list.component.js.map