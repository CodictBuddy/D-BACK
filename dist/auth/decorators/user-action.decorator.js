"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCheck = exports.UserActions = exports.UserActionType = void 0;
const common_1 = require("@nestjs/common");
exports.UserActionType = (details) => common_1.SetMetadata("userAction", details);
var UserActions;
(function (UserActions) {
    UserActions["create"] = "create";
    UserActions["view"] = "view";
    UserActions["delete"] = "delete";
    UserActions["edit"] = "edit";
})(UserActions = exports.UserActions || (exports.UserActions = {}));
var ActionCheck;
(function (ActionCheck) {
    ActionCheck["create"] = "checkForAccess";
    ActionCheck["delete"] = "checkResourceAccess";
    ActionCheck["edit"] = "checkResourceAccess";
    ActionCheck["view"] = "returnFilters";
    ActionCheck["list"] = "returnFilters";
    ActionCheck["detail"] = "checkResourceAccess";
})(ActionCheck = exports.ActionCheck || (exports.ActionCheck = {}));
//# sourceMappingURL=user-action.decorator.js.map