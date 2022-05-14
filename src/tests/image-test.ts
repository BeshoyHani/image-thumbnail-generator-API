import supertest from 'supertest';
import app from '../index';
import {
    read_image,
    resize_image,
    get_image_full_name,
    get_thumb_expression,
} from '../controllers/resize-image';

const request = supertest(app);

describe('Image Endpoint Testing', () => {
    it('Send Request Without image name', async () => {
        const response = await request.get('/api/image?w=300&h=250');
        expect(response.text).toEqual('Image name is required.');
        expect(response.statusCode).toBe(400);
    });

    it('Send Request Without image width', async () => {
        const response = await request.get(
            '/api/image?filename=encenadaport.png&&h=250'
        );
        expect(response.text).toEqual('Image width is required.');
        expect(response.statusCode).toBe(400);
    });

    it('Send Request Without image height', async () => {
        const response = await request.get(
            '/api/image?filename=encenadaport.png&&w=250'
        );
        expect(response.text).toEqual('Image height is required.');
        expect(response.statusCode).toBe(400);
    });

    it('Send valid request', async () => {
        const response = await request.get(
            '/api/image?filename=encenadaport.png&&w=250&h=250'
        );
        expect(response.header['content-type']).toBe('image/png');
        expect(response.statusCode).toBe(200);
    });

    it('Try to access page that not found', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(404);
    });
});

describe('Image Processing Function Testing', () => {
    let FULL_DIR: string;
    let OUT_DIR: string;

    beforeAll(() => {
        FULL_DIR = './assets/full/';
        OUT_DIR = './assets/thumb/';
    });

    it('Resize Image without extension and 150x150 size', async () => {
        const img_name = get_image_full_name('icelandwaterfall');
        const img_path = FULL_DIR + img_name;
        const out_path = OUT_DIR + get_thumb_expression(img_name, 150, 150);
        const img_buffer = await read_image(img_path);
        expect(img_buffer).not.toBeNull;

        const image = await resize_image(img_buffer, 150, 150, out_path);
        expect(image).not.toBeNull;
    });

    it('Resize Image with png extension and 300x350 size', async () => {
        const img_name = 'encenadaport.png';
        const img_path = FULL_DIR + img_name;
        const out_path = OUT_DIR + get_thumb_expression(img_name, 150, 150);
        const img_buffer = await read_image(img_path);
        expect(img_buffer).not.toBeNull;

        const image = await resize_image(img_buffer, 150, 150, out_path);
        expect(image).not.toBeNull;
    });

    it('Read Cached image', async () => {
        const img_name = get_image_full_name('icelandwaterfall_thumb_150x150');
        const img_path = OUT_DIR + img_name;
        const img_buffer = await read_image(img_path);
        expect(img_buffer).not.toBeNull;
    });
});
