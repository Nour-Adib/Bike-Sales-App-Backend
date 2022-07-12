const { bucket } = require('./firebaseAdmin.service');
const { v4: uuidv4 } = require('uuid');

async function uploadImageFile(image) {
    const imageName = uuidv4();

    const file = bucket.file(`Avatars/${imageName}.png`);
    await file.save(image);
    return file.publicUrl();
}

async function updateImageFile(image, previousImageURL) {

    //* %27 is the "/" 
    const previousImageID = previousImageURL.split('%2F')[1];

    const file = bucket.file(`Avatars/${previousImageID}`);
    await file.delete();
    return uploadImageFile(image);
}

module.exports = { uploadImageFile, updateImageFile };