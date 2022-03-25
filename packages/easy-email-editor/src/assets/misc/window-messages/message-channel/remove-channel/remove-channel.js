"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeChannel = void 0;
var message_channel_1 = require("../message-channel");
var removeChannel = function (channel) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var name = channel.name;
    var id = channel['id'];
    var target = channel.target;
    if ((_a = message_channel_1.MessageChannel.names) === null || _a === void 0 ? void 0 : _a.has(name))
        message_channel_1.MessageChannel.names.delete(name);
    if ((_b = message_channel_1.MessageChannel.ids) === null || _b === void 0 ? void 0 : _b.has(id))
        message_channel_1.MessageChannel.ids.delete(id);
    if ((_c = message_channel_1.MessageChannel.windows) === null || _c === void 0 ? void 0 : _c.has(target))
        message_channel_1.MessageChannel.windows.delete(target);
    if ((_d = message_channel_1.MessageChannel.windowNames) === null || _d === void 0 ? void 0 : _d.has(target))
        message_channel_1.MessageChannel.windowNames.delete(target);
    if ((_e = message_channel_1.MessageChannel.windowIds) === null || _e === void 0 ? void 0 : _e.has(target))
        message_channel_1.MessageChannel.windowIds.delete(target);
    if ((_f = message_channel_1.MessageChannel.windowChannels) === null || _f === void 0 ? void 0 : _f.has(target))
        message_channel_1.MessageChannel.windowChannels.delete(target);
    if ((_g = message_channel_1.MessageChannel.idChannels) === null || _g === void 0 ? void 0 : _g.has(id))
        message_channel_1.MessageChannel.idChannels.delete(id);
    if ((_h = message_channel_1.MessageChannel.idNames) === null || _h === void 0 ? void 0 : _h.has(id))
        message_channel_1.MessageChannel.idNames.delete(id);
    if ((_j = message_channel_1.MessageChannel.nameChannels) === null || _j === void 0 ? void 0 : _j.has(name))
        message_channel_1.MessageChannel.nameChannels.delete(name);
    if ((_k = message_channel_1.MessageChannel.channelIds) === null || _k === void 0 ? void 0 : _k.has(channel))
        message_channel_1.MessageChannel.channelIds.delete(channel);
    if ((_l = message_channel_1.MessageChannel.channelNames) === null || _l === void 0 ? void 0 : _l.has(channel))
        message_channel_1.MessageChannel.channelNames.delete(channel);
    var processesToKill = [];
    (_m = message_channel_1.MessageChannel.processChannel) === null || _m === void 0 ? void 0 : _m.forEach(function (pChannel, pid) { return pChannel === channel && processesToKill.push(pid); });
    processesToKill.forEach(function (pid) { return message_channel_1.MessageChannel.processChannel.delete(pid); });
};
exports.removeChannel = removeChannel;
//# sourceMappingURL=remove-channel.js.map