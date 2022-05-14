"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.display_image = void 0;
const resizer = __importStar(require("./resize-image"));
const ASSETS_Full_PATH = './assets/full/';
const ASSETS_THUMB_PATH = './assets/thumb/';
const display_image = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let image = req.query.filename;
    const width = +req.query.w;
    const height = +req.query.h;
    try {
        resizer.check_parameters(image, width, height);
        image = resizer.get_image_full_name(req.query.filename);
        const image_type = resizer.get_image_type(image);
        const thumb_image = resizer.get_thumb_expression(image, width, height);
        const thumb_path = ASSETS_THUMB_PATH + thumb_image;
        const thumb_exists = yield resizer.does_img_exists(thumb_path);
        if (thumb_exists) {
            const img = yield resizer.read_image(thumb_path);
            res.writeHead(200, { 'Content-Type': `image/${image_type}` }).end(img);
        }
        else {
            const original_path = ASSETS_Full_PATH + image;
            const original_exists = yield resizer.does_img_exists(original_path);
            if (!original_exists) {
                throw new Error('Oops! The Specified image does not exist');
            }
            const img = yield resizer.read_image(original_path);
            const new_image = yield resizer.resize_image(img, width, height, thumb_path);
            res.writeHead(200, { 'Content-Type': `image/${image_type}` }).end(new_image);
        }
    }
    catch (error) {
        res.status(400).end(error.message);
    }
});
exports.display_image = display_image;
