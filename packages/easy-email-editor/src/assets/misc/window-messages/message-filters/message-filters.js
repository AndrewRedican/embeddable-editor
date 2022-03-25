"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
var filter = function (actionType, callback) {
    return function (message, channel) {
        if (actionType === message.type) {
            callback(message, channel);
        }
    };
};
exports.filter = filter;
//# sourceMappingURL=message-filters.js.map