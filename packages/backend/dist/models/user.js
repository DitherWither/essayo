"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateError = exports.removePassword = void 0;
/**
 * Replaces password with null, to be sent to the client
 * @param user user to be mutated
 */
function removePassword(user) {
    user.password = undefined;
    return user;
}
exports.removePassword = removePassword;
var UserCreateError;
(function (UserCreateError) {
    UserCreateError[UserCreateError["EmailAlreadyExists"] = 0] = "EmailAlreadyExists";
    UserCreateError[UserCreateError["DatabaseAccessError"] = 1] = "DatabaseAccessError";
})(UserCreateError = exports.UserCreateError || (exports.UserCreateError = {}));
