const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const singleUploader = (
  sub_folder_name,
  allowed_file_types,
  max_file_size,
  error_msg
) => {
  const uploadedFolder = `${__dirname}/../../public/${sub_folder_name}`;

  // define a storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadedFolder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") + Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // upload
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });

  return upload;
};

module.exports = singleUploader;
