"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
var message_channel_1 = require("../message-channel");
var initialize = function (name, target, channel) {
    message_channel_1.MessageChannel.names.add(name);
    message_channel_1.MessageChannel.windows.add(target);
    message_channel_1.MessageChannel.windowNames.set(target, name);
    message_channel_1.MessageChannel.windowChannels.set(target, channel);
    message_channel_1.MessageChannel.nameChannels.set(name, channel);
    message_channel_1.MessageChannel.channelNames.set(channel, name);
};
exports.initialize = initialize;
//# sourceMappingURL=initialize.js.map