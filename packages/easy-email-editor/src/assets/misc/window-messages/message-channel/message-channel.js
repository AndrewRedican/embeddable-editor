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
exports.MessageChannel = void 0;
var initialize_1 = require("./initialize/initialize");
var validations_1 = require("./validations/validations");
var create_channel_dictionaries_1 = require("./create-channel-dictionaries/create-channel-dictionaries");
var message_broker_1 = require("../message-broker/message-broker");
var actions = __importStar(require("../message-channel/message-channel.actions"));
var utils_1 = require("../utils");
var validate_action_1 = require("./validate-action/validate-action");
var uuid_1 = require("uuid");
var remove_channel_1 = require("./remove-channel/remove-channel");
var MessageChannel = /** @class */ (function () {
    function MessageChannel(name, target, settings) {
        var _this = this;
        if (settings === void 0) { settings = {}; }
        this.active = false;
        this.notifyEventSpy = new Function();
        this.notifyMessageReceivedSpy = new Function();
        this.connect = function () {
            var processId = _this.createProcess();
            _this.closed && _this.sendAction(actions.requestConnection(processId));
        };
        this.cancel = function (notifyTarget) {
            if (notifyTarget === void 0) { notifyTarget = true; }
            if (_this.closed) {
                if (notifyTarget) {
                    var processId = _this.createProcess();
                    _this.sendAction(actions.cancelConnection(processId));
                }
            }
            else {
                _this.close(notifyTarget);
            }
        };
        this.close = function (notifyTarget) {
            if (notifyTarget === void 0) { notifyTarget = true; }
            if (_this.open) {
                _this.setInactive();
                var processId = _this.createProcess();
                notifyTarget && _this.sendAction(actions.closeConnection(processId));
            }
        };
        this.destroy = function (notifyTarget) {
            if (notifyTarget === void 0) { notifyTarget = true; }
            _this.setInactive();
            notifyTarget && _this.sendAction(actions.destroyConnection());
            (0, remove_channel_1.removeChannel)(_this);
        };
        this.on = function (eventHandler) {
            if (typeof eventHandler !== 'function') {
                throw Error('Expected callback function.');
            }
            _this.eventSubscriptions.push(eventHandler);
            return _this;
        };
        this.onMessage = function (messageHandler) {
            if (typeof messageHandler !== 'function') {
                throw Error('Expected callback function.');
            }
            _this.messageSubscriptions.push(messageHandler);
            return _this;
        };
        this.setActive = function (id, contract) {
            _this.id = id;
            _this.contract = contract;
            _this.acceptedActions = contract.accepted.map(function (a) { return a.type; });
            Object.freeze(_this.id);
            Object.freeze(_this.contract);
            Object.freeze(_this.acceptedActions);
            MessageChannel.ids.add(id);
            MessageChannel.windowIds.set(_this.target, id);
            MessageChannel.idChannels.set(id, _this);
            MessageChannel.channelIds.set(_this, id);
            MessageChannel.idNames.set(id, _this.name);
            _this.active = true;
        };
        this.setInactive = function () {
            _this.active = false;
        };
        this.sendAction = function (action) {
            if (!action || typeof action.type !== 'string') {
                throw new Error("Action must contain a 'type' property that is a non-empty string.");
            }
            if (!actions.typesList.includes(action.type)) {
                throw new Error("Action is not valid. Type must match any of these: ".concat(actions.typesList, "."));
            }
            if (action.senderId !== message_broker_1.MessageBroker.id) {
                throw new Error("Action must contain an 'id' property whose value matches the broker id.");
            }
            if (action.type === actions.types.newMessage && _this.closed) {
                throw new Error("Cannot send message. Channel ".concat(_this.name, " is not open."));
            }
            _this.target.postMessage(action, '*');
        };
        this.sendMessage = function (action) {
            var error;
            if (!_this.acceptedActions.includes(action === null || action === void 0 ? void 0 : action.type)) {
                error = "".concat(message_broker_1.MessageBroker.name, ": Cannot send message to ").concat(_this.name, " channel. Message type '").concat(action === null || action === void 0 ? void 0 : action.type, "' is not accepted in channel contract.");
                throw new Error(error);
            }
            try {
                _this.validateMessage(action);
            }
            catch (exception) {
                error = "".concat(message_broker_1.MessageBroker.name, ": Cannot send message of type '").concat(action.type, "' to ").concat(_this.name, " channel.");
                error += "\n".concat(exception.message);
                throw new Error(error);
            }
            _this.sendAction(actions.newMessage(action));
        };
        this.validateMessage = function (action) { return (0, validate_action_1.validateAction)(action, _this.contract.accepted); };
        this.notifyEvent = function (eventType, channel, message) {
            if (message) {
                _this.notifyEventSpy(eventType, channel, message);
            }
            else {
                _this.notifyEventSpy(eventType, channel);
            }
            _this.eventSubscriptions.forEach(function (callback) { return callback(eventType, channel, message); });
        };
        this.notifyMessageReceived = function (message, channel) {
            _this.notifyMessageReceivedSpy(message, channel);
            _this.messageSubscriptions.forEach(function (callback) { return callback(message, channel); });
        };
        this.createProcess = function () {
            var processId = (0, uuid_1.v4)();
            MessageChannel.processChannel.set(processId, _this);
            return processId;
        };
        this.trackProcess = function (processId) {
            MessageChannel.processChannel.set(processId, _this);
        };
        this.terminateProcess = function (processId) {
            var channel = MessageChannel.processChannel.get(processId);
            if (!channel)
                return;
            if (channel !== _this) {
                throw new Error("Cannot terminte process that belongs to a different channel. [".concat(processId, "]"));
            }
            MessageChannel.processChannel.delete(processId);
        };
        this.toJSON = function () {
            return {
                name: _this.name,
                id: _this.id,
                contract: _this.contract,
                active: _this.active
            };
        };
        (0, validations_1.validations)(name, target);
        (0, create_channel_dictionaries_1.createChannelDictionaries)();
        (0, utils_1.defineLockedProperties)(this, [
            ['name', name],
            ['target', target],
            ['settings', settings],
            ['eventSubscriptions', []],
            ['messageSubscriptions', []]
        ]);
        (0, initialize_1.initialize)(name, target, this);
    }
    Object.defineProperty(MessageChannel.prototype, "open", {
        get: function () {
            return this.active;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MessageChannel.prototype, "closed", {
        get: function () {
            return !this.open;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "connect", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "cancel", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "close", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "destroy", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "on", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "onMessage", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "setActive", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "setInactive", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "sendAction", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "sendMessage", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "validateMessage", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "notifyEvent", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "notifyMessageReceived", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "createProcess", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "trackProcess", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "terminateProcess", void 0);
    __decorate([
        (0, utils_1.locked)()
    ], MessageChannel.prototype, "toJSON", void 0);
    return MessageChannel;
}());
exports.MessageChannel = MessageChannel;
//# sourceMappingURL=message-channel.js.map