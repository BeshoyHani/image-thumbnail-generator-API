import { Request, Response } from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';

const ASSETS_Full_PATH = './assets/full/';
const ASSETS_THUMB_PATH = './assets/thumb/';

const display_image = async (req: Request, res: Response) => {
    let image: string = (req.query.filename) as string;
    let width = +((req.query.w as unknown) as number);
    let height = +((req.query.h as unknown) as number);

    try {
        let thumb_image = get_thumb_expression(image, width, height);
        let path = ASSETS_THUMB_PATH + thumb_image;
        let thumb_exists: Boolean = await doesFileExist(path);

        if (thumb_exists) {
            const img = await fs.readFile(ASSETS_THUMB_PATH + thumb_image);
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(img);

        } else {
            path = ASSETS_Full_PATH + image + '.jpg';
            let original_exists: Boolean = await doesFileExist(path);

            if (!original_exists) {
                res.send('Oops! The Specified image does not exist');

            } else {
                const img = await fs.readFile(ASSETS_Full_PATH + image + '.jpg');
                sharp(img)
                    .resize(width, height)
                    .toFile(ASSETS_THUMB_PATH + thumb_image, (error, info) => { console.log(error) })
                    .toBuffer()
                    .then(new_image => {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.end(new_image);
                    });
            }
        }
    } catch (err) {
        res.send(err);
        console.log(err )
    }
}

async function doesFileExist(path: string): Promise<Boolean> {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        return false;
    }
}

function get_thumb_expression(image_name: string, width: number, height: number): string{
    let thumb_expression: string = image_name + `_thumb_${width}x${height}.jpg`;
    return thumb_expression;
}

export {
    display_image
}