"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlight = exports.reactReplace = void 0;
const react_1 = __importDefault(require("react"));
const reactReplace = (text, regex, callback) => {
    let i = 0;
    return text.split(regex).map(subtext => {
        if (subtext.match(regex))
            return callback(subtext, i++);
        return subtext;
    });
};
exports.reactReplace = reactReplace;
const highlight = (text, options) => {
    let markOptions = (options[0] instanceof RegExp) ? [options] : options;
    let replacedText = Array.isArray(text) ? text : [text];
    let newText = [];
    markOptions.forEach(currentOptions => {
        let [regex, linkFn = (match, key) => react_1.default.createElement("a", { href: match, key: key }, match)] = currentOptions;
        replacedText.forEach(subtext => {
            if (typeof (subtext) !== 'string') {
                newText.push(subtext);
                return;
            }
            newText.push(...(0, exports.reactReplace)(subtext, regex, linkFn));
        });
        replacedText = newText;
        newText = [];
    });
    return replacedText;
};
exports.highlight = highlight;
