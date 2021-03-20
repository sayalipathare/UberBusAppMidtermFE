"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateColumnValue = exports.isDateColum = exports.createColumn = exports.columnHasFilter = exports.sortColumnArray = exports.getOperators = exports.BooleanOperators = exports.StringOperators = exports.NumericOperators = void 0;
var Column_1 = require("./Column");
var dayjs = require("dayjs");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
var defaultOriginDateFormat = 'YYYY-MM-DD';
var defaultOriginDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
var defaultDisplayDateFormat = 'YYYY-MM-DD';
var defaultDisplayDateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
exports.NumericOperators = [
    { value: Column_1.CompareOperators.None, title: 'None' },
    { value: Column_1.CompareOperators.Equals, title: 'Equals' },
    { value: Column_1.CompareOperators.Between, title: 'Between' },
    { value: Column_1.CompareOperators.Gte, title: '>=' },
    { value: Column_1.CompareOperators.Gt, title: '>' },
    { value: Column_1.CompareOperators.Lte, title: '<=' },
    { value: Column_1.CompareOperators.Lt, title: '<' },
];
exports.StringOperators = [
    { value: Column_1.CompareOperators.None, title: 'None' },
    { value: Column_1.CompareOperators.Equals, title: 'Equals' },
    { value: Column_1.CompareOperators.NotEquals, title: 'Not Equals' },
    { value: Column_1.CompareOperators.Contains, title: 'Contains' },
    { value: Column_1.CompareOperators.NotContains, title: 'Not Contains' },
    { value: Column_1.CompareOperators.StartsWith, title: 'Starts With' },
    { value: Column_1.CompareOperators.NotStartsWith, title: 'Not Starts With' },
    { value: Column_1.CompareOperators.EndsWith, title: 'Ends With' },
    { value: Column_1.CompareOperators.NotEndsWith, title: 'Not Ends With' },
];
exports.BooleanOperators = [
    { value: Column_1.CompareOperators.None, title: 'None' },
    { value: Column_1.CompareOperators.Equals, title: 'Equals' },
    { value: Column_1.CompareOperators.NotEquals, title: 'Not Equals' },
];
var getOperators = function (column) {
    switch (column.dataType) {
        case Column_1.ColumnDataType.String:
            return exports.StringOperators;
        case Column_1.ColumnDataType.Numeric:
        case Column_1.ColumnDataType.Date:
        case Column_1.ColumnDataType.DateTime:
        case Column_1.ColumnDataType.DateTimeUtc:
            return exports.NumericOperators;
        case Column_1.ColumnDataType.Boolean:
            return exports.BooleanOperators;
        default:
            return [];
    }
};
exports.getOperators = getOperators;
var sortColumnArray = function (columnName, columns, multiSort) {
    var column = columns.find(function (c) { return c.name === columnName; });
    if (!column) {
        return;
    }
    column.sortDirection =
        column.sortDirection === Column_1.ColumnSortDirection.None
            ? Column_1.ColumnSortDirection.Ascending
            : column.sortDirection === Column_1.ColumnSortDirection.Ascending
                ? Column_1.ColumnSortDirection.Descending
                : Column_1.ColumnSortDirection.None;
    column.sortOrder = column.sortDirection === Column_1.ColumnSortDirection.None ? -1 : Number.MAX_VALUE;
    if (!multiSort) {
        columns
            .filter(function (col) { return col.name !== columnName; })
            .forEach(function (c) {
            c.sortOrder = -1;
            c.sortDirection = Column_1.ColumnSortDirection.None;
        });
    }
    columns
        .filter(function (col) { return col.sortOrder > 0; })
        .sort(function (a, b) {
        return a.sortOrder === b.sortOrder ? 0 : a.sortOrder > b.sortOrder ? 1 : -1;
    })
        .forEach(function (col, i) {
        col.sortOrder = i + 1;
    });
    return columns;
};
exports.sortColumnArray = sortColumnArray;
var columnHasFilter = function (column) {
    return (!!column.filterText || !!column.filterArgument) && column.filterOperator !== Column_1.CompareOperators.None;
};
exports.columnHasFilter = columnHasFilter;
var defaultComputedCsvValueGetter = function (_column, _row, _isHeader) {
    if (_isHeader === void 0) { _isHeader = false; }
    return '';
};
var createColumn = function (name, options) {
    var temp = options || {};
    var sortDirection = (temp.sortable && temp.sortDirection) || Column_1.ColumnSortDirection.None;
    return {
        aggregate: temp.aggregate || Column_1.AggregateFunctions.None,
        dataType: temp.dataType || Column_1.ColumnDataType.String,
        dateDisplayFormat: temp.dateDisplayFormat || defaultDisplayDateFormat,
        dateOriginFormat: temp.dateOriginFormat || defaultOriginDateFormat,
        dateTimeDisplayFormat: temp.dateTimeDisplayFormat || defaultDisplayDateTimeFormat,
        dateTimeOriginFormat: temp.dateTimeOriginFormat || defaultOriginDateTimeFormat,
        getComputedStringValue: temp.getComputedStringValue || defaultComputedCsvValueGetter,
        isKey: !!temp.isKey,
        isComputed: temp.isComputed === undefined ? false : temp.isComputed,
        label: temp.label || (name || '').replace(/([a-z])([A-Z])/g, '$1 $2'),
        name: name,
        searchable: !!temp.searchable,
        sortDirection: (temp.sortable && temp.sortDirection) || Column_1.ColumnSortDirection.None,
        sortOrder: (sortDirection !== Column_1.ColumnSortDirection.None && temp.sortOrder) || -1,
        sortable: !!temp.sortable,
        visible: temp.visible === undefined ? true : temp.visible,
        filterArgument: temp.filterArgument,
        filterOperator: temp.filterOperator,
        filterText: temp.filterText,
        filterable: temp.filterable === undefined ? false : temp.filterable,
        exportable: temp.exportable === undefined ? true : temp.exportable,
    };
};
exports.createColumn = createColumn;
var isDateColum = function (column) {
    return column.dataType === Column_1.ColumnDataType.Date ||
        column.dataType === Column_1.ColumnDataType.DateTime ||
        column.dataType === Column_1.ColumnDataType.DateTimeUtc;
};
exports.isDateColum = isDateColum;
var parseDateColumnValue = function (column, value) {
    if (!exports.isDateColum(column) || !value) {
        return '';
    }
    switch (column.dataType) {
        case Column_1.ColumnDataType.Date:
            return dayjs(value, column.dateOriginFormat).format(column.dateDisplayFormat);
        case Column_1.ColumnDataType.DateTime:
        case Column_1.ColumnDataType.DateTimeUtc:
            return dayjs(value, column.dateTimeOriginFormat).format(column.dateTimeDisplayFormat);
    }
};
exports.parseDateColumnValue = parseDateColumnValue;
