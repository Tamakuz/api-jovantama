import { storage } from "../configs/firebase.js";

const firebaseUpload = (destination, mimetype, buffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bucket = storage.bucket();
      const file = bucket.file(destination);
      const fileStream = file.createWriteStream({
        metadata: {
          contentType: mimetype,
        },
      });

      fileStream.on("error", (error) => {
        reject(error);
      });

      fileStream.on("finish", async () => {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });
        resolve(url);
      });

      fileStream.end(buffer);
    } catch (error) {
      reject(error);
    }
  });
};

export default firebaseUpload;
