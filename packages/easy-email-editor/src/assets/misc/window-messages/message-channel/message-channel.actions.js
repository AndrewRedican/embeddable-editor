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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessage = exports.destroyConnection = exports.closeConnectionAcknowledged = exports.closeConnection = exports.denyConnection = exports.openConnection = exports.acceptConnection = exports.cancelConnectionAcknowledged = exports.cancelConnection = exports.requestConnection = exports.invalidRequest = exports.typesList = exports.types = exports.protocol = void 0;
var message_broker_1 = require("../message-broker/message-broker");
exports.protocol = 'window-messages';
exports.types = {
    invalidRequest: "[".concat(exports.protocol, "] invalid-request"),
    requestConnection: "[".concat(exports.protocol, "] connection-request"),
    cancelConnection: "[".concat(exports.protocol, "] connection-request-cancelled"),
    cancelConnectionAcknowledged: "[".concat(exports.protocol, "] connection-request-cancelled-acknowledged"),
    acceptConnection: "[".concat(exports.protocol, "] connection-request-accepted"),
    denyConnection: "[".concat(exports.protocol, "] connection-request-denied"),
    closeConnection: "[".concat(exports.protocol, "] connection-closed"),
    closeConnectionAcknowledged: "[".concat(exports.protocol, "] connection-closed-acknowledged"),
    destroyConnection: "[".concat(exports.protocol, "] connection-destroyed"),
    openConnection: "[".concat(exports.protocol, "] connection-opened"),
    newMessage: "[".concat(exports.protocol, "] new-message")
};
exports.typesList = Object.values(exports.types);
var contract = function () { return ({ contract: message_broker_1.MessageBroker.contract }); };
var id = function () { return ({ senderId: message_broker_1.MessageBroker.id }); };
var invalidRequest = function (processId, error) { return (__assign({ type: exports.types.invalidRequest, processId: processId, error: error }, id())); };
exports.invalidRequest = invalidRequest;
var requestConnection = function (processId) { return (__assign(__assign({ type: exports.types.requestConnection, processId: processId }, id()), contract())); };
exports.requestConnection = requestConnection;
var cancelConnection = function (processId) { return (__assign({ type: exports.types.cancelConnection, processId: processId }, id())); };
exports.cancelConnection = cancelConnection;
var cancelConnectionAcknowledged = function (processId) { return (__assign({ type: exports.types.cancelConnectionAcknowledged, processId: processId }, id())); };
exports.cancelConnectionAcknowledged = cancelConnectionAcknowledged;
var acceptConnection = function (processId) { return (__assign(__assign({ type: exports.types.acceptConnection, processId: processId }, id()), contract())); };
exports.acceptConnection = acceptConnection;
var openConnection = function (processId) { return (__assign({ type: exports.types.openConnection, processId: processId }, id())); };
exports.openConnection = openConnection;
var denyConnection = function (processId, error) { return (__assign({ type: exports.types.denyConnection, processId: processId, error: error }, id())); };
exports.denyConnection = denyConnection;
var closeConnection = function (processId) { return (__assign({ type: exports.types.closeConnection, processId: processId }, id())); };
exports.closeConnection = closeConnection;
var closeConnectionAcknowledged = function (processId) { return (__assign({ type: exports.types.closeConnectionAcknowledged, processId: processId }, id())); };
exports.closeConnectionAcknowledged = closeConnectionAcknowledged;
var destroyConnection = function () { return (__assign({ type: exports.types.destroyConnection }, id())); };
exports.destroyConnection = destroyConnection;
var newMessage = function (data) { return (__assign({ type: exports.types.newMessage, data: data }, id())); };
exports.newMessage = newMessage;
//# sourceMappingURL=message-channel.actions.js.map