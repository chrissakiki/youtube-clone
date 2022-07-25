"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please provide your username"],
        minlength: 6,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        validate: {
            validator: validator_1.default.isEmail,
            message: "Please provide a valid email",
        },
    },
    password: {
        type: String,
        select: false,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/db9pqndbj/image/upload/v1658442486/profilepic_x6azoj.jpg",
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedChannels: {
        type: [String],
    },
    saved: {
        type: [String],
    },
    google: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return;
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
});
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare(password, this.password);
        return isMatch;
    });
};
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
exports.default = mongoose_1.default.model("User", UserSchema);
