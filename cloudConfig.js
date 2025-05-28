const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name : process.env.cloudeName,
    api_key:process.env.cloudeApiKey,
    api_secret: process.env.cloudeApiSecreat,
})
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wander-lust',
    allowedFormats: ['png','jpg','jpeg'], // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});
module.exports = {
    cloudinary,
    storage
}