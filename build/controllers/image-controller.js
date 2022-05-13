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
exports.display_image = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const ASSETS_Full_PATH = './assets/full/';
const ASSETS_THUMB_PATH = './assets/thumb/';
const display_image = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.filename;
    const width = +req.query.w;
    const height = +req.query.h;
    try {
        const thumb_image = get_thumb_expression(image, width, height);
        let path = ASSETS_THUMB_PATH + thumb_image;
        const thumb_exists = yield doesFileExist(path);
        if (thumb_exists) {
            const img = yield fs_1.promises.readFile(ASSETS_THUMB_PATH + thumb_image);
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(img);
        }
        else {
            path = ASSETS_Full_PATH + image + '.jpg';
            const original_exists = yield doesFileExist(path);
            if (!original_exists) {
                res.end('Oops! The Specified image does not exist');
            }
            else {
                const img = yield fs_1.promises.readFile(ASSETS_Full_PATH + image + '.jpg');
                (0, sharp_1.default)(img)
                    .resize(width, height)
                    .toFile(ASSETS_THUMB_PATH + thumb_image, (error, info) => {
                    console.log(error);
                })
                    .toBuffer()
                    .then(new_image => {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.end(new_image);
                });
            }
        }
    }
    catch (err) {
        res.statusCode = 400;
        res.end('Oops! Something Went Wrong!');
        console.log(err);
    }
});
exports.display_image = display_image;
function doesFileExist(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.access(path);
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
function get_thumb_expression(image_name, width, height) {
    const thumb_expression = image_name + `_thumb_${width}x${height}.jpg`;
    return thumb_expression;
}
