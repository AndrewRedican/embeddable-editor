"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = void 0;
var validateName = function (name) {
    if (typeof name !== 'string' || !name.length) {
        throw Error('MessageBroker requires a name.');
    }
};
exports.validateName = validateName;
//# sourceMappingURL=validate-name.js.map