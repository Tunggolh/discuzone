const catchErrorAsync = require("../utilities/catchErrorAsync");
const QueryHandler = require("../utilities/queryHandler");
const AppError = require("../utilities/appError");
const validateResource = require("../utilities/validateResource");

exports.getAll = (Model, parentId, parentModelName, ParentModel) =>
  catchErrorAsync(async (req, res, next) => {
    let filter = {};
    if (req.params[parentId]) {
      const parentDoc = await ParentModel.findById(req.params[parentId]);
      if (!parentDoc) {
        return next(
          new AppError(`No ${parentModelName} found with that ID`, 404)
        );
      }
      filter = { [parentModelName]: req.params[parentId] };
    }

    const handler = new QueryHandler(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await handler.query;

    res.json({
      status: "success",
      results: docs.length,
      data: {
        [Model.modelName.toLowerCase()]: docs,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchErrorAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()} found with that ID`,
          404
        )
      );
    }

    res.json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchErrorAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    });
  });

exports.updateOne = (Model, validate) =>
  catchErrorAsync(async (req, res, next) => {
    let doc;

    if (!validate) {
      doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc)
        return next(
          new AppError(
            `No ${Model.modelName.toLowerCase()} found with that ID`,
            404
          )
        );
    } else {
      doc = await validateResource(req, next, Model);
      if (!doc) return;
      doc.set(req.body);
      await doc.save();
    }

    res.json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    });
  });

exports.deleteOne = (Model, validate) =>
  catchErrorAsync(async (req, res, next) => {
    let doc;

    if (!validate) {
      doc = await Model.findByIdAndDelete(req.params.id, req.body);

      if (!doc)
        return next(
          new AppError(
            `No ${Model.modelName.toLowerCase()} found with that ID`,
            404
          )
        );
    } else {
      doc = await validateResource(req, next, Model);
      if (!doc) return;

      await doc.deleteOne();
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.likeOne = (Model) =>
  catchErrorAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()} found with that ID`,
          404
        )
      );
    }

    if (doc.likes.includes(req.user.id)) {
      doc.likes.pull(req.user.id);
    } else {
      doc.likes.push(req.user.id);
    }

    doc.save();

    res.json({
      status: "success",
      data: {
        [Model.modelName.toLowerCase()]: doc,
      },
    });
  });
