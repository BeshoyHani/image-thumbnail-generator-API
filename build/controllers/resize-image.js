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
exports.resize_image = exports.read_image = exports.get_image_type = exports.get_image_full_name = exports.get_thumb_expression = exports.does_img_exists = exports.check_parameters = void 0;
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
function check_parameters(name, width, height) {
    if (name === undefined)
        throw new Error('Image name is required.');
    else if (isNaN(width) || !width)
        throw new Error('Image width is required.');
    else if (isNaN(height) || !height)
        throw new Error('Image height is required.');
    return true;
}
exports.check_parameters = check_parameters;
const does_img_exists = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(path);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.does_img_exists = does_img_exists;
function get_thumb_expression(image, width, height) {
    const ext = path_1.default.extname(image) || '.jpg';
    const image_name = image.split('.')[0];
    const thumb_expression = image_name + `_thumb_${width}x${height}${ext}`;
    return thumb_expression;
}
exports.get_thumb_expression = get_thumb_expression;
function get_image_full_name(image) {
    const ext = path_1.default.extname(image);
    if (!ext)
        image += '.jpg';
    return image;
}
exports.get_image_full_name = get_image_full_name;
const get_image_type = (image_name) => {
    const type = image_name.split('.')[1];
    return type == 'jpg' ? 'jpeg' : type;
};
exports.get_image_type = get_image_type;
const read_image = (image) => fs_1.promises.readFile(image);
exports.read_image = read_image;
function resize_image(image, width, height, out_path) {
    return (0, sharp_1.default)(image)
        .resize(width, height)
        .toFile(out_path, error => {
        if (error) {
            throw new Error(error.message);
        }
    })
        .toBuffer()
        .then(new_image => {
        return new_image;
    });
}
exports.resize_image = resize_image;
