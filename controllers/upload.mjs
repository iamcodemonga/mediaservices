import { encode } from "blurhash";
import sharp from "sharp";

// Function to generate Blurhash
const encodeImageToBlurhash = path =>
    new Promise((resolve, reject) => {
      sharp(path)
        .raw()
        .ensureAlpha()
        .resize(32, 32, { fit: "inside" })
        .toBuffer((err, buffer, { width, height }) => {
          if (err) return reject(err);
          resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
        });
});

export const uploadPhoto = async(req, res) => {
    try {
      const photoFile = req.file;
      console.log(photoFile);
  
      const blurhashValue = await encodeImageToBlurhash(`${photoFile.path}`);
  
      const result = { url: `${process.env.ROOT}/bucket/${photoFile.filename}`, screenshot: `${process.env.ROOT}/bucket/${photoFile.filename}`, blurhash: blurhashValue };
      res.json({ success: true, screenshot: "uploaded to storage", result });
      } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: 'Internal Server Error', result: null });
      }
  
}

export const uploadVideo = async(req, res) => {
    try {
        const videoFile = req.files['video'][0];
        const thumbnailFile = req.files['thumbnail'][0];
        console.log(thumbnailFile);

        // Generate Blurhash
        const blurhashValue = await encodeImageToBlurhash(`${thumbnailFile.path}`);

        const result = { url: `${process.env.ROOT}/bucket/${videoFile.filename}`, screenshot: `${process.env.ROOT}/bucket/${thumbnailFile.filename}`, blurhash: blurhashValue };
        // Add to mysql database
        res.json({ success: true, screenshot: "uploaded to storage", result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error', result: null });
    }
}