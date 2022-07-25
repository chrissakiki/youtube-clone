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
exports.logout = exports.googleSignin = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new index_1.BadRequestError("please provide all values");
    }
    if (username.length < 6) {
        throw new index_1.BadRequestError("Username should be at least 6 characters");
    }
    if (password.length < 6) {
        throw new index_1.BadRequestError("Password should be at least 6 characters");
    }
    const userExist = yield User_1.default.findOne({ email });
    if (userExist) {
        throw new index_1.BadRequestError("Email has already been taken!");
    }
    const user = yield User_1.default.create({ username, email, password });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user: Object.assign(Object.assign({}, user._doc), { password: undefined }),
    });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new index_1.BadRequestError("Please provide all values");
    }
    const user = yield User_1.default.findOne({ username }).select("+password");
    if (!user) {
        throw new index_1.UnAuthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new index_1.UnAuthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    res
        .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 72,
    })
        .status(http_status_codes_1.StatusCodes.OK)
        .json({
        user: Object.assign(Object.assign({}, user._doc), { password: undefined }),
    });
});
exports.signin = signin;
const googleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, avatar } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user) {
        const token = user.createJWT();
        res
            .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
            .status(http_status_codes_1.StatusCodes.OK)
            .json(user);
    }
    else {
        const newUser = yield User_1.default.create({
            email,
            username,
            avatar,
            google: true,
        });
        const token = newUser.createJWT();
        res
            .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 72,
        })
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(newUser);
    }
});
exports.googleSignin = googleSignin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res
        .clearCookie("access_token", { path: "/" })
        .status(http_status_codes_1.StatusCodes.OK)
        .send("Removed");
    console.log("you were here");
});
exports.logout = logout;
