import { Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import { promises as fs } from 'fs';

const ASSETS_Full_PATH = './assets/full/';
const ASSETS_THUMB_PATH = './assets/thumb/';

const display_image = async (req: Request, res: Response) => {
    const image: string = get_image_full_name(req.query.filename as string);
    const image_type: string = get_image_type(image);
    const width = +(req.query.w as unknown as number);
    const height = +(req.query.h as unknown as number);

    try {
        const thumb_image = get_thumb_expression(image, width, height);
        let path = ASSETS_THUMB_PATH + thumb_image;
        const thumb_exists: boolean = await doesFileExist(path);

        if (thumb_exists) {
            const img = await fs.readFile(ASSETS_THUMB_PATH + thumb_image);
            res.writeHead(200, { 'Content-Type': `image/${image_type}` }).end(
                img
            );
        } else {
            path = ASSETS_Full_PATH + image;
            const original_exists: boolean = await doesFileExist(path);

            if (!original_exists) {
                res.end('Oops! The Specified image does not exist');
            } else {
                const img = await fs.readFile(ASSETS_Full_PATH + image);
                sharp(img)
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
    } catch (err) {
        res.status(400).end('Oops! Something Went Wrong!');
    }
};

async function doesFileExist(path: string): Promise<boolean> {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        return false;
    }
}

function get_thumb_expression(
    image: string,
    width: number,
    height: number
): string {
    const ext: string = path.extname(image);
    const image_name = image.split('.')[0];

    const thumb_expression: string =
        image_name + `_thumb_${width}x${height}${ext}`;
    return thumb_expression;
}

function get_image_full_name(image: string): string {
    const ext: string = path.extname(image);
    if (!ext) image += '.jpg';
    return image;
}

const get_image_type = (image_name: string) => {
    const type = image_name.split('.')[1];
    return type == 'jpg' ? 'jpeg' : type;
};

export { display_image };
