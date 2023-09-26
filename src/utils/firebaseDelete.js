import { storage } from "../configs/firebase.js";

const firebaseDelete = (destination) => {
  return new Promise(async (resolve, reject) => {
    try {
      const file = storage.bucket().file(destination);
      await file.delete();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export default firebaseDelete;
