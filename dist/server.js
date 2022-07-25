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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./db/connect"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// DEPLOY
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const corsOptions = {
    optionsSuccessStatus: 200,
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["*", "Authorization"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
//DEPLOY && using express static to make them public to access
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/build")));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/videos", videoRoutes_1.default);
app.use("/api/comments", commentRoutes_1.default);
// get routes for deployment
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../client/build", "index.html"));
});
//middleware routes
app.use(not_found_1.default);
app.use(error_handler_1.default);
const PORT = process.env.PORT;
const DB = process.env.DB;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!DB)
            return;
        yield (0, connect_1.default)(DB);
        app.listen(PORT, () => {
            console.log("Server is running on " + PORT);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
