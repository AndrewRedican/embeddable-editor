"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAction = void 0;
var jsonschema_1 = require("jsonschema");
var simpleActionDefaultSchema = {
    type: 'object',
    properties: { type: { type: 'string' } },
    required: ['type'],
    additionalProperties: false
};
var validateAction = function (action, actionList) {
    var actionDescription = actionList.find(function (desc) { return desc.type === action.type; });
    if (actionDescription === undefined)
        throw Error('Action is not listed exist in contract.');
    var actionSchema = actionDescription.data || simpleActionDefaultSchema;
    try {
        (0, jsonschema_1.validate)(action, actionSchema, { throwError: true, nestedErrors: true });
    }
    catch (exception) {
        var error = exception;
        throw Error("Invalid Action { type = ".concat(action.type, " }: ").concat(error.toString().replace('instance.', '').replace('instance', 'It'), "."));
    }
};
exports.validateAction = validateAction;
//# sourceMappingURL=validate-action.js.map