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
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const db_1 = require("../models/db");
// import { compare, hash } from "bcrypt-ts";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Jwt_scerate = process.env.JWT_SECRET;
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User1 = zod_1.default.object({
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(4),
            username: zod_1.default.string().min(3),
            image: zod_1.default.string().optional()
        });
        const SafeParse = User1.safeParse(req.body);
        if (!SafeParse.success) {
            res.status(400).json({
                message: " Something is wrong",
                error: SafeParse.error
            });
        }
        const { email, password, username, image } = req.body;
        // const hashedPassword = await hash(password,5);
        const user = yield db_1.User.create({
            email,
            password,
            username,
            image
        });
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, Jwt_scerate || "");
        {
            user ?
                res.status(201).json({
                    token,
                    user,
                    message: "User Created"
                })
                :
                    res.status(400).json({
                        message: "User Not Created"
                    });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
exports.default = router;
