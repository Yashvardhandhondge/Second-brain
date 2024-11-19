"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
//It's am db,ts file for storing users and the brain (i.e) ideas tweets and video from youtube user wants to store
const mongoose_1 = __importDefault(require("mongoose"));
//user Schema 
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String },
});
// user model
exports.User = mongoose_1.default.model("User", UserSchema);
