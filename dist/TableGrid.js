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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UtilsService } from './services/utils.service';
import { TableColumnSort } from './TableColumnSort';
import './TableGrid.css';
var utilsService = new UtilsService();
export var TableGrid = function (_a) {
    var rows = _a.rows, rowClick = _a.rowClick, sort = _a.sort, changeSortCallback = _a.changeSortCallback, sortableColumns = _a.sortableColumns, headerStyle = _a.headerStyle, rowStyle = _a.rowStyle;
    var keys = Object.keys(rows[0] || []);
    var _b = utilsService.getGridWidths(rows), gridWidth = _b.gridWidth, columnWidths = _b.columnWidths;
    return (_jsx("div", __assign({ style: { height: '100%', overflow: 'scroll' } }, { children: _jsx("table", __assign({ style: { width: gridWidth + 'px' } }, { children: _jsxs("tbody", { children: [_jsx("tr", { children: keys.map(function (keyname, index) { return (_jsxs("td", __assign({ style: __assign({ verticalAlign: 'bottom', width: columnWidths[index] + 'px' }, headerStyle), className: 'breakItUp TableGrid-header' }, { children: [keyname, sort && changeSortCallback && sortableColumns && typeof sortableColumns[index] === 'string' &&
                                    _jsx(TableColumnSort, { sort: sort, columnName: sortableColumns[index], callback: changeSortCallback }, void 0)] }), utilsService.randomKey())); }) }, utilsService.randomKey()),
                    rows.map(function (row, index) { return (_jsx("tr", __assign({ onClick: function () { rowClick ? rowClick(row, index) : {}; } }, { children: keys.map(function (key, index) {
                            // if (!Array.isArray(row[key])) {
                            if (typeof row[key] !== 'object') {
                                return (_jsx("td", __assign({ style: __assign({ width: columnWidths[index] + 'px' }, rowStyle), className: 'breakItUp TableGrid-row' }, { children: row[key] }), utilsService.randomKey()));
                            }
                            else if (row[key].TYPE) {
                                switch (row[key].TYPE) {
                                    case 'IMAGE':
                                        return (_jsx("td", __assign({ style: __assign(__assign({ width: columnWidths[index] + 'px' }, rowStyle), row[key].cellStyle), className: 'breakItUp TableGrid-row' }, { children: _jsx("img", { src: row[key].url, alt: row[key].alt || '', style: row[key].itemStyle }, void 0) }), utilsService.randomKey()));
                                    case 'LINK':
                                        return (_jsx("td", __assign({ style: __assign({ width: columnWidths[index] + 'px' }, rowStyle), className: 'breakItUp TableGrid-row' }, { children: _jsx("a", __assign({ href: row[key].URL, target: '_blank' }, { children: row[key].TEXT }), void 0) }), utilsService.randomKey()));
                                    case 'LINK_BUTTON':
                                        return (_jsx("td", __assign({ style: __assign({ width: columnWidths[index] + 'px' }, rowStyle), className: 'breakItUp TableGrid-row' }, { children: _jsx("a", __assign({ href: row[key].URL, target: '_blank', className: 'TableGrid-linkButton' }, { children: row[key].TEXT }), void 0) }), utilsService.randomKey()));
                                    default:
                                        return (_jsx("td", __assign({ style: { width: columnWidths[index] + 'px' }, className: 'breakItUp TableGrid-row' }, { children: JSON.stringify(row[key]) }), utilsService.randomKey()));
                                }
                            }
                            else {
                                return (_jsx("td", __assign({ style: { width: columnWidths[index] + 'px' }, className: 'breakItUp TableGrid-row' }, { children: JSON.stringify(row[key]) }), utilsService.randomKey()));
                            }
                        }) }), utilsService.randomKey())); })] }, void 0) }), utilsService.randomKey()) }), void 0));
};
