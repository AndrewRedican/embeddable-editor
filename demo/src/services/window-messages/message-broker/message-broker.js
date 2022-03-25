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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBroker = void 0;
var message_channel_model_1 = require("../message-channel/message-channel.model");
var message_channel_1 = require("../message-channel/message-channel");
var utils_1 = require("../utils");
var initialize_1 = require("./initialize/initialize");
var validate_contract_1 = require("./validate-contract/validate-contract");
var validate_name_1 = require("./validate-name/validate-name");
var actions = __importStar(require("../message-channel/message-channel.actions"));
var uuid_1 = require("uuid");
var MessageBroker = /** @class */ (function () {
    function MessageBroker(name, contract) {
        var _this = this;
        this.addChannel = function (name, target, settings) {
            if (settings === void 0) { settings = {}; }
            if (message_channel_1.MessageChannel.windowChannels.has(target)) {
                return message_channel_1.MessageChannel.windowChannels.get(target);
            }
            return new message_channel_1.MessageChannel(name, target, settings);
        };
        this.getChannel = function (reference) {
            if (typeof reference === 'object' && message_channel_1.MessageChannel.windowChannels.has(reference)) {
                return message_channel_1.MessageChannel.windowChannels.get(reference);
            }
            if (typeof reference === 'string' && message_channel_1.MessageChannel.idChannels.has(reference)) {
                return message_channel_1.MessageChannel.idChannels.get(reference);
            }
            if (typeof reference === 'string' && message_channel_1.MessageChannel.nameChannels.has(reference)) {
                return message_channel_1.MessageChannel.nameChannels.get(reference);
            }
            return null;
        };
        this.setSecurityPolicy = function (connectionRequestPolicy) {
            if (typeof connectionRequestPolicy !== 'function') {
                throw Error('Expected to receive a function that returns true or false.');
            }
            MessageBroker.allowConnection = connectionRequestPolicy;
            return _this;
        };
        this.onMessage = function (message) {
            var _a, _b;
            var action = message === null || message === void 0 ? void 0 : message.data;
            var actionType = action === null || action === void 0 ? void 0 : action.type;
            if (!actions.typesList.includes(actionType))
                return;
            var senderId = action.senderId;
            var processId = action.processId;
            var contract = action.contract;
            if (typeof senderId !== 'string' || !(0, uuid_1.validate)(senderId)) {
                (_a = message.source) === null || _a === void 0 ? void 0 : _a.postMessage(actions.invalidRequest(processId, 'Invalid senderId. Cannot identify sender.'), '*');
            }
            if (![actions.types.newMessage, actions.types.destroyConnection].includes(actionType) && (typeof processId !== 'string' || !(0, uuid_1.validate)(processId))) {
                return (_b = message.source) === null || _b === void 0 ? void 0 : _b.postMessage(actions.invalidRequest(processId, 'Invalid processId.'), '*');
            }
            switch (actionType) {
                case actions.types.requestConnection:
                    return _this.handleRequestConnection(senderId, processId, contract, message);
                case actions.types.cancelConnection:
                    return _this.handleCancelConnection(senderId, processId);
                case actions.types.cancelConnectionAcknowledged:
                    return _this.handleCancelConnectionAcknowledged(processId);
                case actions.types.acceptConnection:
                    return _this.handleAcceptConnection(senderId, processId, contract, message);
                case actions.types.denyConnection:
                    return _this.handleDeniedConnection(processId, message);
                case actions.types.openConnection:
                    return _this.handleOpenedConnection(processId, message);
                case actions.types.closeConnection:
                    return _this.handleCloseConnection(senderId, processId);
                case actions.types.closeConnectionAcknowledged:
                    return _this.handleCloseConnectionAcknowledged(processId);
                case actions.types.destroyConnection:
                    return _this.handleDestroyConnection(senderId);
                case actions.types.newMessage:
                    return _this.handleNewMessage(senderId, action.data);
                case actions.types.invalidRequest:
                    return _this.handleInvalidRequest(processId, message);
            }
        };
        this.handleRequestConnection = function (senderId, processId, contract, message) {
            var channel = message_channel_1.MessageChannel.idChannels.get(senderId) || _this.addChannel(processId, message.source, {});
            channel['trackProcess'](processId);
            if (channel.open)
                return channel['sendAction'](actions.acceptConnection(processId));
            try {
                (0, validate_contract_1.validateContract)(contract);
            }
            catch (error) {
                channel['sendAction'](actions.denyConnection(processId, 'Invalid contract.'));
                channel['terminateProcess'](processId);
                return;
            }
            if (MessageBroker.allowConnection && !MessageBroker.allowConnection(message)) {
                channel['sendAction'](actions.denyConnection(processId, 'Not accepted.'));
                channel['terminateProcess'](processId);
                return;
            }
            channel['setActive'](senderId, contract);
            channel['sendAction'](actions.acceptConnection(processId));
        };
        this.handleCancelConnection = function (senderId, processId) {
            var channel = message_channel_1.MessageChannel.idChannels.get(senderId) || message_channel_1.MessageChannel.processChannel.get(processId);
            if (channel) {
                channel.cancel(false);
                channel['sendAction'](actions.cancelConnectionAcknowledged(processId));
                channel['terminateProcess'](processId);
                channel['notifyEvent'](message_channel_model_1.ChannelEvent.Cancelled, channel);
            }
        };
        this.handleCancelConnectionAcknowledged = function (processId) {
            var channel = message_channel_1.MessageChannel.processChannel.get(processId);
            if (channel) {
                channel['terminateProcess'](processId);
                channel['notifyEvent'](message_channel_model_1.ChannelEvent.Cancelled, channel);
            }
        };
        this.handleAcceptConnection = function (senderId, processId, contract, message) {
            var channel = message_channel_1.MessageChannel.processChannel.get(processId);
            if (!channel || channel.open)
                return;
            try {
                (0, validate_contract_1.validateContract)(contract);
            }
            catch (error) {
                return channel['sendAction'](actions.cancelConnection(processId));
            }
            if (MessageBroker.allowConnection && !MessageBroker.allowConnection(message)) {
                return channel['sendAction'](actions.cancelConnection(processId));
            }
            channel['setActive'](senderId, contract);
            channel['sendAction'](actions.openConnection(processId));
            channel['terminateProcess'](processId);
            channel['notifyEvent'](message_channel_model_1.ChannelEvent.Opened, channel, message);
        };
        this.handleDeniedConnection = function (processId, message) {
            var channel = message_channel_1.MessageChannel.processChannel.get(processId);
            if (channel) {
                channel['terminateProcess'](processId);
                channel['notifyEvent'](message_channel_model_1.ChannelEvent.Denied, channel, message);
            }
        };
        this.handleOpenedConnection = function (processId, message) {
            var channel = message_channel_1.MessageChannel.processChannel.get(processId);
            if (channel) {
                channel['terminateProcess'](processId);
                channel['notifyEvent'](message_channel_model_1.ChannelEvent.Opened, channel, message);
            }
        };
        this.handleCloseConnection = function (senderId, processId) {
            var channel = message_channel_1.MessageChannel.idChannels.get(senderId);
            if (channel === null || channel === void 0 ? void 0 : channel.open) {
                channel.close(false);
                channel['sendAction'](actions.closeConnectionAcknowledged(processId));
                channel['terminateProcess'](processId);
                channel['notifyEvent'](message_channel_model_1.ChannelEvent.Closed, channel);
            }
        };
        this.handleCloseConnectionAcknowledged = function (processId) {
            var channel = message_channel_1.MessageChannel.processChannel.get(processId);
            if (channel) {
                channel['terminateProcess'](processId);
                channel['notifyEvent'](message_channel_model_1.ChannelEvent.Closed, channel);
            }
        };
        this.handleDestroyConnection = function (senderId) {
            var _a;
            (_a = message_channel_1.MessageChannel.idChannels.get(senderId)) === null || _a === void 0 ? void 0 : _a.destroy(false);
        };
        this.handleNewMessage = function (senderId, action) {
            var channel = message_channel_1.MessageChannel.idChannels.get(senderId);
            (channel === null || channel === void 0 ? void 0 : channel.open) && channel['notifyMessageReceived'](action, channel);
        };
        this.handleInvalidRequest = function (processId, message) {
            var channel = message_channel_1.MessageChannel.processChannel.get(processId);
            channel && channel['notifyEvent'](message_channel_model_1.ChannelEvent.Invalid, channel, message);
        };
        (0, validate_name_1.validateName)(name);
        (0, validate_contract_1.validateContract)(contract);
        (0, initialize_1.initialize)(window, contract, this.onMessage);
    }
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "addChannel", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "getChannel", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "setSecurityPolicy", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "onMessage", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleRequestConnection", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleCancelConnection", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleCancelConnectionAcknowledged", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleAcceptConnection", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleDeniedConnection", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleOpenedConnection", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleCloseConnection", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleCloseConnectionAcknowledged", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleDestroyConnection", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleNewMessage", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageBroker.prototype, "handleInvalidRequest", void 0);
    return MessageBroker;
}());
exports.MessageBroker = MessageBroker;
//# sourceMappingURL=message-broker.js.map