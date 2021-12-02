"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotatingText = void 0;
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
var rotate = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    from{\n        transform:rotate(0deg);\n    }\n    to{\n        transform:rotate(360deg)\n    }\n"], ["\n    from{\n        transform:rotate(0deg);\n    }\n    to{\n        transform:rotate(360deg)\n    }\n"])));
var StyledCenter = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display:flex;\n    flex-direction:center;\n    justify-content:center;\n    align-items:'center';\n"], ["\n    display:flex;\n    flex-direction:center;\n    justify-content:center;\n    align-items:'center';\n"])));
var StyledRotatingText = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    color:palevioletred;\n    display: inline-block;;\n    animation: ", " 2s linear infinite;\n    padding: 2rem 1rem;\n    font-size:1.2rem;\n    margin:auto;\n"], ["\n    color:palevioletred;\n    display: inline-block;;\n    animation: ", " 2s linear infinite;\n    padding: 2rem 1rem;\n    font-size:1.2rem;\n    margin:auto;\n"])), rotate);
var RotatingText = function (_a) {
    var text = _a.text;
    return (react_1.default.createElement(StyledCenter, null,
        react_1.default.createElement(StyledRotatingText, null, text)));
};
exports.RotatingText = RotatingText;
var templateObject_1, templateObject_2, templateObject_3;
