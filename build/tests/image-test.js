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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const resize_image_1 = require("../controllers/resize-image");
const request = (0, supertest_1.default)(index_1.default);
describe('Image Endpoint Testing', () => {
    it('Send Request Without image name', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?w=300&h=250');
        expect(response.text).toEqual('Image name is required.');
        expect(response.statusCode).toBe(400);
    }));
    it('Send Request Without image width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?filename=encenadaport.png&&h=250');
        expect(response.text).toEqual('Image width is required.');
        expect(response.statusCode).toBe(400);
    }));
    it('Send Request Without image height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?filename=encenadaport.png&&w=250');
        expect(response.text).toEqual('Image height is required.');
        expect(response.statusCode).toBe(400);
    }));
    it('Send valid request', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?filename=encenadaport.png&&w=250&h=250');
        expect(response.header['content-type']).toBe('image/png');
        expect(response.statusCode).toBe(200);
    }));
    it('Try to access page that not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(404);
    }));
});
describe('Image Processing Function Testing', () => {
    let FULL_DIR;
    let OUT_DIR;
    beforeAll(() => {
        FULL_DIR = './assets/full/';
        OUT_DIR = './assets/thumb/';
    });
    it('Resize Image without extension and 150x150 size', () => __awaiter(void 0, void 0, void 0, function* () {
        const img_name = (0, resize_image_1.get_image_full_name)('icelandwaterfall');
        const img_path = FULL_DIR + img_name;
        const out_path = OUT_DIR + (0, resize_image_1.get_thumb_expression)(img_name, 150, 150);
        const img_buffer = yield (0, resize_image_1.read_image)(img_path);
        expect(img_buffer).not.toBeNull;
        const image = yield (0, resize_image_1.resize_image)(img_buffer, 150, 150, out_path);
        expect(image).not.toBeNull;
    }));
    it('Resize Image with png extension and 300x350 size', () => __awaiter(void 0, void 0, void 0, function* () {
        const img_name = 'encenadaport.png';
        const img_path = FULL_DIR + img_name;
        const out_path = OUT_DIR + (0, resize_image_1.get_thumb_expression)(img_name, 150, 150);
        const img_buffer = yield (0, resize_image_1.read_image)(img_path);
        expect(img_buffer).not.toBeNull;
        const image = yield (0, resize_image_1.resize_image)(img_buffer, 150, 150, out_path);
        expect(image).not.toBeNull;
    }));
    it('Read Cached image', () => __awaiter(void 0, void 0, void 0, function* () {
        const img_name = (0, resize_image_1.get_image_full_name)('icelandwaterfall_thumb_150x150');
        const img_path = OUT_DIR + img_name;
        const img_buffer = yield (0, resize_image_1.read_image)(img_path);
        expect(img_buffer).not.toBeNull;
    }));
});
