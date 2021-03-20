"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateIsBetween = exports.isDateBefore = exports.isDateAfter = exports.areDatesEqual = void 0;
var dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
var isBetween = require("dayjs/plugin/isBetween");
var Models_1 = require("./Models");
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var areDatesEqual = function (column, date1, date2) {
    switch (column.dataType) {
        case Models_1.ColumnDataType.Date:
            return dayjs(date1, column.dateOriginFormat).isSame(dayjs(date2, column.dateOriginFormat), 'd');
        case Models_1.ColumnDataType.DateTime:
        case Models_1.ColumnDataType.DateTimeUtc:
            return dayjs(date1, column.dateOriginFormat).isSame(dayjs(date2, column.dateOriginFormat), 'd');
    }
};
exports.areDatesEqual = areDatesEqual;
var isDateAfter = function (column, date1, date2, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    if (inclusive) {
        return dayjs(date1, column.dateOriginFormat).isSameOrAfter(dayjs(date2, column.dateOriginFormat), 'd');
    }
    return dayjs(date1, column.dateOriginFormat).isAfter(dayjs(date2, column.dateOriginFormat), 'd');
};
exports.isDateAfter = isDateAfter;
var isDateBefore = function (column, date1, date2, inclusive) {
    if (inclusive === void 0) { inclusive = false; }
    if (inclusive) {
        return dayjs(date1, column.dateOriginFormat).isSameOrBefore(dayjs(date2, column.dateOriginFormat), 'd');
    }
    return dayjs(date1, column.dateOriginFormat).isBefore(dayjs(date2, column.dateOriginFormat), 'd');
};
exports.isDateBefore = isDateBefore;
var dateIsBetween = function (column, from, to, value) {
    dayjs.extend(isBetween);
    return dayjs(dayjs(value, column.dateOriginFormat)).isBetween(dayjs(from, column.dateOriginFormat), dayjs(to, column.dateOriginFormat), null, '[]');
};
exports.dateIsBetween = dateIsBetween;
exports.default = dayjs;
