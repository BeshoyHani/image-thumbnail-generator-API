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
Object.defineProperty(exports, "__esModule", { value: true });
exports.display_image = void 0;
const fs_1 = require("fs");
const display_image = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let image = (req.query.filename);
    console.log(image);
    try {
        const img = yield fs_1.promises.readFile('./assets/full/' + image + '.jpg');
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img); // Send the file data to the browser.
        //res.send(`<img src="http://localhost:3000/api/image?filename=${image+'.jpg'}">`);
    }
    catch (err) {
        res.send(err);
    }
});
exports.display_image = display_image;
