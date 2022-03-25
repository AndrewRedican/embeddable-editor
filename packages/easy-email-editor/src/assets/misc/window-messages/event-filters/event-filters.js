"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalid = exports.deny = exports.cancel = exports.close = exports.open = void 0;
var message_channel_model_1 = require("../message-channel/message-channel.model");
var open = function (callback) {
    return function (event, channel, message) {
        if (event === message_channel_model_1.ChannelEvent.Opened) {
            callback(channel, message);
        }
    };
};
exports.open = open;
var close = function (callback) {
    return function (event, channel, message) {
        if (event === message_channel_model_1.ChannelEvent.Closed) {
            callback(channel, message);
        }
    };
};
exports.close = close;
var cancel = function (callback) {
    return function (event, channel, message) {
        if (event === message_channel_model_1.ChannelEvent.Cancelled) {
            callback(channel, message);
        }
    };
};
exports.cancel = cancel;
var deny = function (callback) {
    return function (event, channel, message) {
        if (event === message_channel_model_1.ChannelEvent.Denied) {
            callback(channel, message);
        }
    };
};
exports.deny = deny;
var invalid = function (callback) {
    return function (event, channel, message) {
        if (event === message_channel_model_1.ChannelEvent.Invalid) {
            callback(channel, message);
        }
    };
};
exports.invalid = invalid;
//# sourceMappingURL=event-filters.js.map