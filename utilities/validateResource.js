const mongoose = require("mongoose");
const AppError = require("./appError");

module.exports = async (req, next, Model) => {
  const docId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(docId)) {
    return next(new AppError("Invalid comment ID", 400));
  }

  const doc = await Model.findById(docId);

  if (!doc) {
    return next(
      new AppError(
        `No ${Model.modelName.toLowerCase()} found with that id`,
        404
      )
    );
  }

  if (req.user.id !== doc.user.id)
    return next(new AppError("Unauthorized action", 401));

  return doc;
};
