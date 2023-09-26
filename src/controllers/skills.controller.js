import Usingnow from "../models/usingnow.js";
import Learning from "../models/learning.js";
import Skills from "../models/skills.js";
import { storage } from "../configs/firebase.js";

export const createSkills = async (req, res) => {
  try {
    const { collection } = req.query;
    const author = "Jovan Panji Pratama";
    const bucket = storage.bucket();
    const newSkill = new Skills({
      titleSkill: req.body.titleSkill,
    });

    if (collection === "using_now" || collection === "learning") {
      if (req.file) {
        const dest = "Svgs";
        const fileName = `${Date.now()}_${req.file.originalname}`;
        const file = bucket.file(`${dest}/${fileName}`);
        const fileStream = file.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        fileStream.on("error", (error) => {
          console.error("Error uploading image:", error);
          return res.status(400).json({
            success: false,
            message: "Error ketika menupload gambar",
            error: error.message,
          });
        });

        fileStream.on("finish", async () => {
          try {
            const [url] = await file.getSignedUrl({
              action: "read",
              expires: "03-01-2500",
            });

            newSkill.svg = url;
            newSkill.fileNameSvg = fileName;
            let dataCollection;

            if (collection === "using_now") {
              dataCollection = Usingnow;
            } else if (collection === "learning") {
              dataCollection = Learning;
            }

            let existingData = await dataCollection.findOne({ author });

            if (!existingData) {
              existingData = new dataCollection({
                author,
                [collection]: [newSkill],
              });
            } else {
              existingData[collection].push(newSkill);
            }

            await newSkill.save();
            await existingData.save();

            return res.status(201).json({
              success: true,
              message: "Skill berhasil ditambahkan",
              data: existingData,
            });
          } catch (error) {
            console.error("Error saat mengambil URL gambar:", error);
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              error: error.message,
            });
          }
        });

        fileStream.end(req.file.buffer);
      } else {
        return res.status(400).json({
          success: false,
          message: "File SVG tidak ditemukan",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Koleksi yang diberikan tidak valid",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skills.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill tidak ditemukan",
      });
    }

    await Usingnow.updateMany({}, { $pull: { using_now: id } });
    await Learning.updateMany({}, { $pull: { learning: id } });

    if (skill.svg) {
      const fileName = skill.fileNameSvg;
      const file = storage.bucket().file(`Svgs/${fileName}`);

      await file.delete();
    }

    await skill.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Skill berhasil dihapus",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const moveSkillToUsingNow = async (req, res) => {
  const { idskill } = req.params;
  const author = "Jovan Panji Pratama"

  try {
    // Temukan satu dokumen Learning yang mengandung idskill
    const learningDoc = await Learning.findOne({ author });

    if (!learningDoc) {
      return res
        .status(404)
        .json({ message: "Skill tidak ditemukan dalam Learning" });
    }

    // Temukan atau buat dokumen UsingNow yang sesuai dengan author
    let usingNowDoc = await Usingnow.findOne({ author });

    // Jika dokumen UsingNow belum ada, buat dokumen baru
    if (!usingNowDoc) {
      usingNowDoc = new Usingnow({
        author: author,
        using_now: [],
      });
    }

    // Pindahkan ID skill dari learning ke using_now
    usingNowDoc.using_now.push(idskill);
    await usingNowDoc.save();

    // Hapus ID skill dari learning
    learningDoc.learning = learningDoc.learning.filter(
      (id) => id.toString() !== idskill
    );
    await learningDoc.save();

    return res
      .status(200)
      .json({ message: "Skill berhasil dipindahkan ke UsingNow" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const getLearning = async (req, res) => {
  const author = "Jovan Panji Pratama";
  try {
    const learningDoc = await Learning.findOne({ author }).populate(
      "learning",
      "_id titleSkill svg fileNameSvg createdAt updatedAt"
    );
    return res.status(200).json({
      success: true,
      data: learningDoc,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export const getUsingNow = async (req, res) => {
  const author = "Jovan Panji Pratama";
  try {
    const learningDoc = await Usingnow.findOne({ author }).populate(
      "using_now",
      "_id titleSkill svg fileNameSvg createdAt updatedAt"
    );
    return res.status(200).json({
      success: true,
      data: learningDoc,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
