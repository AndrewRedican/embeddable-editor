"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validations = void 0;
var message_broker_1 = require("../../message-broker/message-broker");
var message_channel_1 = require("../message-channel");
var validations = function (name, target) {
    var _a, _b;
    if (!message_broker_1.MessageBroker.id) {
        throw new Error("MessageBroker has not been instantiated.");
    }
    if ((_a = message_channel_1.MessageChannel.names) === null || _a === void 0 ? void 0 : _a.has(name)) {
        throw new Error("Channel '".concat(name, "' is already registed."));
    }
    if ((_b = message_channel_1.MessageChannel.windows) === null || _b === void 0 ? void 0 : _b.has(target)) {
        throw new Error("Window '".concat(message_channel_1.MessageChannel.windowNames.get(target), "' is already registed."));
    }
};
exports.validations = validations;
//# sourceMappingURL=validations.js.map