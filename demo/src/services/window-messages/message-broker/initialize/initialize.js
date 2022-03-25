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
exports.initialize = void 0;
var uuid_1 = require("uuid");
var create_channel_dictionaries_1 = require("../../message-channel/create-channel-dictionaries/create-channel-dictionaries");
var message_broker_1 = require("../message-broker");
var initialize = function (window, contract, onMessage) {
    if (!message_broker_1.MessageBroker.id) {
        message_broker_1.MessageBroker.id = (0, uuid_1.v4)();
        message_broker_1.MessageBroker.contract = contract;
        message_broker_1.MessageBroker.acceptedActionTypes = __spreadArray([], __read(message_broker_1.MessageBroker.contract.accepted.map(function (a) { return a.type; })), false);
        Object.freeze(message_broker_1.MessageBroker.id);
        Object.freeze(message_broker_1.MessageBroker.contract);
        Object.freeze(message_broker_1.MessageBroker.acceptedActionTypes);
        (0, create_channel_dictionaries_1.createChannelDictionaries)();
        window.addEventListener('message', onMessage);
    }
};
exports.initialize = initialize;
//# sourceMappingURL=initialize.js.map