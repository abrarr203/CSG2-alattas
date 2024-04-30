const path = require('path')
const fs = require('fs')

let converter = (photo) => {
    let convertedPhoto = Buffer.from(photo).toString('base64');
    return convertedPhoto;
}

let imageReader = (file) => {
    const publicFolderPath = path.resolve(__dirname, '..', 'public'); 
    const imageFolderPath = path.join(publicFolderPath, 'img');
    const newPhotoPath = path.join(imageFolderPath, file.toString());

    const newPhoto = fs.readFileSync(newPhotoPath);
    file = converter(newPhoto);
    return file;
}

let audioReader = (file) => {
    const publicFolderPath = path.resolve(__dirname, '..', 'public'); 
    const imageFolderPath = path.join(publicFolderPath, 'audio');
    const newPhotoPath = path.join(imageFolderPath, file.toString());

    const newPhoto = fs.readFileSync(newPhotoPath);
    file = converter(newPhoto);
    return file;
}

module.exports = {
    imageReader,
    audioReader
};