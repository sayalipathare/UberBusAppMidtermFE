"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridRequest = void 0;
var currentTimezone = new Date().getTimezoneOffset();
var GridRequest = /** @class */ (function () {
    function GridRequest(columns, itemsPerPage, page, searchText) {
        if (searchText === void 0) { searchText = ''; }
        this.columns = columns.filter(function (c) { return !c.isComputed; });
        this.searchText = searchText;
        this.skip = itemsPerPage === -1 ? 0 : page * itemsPerPage;
        this.take = itemsPerPage;
        this.counter = GridRequest.counter++;
        this.timezoneOffset = currentTimezone;
    }
    GridRequest.counter = 0;
    return GridRequest;
}());
exports.GridRequest = GridRequest;
