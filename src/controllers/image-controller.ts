import { Request, Response } from 'express';
import * as resizer from './resize-image';

const ASSETS_Full_PATH = './assets/full/';
const ASSETS_THUMB_PATH = './assets/thumb/';

const display_image = async (req: Request, res: Response): Promise<void> => {
    let image: string = req.query.filename as string;
    const width = +(req.query.w as unknown as number);
    const height = +(req.query.h as unknown as number);

    try {
        resizer.check_parameters(image, width, height);
        
        image = resizer.get_image_full_name(req.query.filename as string);
        const image_type: string = resizer.get_image_type(image);

        const thumb_image = resizer.get_thumb_expression(image, width, height);
        const thumb_path = ASSETS_THUMB_PATH + thumb_image;
        const thumb_exists: boolean = await resizer.does_img_exists(thumb_path);

        if (thumb_exists) {
            const img = await resizer.read_image(thumb_path);
            res.writeHead(200, { 'Content-Type': `image/${image_type}` }).end(
                img
            );
        } else {
            const original_path = ASSETS_Full_PATH + image;
            const original_exists: boolean = await resizer.does_img_exists(
                original_path
            );
            if (!original_exists) {
                throw new Error('Oops! The Specified image does not exist');
            }
            const img = await resizer.read_image(original_path);
            const new_image = await resizer.resize_image(
                img,
                width,
                height,
                thumb_path
            );
            res.writeHead(200, { 'Content-Type': `image/${image_type}` }).end(
                new_image
            );
        }
    } catch (error) {
        res.status(400).end((error as Error).message);
    }
};

export { display_image };
