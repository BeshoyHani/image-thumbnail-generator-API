import express from 'express';
import * as image_controller from '../controlers/image-controller';
const image = express.Router();

image.get("/image", image_controller.display_image);

export default image;