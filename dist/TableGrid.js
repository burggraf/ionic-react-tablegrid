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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonCheckbox } from '@ionic/react';
import UtilsService from './services/utils.service';
import { TableColumnSort } from './TableColumnSort';
import './TableGrid.css';
import { useEffect, useState } from 'react';
var checksObj = {};
var checkedKeys = [];
var initialized = false;
export var TableGrid = function (_a) {
    var rows = _a.rows, headers = _a.headers, rowClick = _a.rowClick, sort = _a.sort, /*changeSortCallback,*/ sortableColumns = _a.sortableColumns, headerStyle = _a.headerStyle, rowStyle = _a.rowStyle, changeCheckboxesCallback = _a.changeCheckboxesCallback, maxColumnWidth = _a.maxColumnWidth;
    var utilsService = UtilsService.getInstance(maxColumnWidth);
    var keys = Object.keys(rows[0] || []);
    if (rows.length === 0) {
        return null;
    }
    var _b = useState(rows), displayRows = _b[0], setDisplayRows = _b[1];
    var _c = useState({ orderBy: (sort === null || sort === void 0 ? void 0 : sort.orderBy) || '', ascending: (sort === null || sort === void 0 ? void 0 : sort.ascending) || true }), currentSort = _c[0], setCurrentSort = _c[1];
    useEffect(function () {
        // updateDisplay
    }, [displayRows]);
    // initialize checkboxes
    if (!initialized) {
        initialized = true;
        displayRows.map(function (row) {
            keys.map(function (key) {
                var _a;
                if (((_a = row[key]) === null || _a === void 0 ? void 0 : _a.TYPE) === 'CHECKBOX' && (row[key].checked || row[key].value)) {
                    checkedKeys.push(row[key].id);
                    checksObj[row[key].id] = true;
                }
            });
        });
    }
    var changeSortCallbackLocal = function (sort) {
        var newRows = __spreadArray([], displayRows);
        newRows.sort(function (a, b) {
            var y = a[sort.orderBy];
            var z = b[sort.orderBy];
            if (sort.orderBy === '$price') {
                if (parseInt(y.replace(/,/g, '')) < parseInt(z.replace(/,/g, ''))) {
                    return sort.ascending ? -1 : 1;
                }
                if (parseInt(y.replace(/,/g, '')) > parseInt(z.replace(/,/g, ''))) {
                    return sort.ascending ? 1 : -1;
                }
            }
            else {
                if (y < z) {
                    return sort.ascending ? -1 : 1;
                }
                if (y > z) {
                    return sort.ascending ? 1 : -1;
                }
            }
            return 0;
        });
        setDisplayRows(newRows);
        setCurrentSort(sort);
    };
    return (_jsx("div", __assign({ className: "scroll-y" }, { children: _jsx("div", __assign({ className: "scroll-x" }, { children: _jsx("div", __assign({ className: "content-container", style: {} }, { children: _jsx("table", __assign({ style: {} }, { children: _jsxs("tbody", { children: [_jsxs("tr", { children: [keys.map(function (keyname, index) {
                                        var _a, _b;
                                        if (keyname.startsWith('$')) {
                                            return;
                                        }
                                        else {
                                            return (_jsxs("td", __assign({ style: __assign({ verticalAlign: 'bottom' }, headerStyle), className: 'breakItUp TableGrid-header' }, { children: [((_a = displayRows[0][keyname]) === null || _a === void 0 ? void 0 : _a.TYPE) === 'IMAGE' &&
                                                        (headers ? headers[index] || '' : ''),
                                                    ((_b = displayRows[0][keyname]) === null || _b === void 0 ? void 0 : _b.TYPE) !== 'IMAGE' &&
                                                        (headers ? headers[index] || '' : keyname),
                                                    sortableColumns && typeof sortableColumns[index] === 'string' &&
                                                        _jsx(TableColumnSort, { sort: currentSort, columnName: sortableColumns[index], callback: changeSortCallbackLocal }, void 0)] }), utilsService.randomKey()));
                                        }
                                    }), ";"] }, utilsService.randomKey()),
                            displayRows.map(function (row, index) { return (_jsx("tr", __assign({ onClick: function () {
                                    rowClick ? rowClick(row, index) : {};
                                } }, { children: keys.map(function (key /*, index*/) {
                                    var _a, _b, _c, _d, _e, _f, _g, _h;
                                    if (key.startsWith('$')) {
                                        return;
                                    }
                                    if (typeof row[key] !== 'object') {
                                        return (_jsx("td", __assign({ style: __assign(__assign({}, rowStyle || {}), ((_a = row[key]) === null || _a === void 0 ? void 0 : _a.cellStyle) || {}), className: 'breakItUp TableGrid-row' }, { children: row[key] }), utilsService.randomKey()));
                                    }
                                    else if (row[key] !== null && typeof row[key] === 'object' && ((_b = row[key]) === null || _b === void 0 ? void 0 : _b.TYPE)) {
                                        switch ((_c = row[key]) === null || _c === void 0 ? void 0 : _c.TYPE) {
                                            case 'CUSTOM':
                                                return (_jsx("td", __assign({ style: __assign(__assign({}, rowStyle || {}), ((_d = row[key]) === null || _d === void 0 ? void 0 : _d.cellStyle) || {}), className: 'breakItUp TableGrid-row' }, { children: _jsx("div", { dangerouslySetInnerHTML: { "__html": row[key].html } }, void 0) }), utilsService.randomKey()));
                                            case 'IMAGE':
                                                return (_jsx("td", __assign({ style: __assign(__assign({}, rowStyle || {}), ((_e = row[key]) === null || _e === void 0 ? void 0 : _e.cellStyle) || {}), className: 'breakItUp TableGrid-row' }, { children: _jsx("img", { src: row[key].url, alt: row[key].alt || '', style: row[key].itemStyle }, void 0) }), utilsService.randomKey()));
                                            case 'CHECKBOX':
                                                return (_jsx("td", __assign({ style: __assign(__assign({ textAlign: 'center', paddingLeft: '15px', paddingRight: '15px' }, rowStyle || {}), ((_f = row[key]) === null || _f === void 0 ? void 0 : _f.cellStyle) || {}), className: 'breakItUp TableGrid-row', onClick: function (e) { e.stopPropagation(); } }, { children: _jsx(IonCheckbox, { mode: "ios", checked: checksObj[row[key].id], onIonChange: function (e) {
                                                            if (e.detail.checked) {
                                                                checkedKeys.push(row[key].id);
                                                                checksObj[row[key].id] = true;
                                                            }
                                                            else {
                                                                checkedKeys = checkedKeys.filter(function (ck) { return ck !== row[key].id; });
                                                                checksObj[row[key].id] = false;
                                                            }
                                                            if (typeof changeCheckboxesCallback === 'function') {
                                                                changeCheckboxesCallback(checkedKeys);
                                                            }
                                                        } }, void 0) }), utilsService.randomKey()));
                                            case 'LINK':
                                                return (_jsx("td", __assign({ style: __assign({}, rowStyle || {}), className: 'breakItUp TableGrid-row' }, { children: _jsx("a", __assign({ href: row[key].URL, target: '_blank' }, { children: row[key].TEXT }), void 0) }), utilsService.randomKey()));
                                            case 'LINK_BUTTON':
                                                return (_jsx("td", __assign({ style: __assign({}, rowStyle || {}), className: 'breakItUp TableGrid-row' }, { children: _jsx("a", __assign({ href: row[key].URL, target: '_blank', className: 'TableGrid-linkButton' }, { children: row[key].TEXT }), void 0) }), utilsService.randomKey()));
                                            default:
                                                return (_jsx("td", __assign({ style: __assign(__assign({}, rowStyle || {}), ((_g = row[key]) === null || _g === void 0 ? void 0 : _g.cellStyle) || {}), className: 'breakItUp TableGrid-row' }, { children: JSON.stringify(row[key]) }), utilsService.randomKey()));
                                        }
                                    }
                                    else {
                                        return (_jsx("td", __assign({ style: __assign(__assign({}, rowStyle || {}), ((_h = row[key]) === null || _h === void 0 ? void 0 : _h.cellStyle) || {}), className: 'breakItUp TableGrid-row' }, { children: JSON.stringify(row[key]) }), utilsService.randomKey()));
                                    }
                                }) }), utilsService.randomKey())); })] }, void 0) }), utilsService.randomKey()) }), void 0) }), void 0) }), void 0));
};
