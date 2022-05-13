import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Image Endpoint Testing', () => {
    it('Resize Image without specify extention with 150x150', async () => {
        const response = await request.get(
            '/api/image?filename=encenadaport&w=300&h=250'
        );
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('image/jpeg');
    });

    it('Resize Image with png extension', async () => {
        const response = await request.get(
            '/api/image?filename=encenadaport.png&w=300&h=250'
        );
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('image/png');
    });

    it('Resize Image with gif extension', async () => {
        const response = await request.get(
            '/api/image?filename=giphy.gif&w=300&h=250'
        );
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toBe('image/gif');
    });

    it('Send Request With Missing Parameter', async () => {
        const response = await request.get(
            '/api/image?filename=encenadaport&w=300'
        );
        expect(response.status).toBe(400);
    });

    it('Try to access page that not found', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(404);
    });
});
