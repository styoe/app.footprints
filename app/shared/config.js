"use strict";
var Config = (function () {
    function Config() {
    }
    Config.apiUrl = "http://192.168.0.157:1337/";
    Config.mapboxAccessToken = 'pk.eyJ1Ijoic3R5b2UiLCJhIjoiY2lvdWFvcGhnMDA0bnZrbTJ4eGpoNmJheSJ9.q_rvUsAlgnLU7DfqvShBkw';
    Config.minMovementFactor = 0.001;
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map