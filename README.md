# Image Processing API
### Image Processing API is an API for generating thumbnails for images with any size you want.

## Tools
- **TypeScript**
- **Node.js**
- **Express**
- **Eslinter & Prettier** for code formatting.
- **Jasmine & Super Test** for endpoint and unit testing.
- **Sharp Module** for resizing the image. 

## Scripts to Run
1) **npm run build** : Build the TypeScript code
2) **npm run format** : Formate the TypeScript code with Eslint and Prettier.
3) **npm run test** : Test with jasmine and Super Test.
4) **npm run start** : Run and start the node.js server.

## How to Use
- Put your image in the assets/full directory.
- Send a GET request to the endpoint "/api/image" with query parameters:
    - **filename** : name of the image. If you don't specify the image format, it will be considered as a jpg. 
    - **w** : new width you want to resize your image to.
    - **h** : new height you want to resize your image to.
- the resized image will be generated in the directory assets/thumb.

## Examples of GET request
 1) Without Specify Image Format: <br>
http://localhost:3000/api/image?filename=fjord&w=300&h=350

2) With Specify Image Format: <br>
http://localhost:3000/api/image?filename=fjord.png&w=300&h=350

## Features
1) Support a varity of image formats such as jpg, png, gif, etc.
2) If the thumbnail image already exists, it doesn't resize it again.