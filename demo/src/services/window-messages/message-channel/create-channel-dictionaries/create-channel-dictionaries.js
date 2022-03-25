"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChannelDictionaries = void 0;
var message_channel_1 = require("../message-channel");
var createChannelDictionaries = function () {
    if (!message_channel_1.MessageChannel.names) {
        message_channel_1.MessageChannel.names = new Set();
        message_channel_1.MessageChannel.ids = new Set();
        message_channel_1.MessageChannel.windows = new WeakSet();
        message_channel_1.MessageChannel.windowNames = new WeakMap();
        message_channel_1.MessageChannel.windowIds = new WeakMap();
        message_channel_1.MessageChannel.windowChannels = new WeakMap();
        message_channel_1.MessageChannel.idChannels = new Map();
        message_channel_1.MessageChannel.idNames = new Map();
        message_channel_1.MessageChannel.nameChannels = new Map();
        message_channel_1.MessageChannel.channelIds = new Map();
        message_channel_1.MessageChannel.channelNames = new Map();
        message_channel_1.MessageChannel.processChannel = new Map();
    }
};
exports.createChannelDictionaries = createChannelDictionaries;
//# sourceMappingURL=create-channel-dictionaries.js.map