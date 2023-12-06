const mongoose = require("mongoose");
const dbSpecs = require("../models/SchemaSpecs");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

module.exports = {
  getAllspecs: (req, res) => {
    dbSpecs
      .find()
      .then((specs) => {
        res.status(200).json({
          specs,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },

  createspecs: (req, res) => {
    const { title, content, guitarPick, Deadline, selectedRecord, date, Situation } = req.body;

    const specs = new dbSpecs({
      id: new mongoose.Types.ObjectId(),
      date,
      title,
      content,
      guitarPick,
      Deadline,
      selectedRecord,
      Situation,
    });

    specs
      .save()
      .then(() => {
        res.status(200).json({
          message: "Created specs",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getspecs: (req, res) => {
    const specsId = req.params.specsId;

    dbSpecs
      .find({ id: specsId })
      .then((specs) => {
        res.status(200).json({
          specs,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updatespecs: (req, res) => {
    const specsId = req.params.specsId;
    console.log(req.body);

    dbSpecs.find({ id: specsId }).then((specs) => {
      if (!specs) {
        return res.status(404).json({
          message: "specs not found",
        });
      }

      dbSpecs
        .updateOne({ id: specsId }, req.body)
        .then(() => {
          res.status(200).json({
            message: "specs Updated",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    });
  },
  deletespecs: (req, res) => {
    const specsId = req.params.specsId;

    dbSpecs.find({ id: specsId }).then((specs) => {
      if (!specs) {
        return res.status(404).json({
          message: "specs not found",
        });
      }

      dbSpecs
        .deleteOne({ id: specsId })
        .then(() => {
          res.status(200).json({
            message: `specs _id:${specsId} Deleted`,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error,
          });
        });
    });
  },
};
