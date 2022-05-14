import path from 'path';
import sharp from 'sharp';
import { promises as fs } from 'fs';

function check_parameters(
    name: string,
    width: number,
    height: number
): boolean {
    if (name === undefined) throw new Error('Image name is required.');
    else if (isNaN(width) || !width)
        throw new Error('Image width is required.');
    else if (isNaN(height) || !height)
        throw new Error('Image height is required.');

    return true;
}

const does_img_exists = async (path: string): Promise<boolean> => {
    try {
        await fs.access(path);
        return true;
    } catch (error) {
        return false;
    }
};

function get_thumb_expression(
    image: string,
    width: number,
    height: number
): string {
    const ext: string = path.extname(image) || '.jpg';
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

const get_image_type = (image_name: string): string => {
    const type = image_name.split('.')[1];
    return type == 'jpg' ? 'jpeg' : type;
};

const read_image = (image: string): Promise<Buffer> => fs.readFile(image);

function resize_image(
    image: Buffer,
    width: number,
    height: number,
    out_path: string
): Promise<Buffer> {
    return sharp(image)
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

export {
    check_parameters,
    does_img_exists,
    get_thumb_expression,
    get_image_full_name,
    get_image_type,
    read_image,
    resize_image,
};
