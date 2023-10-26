import Tags from "../models/tags.js";
import { errorResponse, successResponse, validationErrorResponse } from "../utils/response.js";

export const createTags = async (req, res) => {
  try {
    const { tag } = req.body;

    if (!tag) return validationErrorResponse(res, true, "Form Tag Harus Diisi");

    const tags = new Tags({
      tag
    })
    
    await tags.save();
    return successResponse(res, {message: "Succes"})
  } catch (error) {
    console.log(error);
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tags.find();

    // Jika tidak ada data tag, Anda dapat memberikan respons sesuai kebutuhan
    if (!tags || tags.length === 0) {
      return errorResponse(res, "Tidak ada data tag yang ditemukan", 404);
    }

    const tagValues = tags.map((tag) => tag.tag);

    // Jika ada data tag, Anda dapat mengirimkannya sebagai respons
    successResponse(res, tagValues);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Terjadi kesalahan saat mengambil data tag");
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { tagParam } = req.params;

    // Mencari tag berdasarkan ID
    const tag = await Tags.findOne({tag: tagParam});

    // Jika tag tidak ditemukan, kirimkan respons dengan status 404
    if (!tag) {
      return errorResponse(res, "Tag tidak ditemukan", 404);
    }

    // Hapus tag
    await tag.deleteOne();

    // Kirimkan respons bahwa tag telah dihapus
    successResponse(res, { message: "Tag berhasil dihapus" });
  } catch (error) {
    console.error(error);
    errorResponse(res, "Terjadi kesalahan saat menghapus tag", 500);
  }
};