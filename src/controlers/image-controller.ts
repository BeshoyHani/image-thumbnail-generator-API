import { Request, Response } from 'express';
import { promises as fs } from 'fs';

const display_image = async (req: Request, res: Response) => {
    let image: string = (req.query.filename) as string;
    console.log(image);
    try {
        const img = await fs.readFile('./assets/full/'+image+'.jpg');
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(img); // Send the file data to the browser.
        //res.send(`<img src="http://localhost:3000/api/image?filename=${image+'.jpg'}">`);
    } catch (err) {
        res.send(err);
    }
}

export {
    display_image
}