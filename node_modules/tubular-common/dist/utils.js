"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPages = exports.getHtml = exports.getCsv = exports.getColumnAlign = exports.parsePayload = void 0;
var Models_1 = require("./Models");
var parsePayload = function (row, columns) {
    return columns.reduce(function (obj, column, key) {
        obj[column.name] = row[key] || row[column.name];
        return obj;
    }, {});
};
exports.parsePayload = parsePayload;
var getColumnAlign = function (column) {
    switch (column.dataType) {
        case Models_1.ColumnDataType.Numeric:
            return 'right';
        case Models_1.ColumnDataType.Boolean:
            return 'center';
        default:
            return 'inherit';
    }
};
exports.getColumnAlign = getColumnAlign;
var getRealCellValue = function (column, value, isHeader) {
    if (isHeader === void 0) { isHeader = false; }
    if (isHeader) {
        return (value || '').toString();
    }
    switch (column.dataType) {
        case Models_1.ColumnDataType.Date:
        case Models_1.ColumnDataType.DateTime:
        case Models_1.ColumnDataType.DateTimeUtc:
            return Models_1.parseDateColumnValue(column, value);
        case Models_1.ColumnDataType.Boolean:
            return value === true ? 'Yes' : 'No';
        default:
            return (value || '').toString();
    }
};
var getCellValue = function (column, row, isHeader) {
    return column.isComputed
        ? column.getComputedStringValue(column, row, isHeader)
        : getRealCellValue(column, row[column.name], isHeader);
};
var processRow = function (row, columns, isHeader) {
    var finalVal = columns.reduce(function (prev, currentColumn) {
        var result = getCellValue(currentColumn, row, isHeader).replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
            result = "\"" + result + "\"";
        }
        return "" + prev + result + ",";
    }, '');
    return finalVal.replace(/(^,)|(,$)/g, '') + "\n";
};
var getCsv = function (gridResult, columns) {
    var exportableColumns = columns.filter(function (c) { return (c.visible && c.exportable) || (c.isComputed && !c.getComputedStringValue); });
    return gridResult.reduce(function (prev, row) { return prev + processRow(row, exportableColumns, false); }, processRow(exportableColumns
        .map(function (x) {
        var _a;
        return (_a = {}, _a[x.name] = x.label, _a);
    })
        .reduce(function (prev, current) { return (__assign(__assign({}, prev), current)); }, {}), exportableColumns, true));
};
exports.getCsv = getCsv;
var getHtml = function (gridResult, columns) {
    var exportableColumns = columns.filter(function (c) { return (c.visible && c.exportable) || (c.isComputed && !c.getComputedStringValue); });
    return "<table class=\"table table-bordered table-striped\"><thead><tr>" + exportableColumns.reduce(function (prev, el) { return prev + "<th>" + (el.label || el.name) + "</th>"; }, '') + "</tr></thead><tbody>" + gridResult.reduce(function (prevRow, row) {
        return prevRow + "<tr>" + exportableColumns.reduce(function (prev, currentColumn) {
            return prev + "<td>" + getCellValue(currentColumn, row, false) + "</td>";
        }, '') + "</tr>";
    }, '') + "</tbody></table>";
};
exports.getHtml = getHtml;
var getPages = function (currentPage, totalRows, rowsPerPage) {
    var pages = [];
    // Default page limits
    var totalPages = Math.ceil(totalRows / rowsPerPage);
    var startPage = 1;
    var endPage = totalPages;
    var maxSize = 6;
    var isMaxSized = maxSize < totalPages;
    // recompute if maxSize
    if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
        endPage = startPage + maxSize - 1;
        // Adjust if limit is exceeded
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = endPage - maxSize + 1;
        }
    }
    // Add page number links
    for (var num = startPage; num <= endPage; num++) {
        pages.push(num - 1);
    }
    return pages;
};
exports.getPages = getPages;
