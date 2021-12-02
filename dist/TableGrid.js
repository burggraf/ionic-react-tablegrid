"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_service_1 = require("./services/utils.service");
var TableColumnSort_1 = __importDefault(require("./TableColumnSort"));
require("./TableGrid.css");
var utilsService = new utils_service_1.UtilsService();
var TableGrid = function (_a) {
    var rows = _a.rows, rowClick = _a.rowClick, sort = _a.sort, changeSortCallback = _a.changeSortCallback, sortableColumns = _a.sortableColumns;
    console.log('tableGrid, sortableColumns, sort', sortableColumns, sort);
    var keys = Object.keys(rows[0] || []);
    var _b = utilsService.getGridWidths(rows), gridWidth = _b.gridWidth, columnWidths = _b.columnWidths;
    return (react_1.default.createElement("div", { style: { height: '100%', overflow: 'scroll' } },
        react_1.default.createElement("table", { style: { width: gridWidth + 'px' }, key: utilsService.randomKey() },
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", { key: utilsService.randomKey() }, keys.map(function (keyname, index) { return (react_1.default.createElement("td", { style: { verticalAlign: 'bottom', width: columnWidths[index] + 'px' }, className: 'breakItUp', key: utilsService.randomKey() },
                    react_1.default.createElement("strong", null, keyname),
                    sort && changeSortCallback && sortableColumns && typeof sortableColumns[index] === 'string' &&
                        react_1.default.createElement(TableColumnSort_1.default, { sort: sort, columnName: sortableColumns[index], callback: changeSortCallback }))); })),
                rows.map(function (row, index) { return (react_1.default.createElement("tr", { key: utilsService.randomKey(), onClick: function () { rowClick(row, index); } }, keys.map(function (key, index) {
                    // if (!Array.isArray(row[key])) {
                    if (typeof row[key] !== 'object') {
                        return (react_1.default.createElement("td", { style: { width: columnWidths[index] + 'px' }, className: 'breakItUp boxed', key: utilsService.randomKey() }, row[key]));
                    }
                    else {
                        return (react_1.default.createElement("td", { style: { width: columnWidths[index] + 'px' }, className: 'breakItUp boxed', key: utilsService.randomKey() }, JSON.stringify(row[key])));
                    }
                }))); })))));
};
exports.default = TableGrid;
