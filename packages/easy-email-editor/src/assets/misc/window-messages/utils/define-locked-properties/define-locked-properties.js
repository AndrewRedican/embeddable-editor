"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineLockedProperties = exports.lockedPropertyDescriptors = void 0;
var lockedPropertyDescriptors = function (value, enumerable) {
    if (enumerable === void 0) { enumerable = false; }
    return ({
        value: value,
        writable: false,
        configurable: false,
        enumerable: enumerable
    });
};
exports.lockedPropertyDescriptors = lockedPropertyDescriptors;
var defineLockedProperties = function (object, propertyValuePairs) {
    var propertyMap = {};
    propertyValuePairs.forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return (propertyMap[key] = (0, exports.lockedPropertyDescriptors)(value));
    });
    Object.defineProperties(object, propertyMap);
};
exports.defineLockedProperties = defineLockedProperties;
//# sourceMappingURL=define-locked-properties.js.map