"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullStorage = void 0;
var NullStorage = /** @class */ (function () {
    function NullStorage() {
    }
    NullStorage.prototype.setTextSearch = function (textSearch) {
        // do nothing
    };
    NullStorage.prototype.setPage = function (page) {
        // do nothing
    };
    NullStorage.prototype.setColumns = function (columns) {
        // do nothing
    };
    NullStorage.prototype.getTextSearch = function () {
        return null;
    };
    NullStorage.prototype.getPage = function () {
        return null;
    };
    NullStorage.prototype.getColumns = function () {
        return null;
    };
    return NullStorage;
}());
exports.NullStorage = NullStorage;
