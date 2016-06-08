"use strict";
var frame = require("ui/frame");
var dialogs = require("ui/dialogs");
var closeCallback;
var page;
var usernameTextField;
var passwordTextField;
function onShowingModally(args) {
    console.log(">>> login-page.onShowingModally");
    var modalPage = args.object;
}
exports.onShowingModally = onShowingModally;
function onShownModally(args) {
    console.log(">>> login-page.onShownModally, context: " + args.context);
    closeCallback = args.closeCallback;
    var modalPage = args.object;
    if (frame.topmost().currentPage.modal !== args.object) {
        throw new Error("frame.topmost().currentPage.modal.id: " + frame.topmost().currentPage.modal.id + "; modalPage.id: " + modalPage.id);
    }
}
exports.onShownModally = onShownModally;
function onNavigatingTo(args) {
    console.log(">>> login-page.onNavigatingTo");
}
exports.onNavigatingTo = onNavigatingTo;
function onLoaded(args) {
    console.log(">>> login-page.onLoaded");
    page = args.object;
    usernameTextField = page.getViewById("username");
    passwordTextField = page.getViewById("password");
}
exports.onLoaded = onLoaded;
function onNavigatedTo(args) {
    console.log(">>> login-page.onNavigatedTo, context: " + args.context);
}
exports.onNavigatedTo = onNavigatedTo;
function onNavigatingFrom(args) {
    console.log(">>> login-page.onNavigatingFrom");
}
exports.onNavigatingFrom = onNavigatingFrom;
function onNavigatedFrom(args) {
    console.log(">>> login-page.onNavigatedFrom");
}
exports.onNavigatedFrom = onNavigatedFrom;
function onUnloaded() {
    console.log(">>> login-page.onUnloaded");
}
exports.onUnloaded = onUnloaded;
function onLoginButtonTap() {
    console.log(">>> login-page.onLoginButtonTap");
    if (closeCallback) {
        closeCallback(usernameTextField.text, passwordTextField.text);
    }
    else {
        frame.topmost().goBack();
    }
}
exports.onLoginButtonTap = onLoginButtonTap;
function onShowDialogButtonTap() {
    console.log(">>> login-page.onShowDialogButtonTap");
    dialogs.alert({ title: "test", message: "Anything", okButtonText: "ok" })
        .then(function () {
        console.log("Dialog closed!");
    });
}
exports.onShowDialogButtonTap = onShowDialogButtonTap;
//# sourceMappingURL=add-marker.js.map