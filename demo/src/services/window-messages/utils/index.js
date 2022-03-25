"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastKeyInMap = exports.defineLockedProperties = exports.locked = void 0;
var locked_1 = require("./locked/locked");
Object.defineProperty(exports, "locked", { enumerable: true, get: function () { return locked_1.locked; } });
var define_locked_properties_1 = require("./define-locked-properties/define-locked-properties");
Object.defineProperty(exports, "defineLockedProperties", { enumerable: true, get: function () { return define_locked_properties_1.defineLockedProperties; } });
var get_last_item_in_map_1 = require("./get-last-item-in-map/get-last-item-in-map");
Object.defineProperty(exports, "getLastKeyInMap", { enumerable: true, get: function () { return get_last_item_in_map_1.getLastKeyInMap; } });
//# sourceMappingURL=index.js.map