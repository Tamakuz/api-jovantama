import Work from "../models/work.js";
import Tag from "../models/tags.js";
import {
  errorResponse,
  serverErrorResponse,
  successResponse,
  validationErrorResponse,
} from "../utils/response.js";
import firebaseUpload from "../utils/firebaseUpload.js";
import firebaseDelete from "../utils/firebaseDelete.js";

export const createWork = async (req, res) => {
  let isDest;
  try {
    const { titleWork, year, tags, desc } = req.body;
    const { file } = req;

    const destination = `Works/${Date.now()}_${file.originalname}`;
    const fileUrl = await firebaseUpload(
      destination,
      file.mimetype,
      file.buffer
    );

    isDest = destination;

    // Memeriksa apakah data yang diperlukan ada dalam request
    if (!titleWork || !year || !tags || !desc) {
      return validationErrorResponse(res, true, "Semua field harus diisi");
    }

    const array = JSON.parse(tags);
    // Mengambil semua nilai "tag" yang dikirim dalam request
    const tagValues = array.map((tag) => tag.trim());

    // Mencari tag yang memiliki nilai "tag" yang sesuai dalam model "Tag"
    const existingTags = await Tag.find({ tag: { $in: tagValues } });

    if (existingTags.length !== tagValues.length) {
      // Jika tidak semua tag ditemukan, kirimkan respons dengan pesan kesalahan
      return validationErrorResponse(res, true, "Beberapa tag tidak valid");
    }

    // Mengupload foto dan mereturn URL
    if (!file) {
      return errorResponse(res, "Tidak ada gambar untuk diupload");
    }

    // Membuat instance Work baru dengan referensi ke Tag
    const work = new Work({
      titleWork,
      destImage: destination,
      imgUrl: fileUrl,
      year,
      tags: existingTags.map((tag) => tag._id),
      desc,
    });

    // Menyimpan data Work ke database
    await work.save();

    // Mengirim respons bahwa data Work berhasil dibuat
    successResponse(res, work);
  } catch (error) {
    console.error(error);
    firebaseDelete(isDest);
    serverErrorResponse(res, "Terjadi kesalahan saat membuat data Work");
  }
};

export const deleteWork = async (req, res) => {
  try {
    const { workId } = req.params;
    
    // Find the work by its ID
    const work = await Work.findById(workId);

    // If the work doesn't exist, return an error response
    if (!work) {
      return errorResponse(res, "Work not found");
    }

    // Delete the work's image from Firebase
    const { destImage } = work;
    await firebaseDelete(destImage);

    // Remove the work from the database
    await work.deleteOne();

    // Return a success response
    successResponse(res, "Work deleted successfully");
  } catch (error) {
    console.error(error);
    serverErrorResponse(res, "An error occurred while deleting the work");
  }
};

export const getAllWorks = async (req, res) => {
  try {
    // Retrieve all works from the database
    const works = await Work.find().populate("tags");

    // Extract tag values as an array of strings
    const modifiedWorks = works.map((work) => ({
      ...work.toObject(),
      tags: work.tags.map((tag) => tag.tag),
    }));

    // Return the list of works as a success response
    successResponse(res, modifiedWorks);
  } catch (error) {
    console.error(error);
    serverErrorResponse(res, "An error occurred while fetching works");
  }
};

export const getWorkById = async (req, res) => {
  try {
    const { workId } = req.params;

    // Find the work by its ID
    const work = await Work.findById(workId).populate("tags");

    // If the work doesn't exist, return an error response
    if (!work) {
      return errorResponse(res, "Work not found");
    }

    const modifiedWork = {
      ...work.toObject(),
      tags: work.tags.map((tag) => tag.tag),
    };

    // Return the work details as a success response
    successResponse(res, modifiedWork);
  } catch (error) {
    console.error(error);
    serverErrorResponse(res, "An error occurred while fetching the work");
  }
};
