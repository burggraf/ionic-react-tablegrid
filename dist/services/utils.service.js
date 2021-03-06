var UtilsService = /** @class */ (function () {
    function UtilsService(maxColumnWidth) {
        var _this = this;
        if (maxColumnWidth === void 0) { maxColumnWidth = 400; }
        this.maxColumnWidth = 400;
        this.uuidv4 = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        };
        this.randomKey = function () {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };
        this.getTextWidth = function (text, font) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            if (context) {
                context.font = font || getComputedStyle(document.body).font;
                var calculated = Math.round((context.measureText(text).width * 1.05) + 10); // pad here? 10
                return Math.min(calculated, _this.maxColumnWidth);
            }
            else {
                return 0;
            }
        };
        this.getGridWidths = function (obj, headers) {
            var columnWidths = [];
            var keys = Object.keys(obj[0] || []);
            var gridWidth = 0;
            for (var j = 0; j < keys.length; j++) {
                var textWidth = 0;
                var firstItem = obj[0][keys[j]];
                if (headers && headers[j]) {
                    textWidth = _this.getTextWidth(headers[j]);
                }
                else if (typeof firstItem === 'object' && (firstItem === null || firstItem === void 0 ? void 0 : firstItem.TYPE) && (firstItem === null || firstItem === void 0 ? void 0 : firstItem.TYPE) === 'CHECKBOX') {
                    textWidth = 20;
                }
                else {
                    textWidth = _this.getTextWidth(keys[j]);
                }
                if (typeof columnWidths[j] !== 'number' || textWidth > columnWidths[j]) {
                    columnWidths[j] = textWidth + 40; // 35;
                }
                for (var k = 0; k < obj.length; k++) {
                    var item = obj[k][keys[j]];
                    var textWidth_1 = 0;
                    if (typeof item === 'string') {
                        textWidth_1 = _this.getTextWidth(item);
                    }
                    else if (typeof item === 'number') {
                        textWidth_1 = _this.getTextWidth(item.toString());
                    }
                    else if (typeof item === 'boolean') {
                        textWidth_1 = _this.getTextWidth(item.toString());
                    }
                    else if (typeof item === 'object' && (item === null || item === void 0 ? void 0 : item.TYPE) && (item === null || item === void 0 ? void 0 : item.TYPE) === 'CHECKBOX') {
                        textWidth_1 = 20;
                    }
                    else if (typeof item === 'object' && item !== null && typeof item !== 'undefined') {
                        if (!item.TYPE) {
                            textWidth_1 = _this.getTextWidth(JSON.stringify(item));
                        }
                    }
                    if (typeof columnWidths[j] !== 'number' || textWidth_1 > columnWidths[j]) {
                        columnWidths[j] = textWidth_1;
                    }
                }
            }
            for (var j = 0; j < keys.length; j++) {
                gridWidth += columnWidths[j];
            }
            return { gridWidth: gridWidth, columnWidths: columnWidths };
        };
        this.maxColumnWidth = maxColumnWidth;
        ;
    }
    UtilsService.getInstance = function (maxColumnWidth) {
        if (maxColumnWidth === void 0) { maxColumnWidth = 400; }
        if (this.myInstance == null) {
            this.myInstance = new this(maxColumnWidth);
        }
        return this.myInstance;
    };
    UtilsService.myInstance = null;
    return UtilsService;
}());
export default UtilsService;
