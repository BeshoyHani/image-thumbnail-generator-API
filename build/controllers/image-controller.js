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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const ASSETS_Full_PATH = './assets/full/';
const ASSETS_THUMB_PATH = './assets/thumb/';
const display_image = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = get_image_full_name(req.query.filename);
    const image_type = get_image_type(image);
    const width = +req.query.w;
    const height = +req.query.h;
    try {
        const thumb_image = get_thumb_expression(image, width, height);
        let path = ASSETS_THUMB_PATH + thumb_image;
        const thumb_exists = yield doesFileExist(path);
        if (thumb_exists) {
            const img = yield fs_1.promises.readFile(ASSETS_THUMB_PATH + thumb_image);
            res.writeHead(200, { 'Content-Type': `image/${image_type}` }).end(img);
        }
        else {
            path = ASSETS_Full_PATH + image;
            const original_exists = yield doesFileExist(path);
            if (!original_exists) {
                res.end('Oops! The Specified image does not exist');
            }
            else {
                const img = yield fs_1.promises.readFile(ASSETS_Full_PATH + image);
                (0, sharp_1.default)(img)
                    .resize(width, height)
                    .toFile(ASSETS_THUMB_PATH + thumb_image, error => {
                    if (error) {
                        res.sendStatus(500);
                        return;
                    }
                })
                    .toBuffer()
                    .then(new_image => {
                    res.writeHead(200, {
                        'Content-Type': `image/${image_type}`,
                    }).end(new_image);
                });
            }
        }
    }
    catch (err) {
        res.status(400).end('Oops! Something Went Wrong!');
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
function get_thumb_expression(image, width, height) {
    const ext = path_1.default.extname(image);
    const image_name = image.split('.')[0];
    const thumb_expression = image_name + `_thumb_${width}x${height}${ext}`;
    return thumb_expression;
}
function get_image_full_name(image) {
    const ext = path_1.default.extname(image);
    if (!ext)
        image += '.jpg';
    return image;
}
const get_image_type = (image_name) => {
    const type = image_name.split('.')[1];
    return type == 'jpg' ? 'jpeg' : type;
};
