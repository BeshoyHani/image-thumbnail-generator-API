"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_router_1 = __importDefault(require("./image-router"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Home Page');
});
router.use('/api', image_router_1.default);
exports.default = router;
