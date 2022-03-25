"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locked = void 0;
/**
 * Ensures that the class method cannot be overwritten.
 */
var locked = function () {
    return function (target, key, descriptor) {
        if (descriptor) {
            descriptor.configurable = false;
            descriptor.writable = false;
            descriptor.enumerable = false;
            return descriptor;
        }
        else {
            Object.defineProperty(target, key, {
                set: function (value) {
                    Object.defineProperty(this, key, { value: value, writable: false, configurable: true });
                },
                configurable: false
            });
        }
        return;
    };
};
exports.locked = locked;
//# sourceMappingURL=locked.js.map