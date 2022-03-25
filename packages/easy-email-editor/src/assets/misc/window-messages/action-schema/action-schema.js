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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionSchema = exports.RESERVED_KEYWORD = exports.NO_TYPE = void 0;
exports.NO_TYPE = 'An action schema requires a unique string as type property.';
exports.RESERVED_KEYWORD = "'type' is a reserved property which refers an the action type. Use a different name or nest without another property.";
/**
 * Use actionSchema to generate a valid action description with minimal boilerplate.
 * @param type Action type - A unique string that identifies the action
 * @param schema A description of said action
 */
var actionSchema = function (type, schema) {
    var _a;
    if (schema === void 0) { schema = {}; }
    if (typeof type !== 'string' || !type)
        throw Error(exports.NO_TYPE);
    if ((_a = schema.properties) === null || _a === void 0 ? void 0 : _a['type'])
        throw Error(exports.RESERVED_KEYWORD);
    var required = schema.required && Array.isArray(schema.required) ? schema.required : [];
    return {
        type: type,
        data: {
            type: 'object',
            properties: __assign(__assign({}, schema.properties), { type: {
                    const: type
                } }),
            required: __spreadArray([], __read(new Set(__spreadArray(__spreadArray([], __read(required), false), ['type'], false)).values()), false)
        }
    };
};
exports.actionSchema = actionSchema;
//# sourceMappingURL=action-schema.js.map