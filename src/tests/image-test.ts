import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe("Image Endpoint Testing", () => {

    it("Resize Image with 150x150", async () => {
            const response = await request.get("/api/image?filename=encenadaport&w=300&h=250");
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toBe("image/jpeg");
    });

    it("Send Request With Missing Parameter", async () => {
        const response = await request.get("/api/image?filename=encenadaport&w=300");
        expect(response.status).toBe(400);
});
});