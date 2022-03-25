"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContract = void 0;
var jsonschema_1 = require("jsonschema");
var v4Schema = __importStar(require("./schema/v4/v4.json"));
var actionSchema = __importStar(require("./schema/action/action.json"));
var contractSchema = __importStar(require("./schema/contract/contract.json"));
var validateContract = function (channelContract) {
    var _a, _b;
    var validator = new jsonschema_1.Validator();
    validator.addSchema(v4Schema, '/v4');
    validator.addSchema(actionSchema, '/action');
    var emittedCount = ((_a = channelContract === null || channelContract === void 0 ? void 0 : channelContract.emitted) === null || _a === void 0 ? void 0 : _a.length) || 0;
    var acceptedCount = ((_b = channelContract === null || channelContract === void 0 ? void 0 : channelContract.accepted) === null || _b === void 0 ? void 0 : _b.length) || 0;
    if (emittedCount + acceptedCount === 0) {
        throw new Error('Contract must contain at least one accepted/emitted action.');
    }
    try {
        validator.validate(channelContract, contractSchema, { throwError: true, nestedErrors: true });
    }
    catch (exception) {
        var error = exception;
        throw new Error("Invalid Contract: ".concat(error.path.join('.')).concat(error.toString(), "."));
    }
};
exports.validateContract = validateContract;
//# sourceMappingURL=validate-contract.js.map